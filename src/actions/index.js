// standard actionCreators look like (args) => {type}
// promise actionCreators look like (args) => new Promise((resolve, reject) => resolve({type}))
// thunk actionCreators look like (args) => (dispatch, getState) => {type}

import { isBlitzing } from '../reducers/blitz';
import { getSceneCount } from '../reducers/scenes';
import { loadSceneDataURL } from '../lib/sceneService';


// scene load actionCreators
//--------------------------

// preload - kicks of loading of everything
export const ready = () => ({ type: 'READY' });

const requestScene = (index) => ({
  type: 'REQUEST_SCENE',
  index
});

// receiveScene - transforms the scene on done
const receiveScene = (index, srcDataURL) => ({
  type: 'RECEIVE_SCENE',
  index,
  srcDataURL
});

// fetchScene - starts loading a scene and receives it on load
const fetchScene = (index) => (dispatch, getState) => {
  dispatch(requestScene(index));
  return loadSceneDataURL(getState().scenes[index].srcURL).then(srcDataURL => {
      dispatch(receiveScene(index, srcDataURL))
    });
}

export const preload = () => (dispatch, getState) => {
  const { scenes } = getState();
  return Promise
    .all(scenes.map((scene, index) => dispatch(fetchScene(index))));
    //.then(() => dispatch(ready()));
}


// blitz actionCreators
//--------------------------

export const startBlitz = () => (dispatch, getState) => {

  //exit if already blitzing
  if(isBlitzing(getState().blitz)) {
    return;
  }

  const interval = setInterval(() => {
    const state = getState();
    //determine the next activeScene
    let index = state.activeSceneIndex + 1;
    if(index >= getSceneCount(state.scenes)) {
        index = 0;
    }

    dispatch({
      type: 'BLITZ_TICK',
      index
    });
  }, 100);

  dispatch({
    type: 'BLITZ_START',
    interval
  });
}

export const stopBlitz = () => (dispatch, getState) => {
  clearInterval(getState().blitz);
  dispatch({ type: 'BLITZ_STOP' });
}
