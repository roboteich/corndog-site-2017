// standard actionCreators look like (args) => {type}
// promise actionCreators look like (args) => new Promise((resolve, reject) => resolve({type}))
// thunk actionCreators look like (args) => (dispatch, getState) => {type}

import { isBlitzing } from '../reducers/blitz';
import { getBlitzedScene, getBlitzedIndex } from '../reducers';
import { loadSceneDataURL } from '../lib/sceneService';
import { loadFaceDataURL } from '../lib/faceService';


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
    let count = state.blitz.count + 1;

    dispatch({
      type: 'BLITZ_TICK',
      count
    });
  }, 100);

  dispatch({
    type: 'BLITZ_START',
    interval
  });
}

export const stopBlitz = () => (dispatch, getState) => {
  clearInterval(getState().blitz.interval);
  dispatch({ type: 'BLITZ_STOP' });
}

// face actionCreators
//--------------------------

export const loadFaceAndEdit = () => (dispatch, getState) => {
  if(getState().editor.open) {
    return
  }

  loadFaceDataURL().then(faceDataURL => {
    console.log('faceDataURLLoaded');
    dispatch({
      type: 'FACE_EDIT_START',
      faceDataURL
    });
  });

}

export const cancelFaceEditor = () => ({
    type: 'FACE_EDIT_CANCEL'
});

export const mergeFace = (faceEditorImage = '') => (dispatch, getState) => {

  console.log(faceEditorImage);
  //get current scene
  const currentState = getState();
  const activeScene = getBlitzedScene(currentState);
  const activeIndex = getBlitzedIndex(currentState);
  const faceTarget = activeScene.faceTarget;

  //draw scene in image
  const sceneImg = document.createElement("img");
  sceneImg.src = activeScene.srcDataURL;

  //create a canvas
  //draw scene into canvas
  const composite = document.createElement("canvas");
  composite.width = sceneImg.naturalWidth;
  composite.height = sceneImg.naturalHeight;
  const compositeCtx = composite.getContext("2d");

  compositeCtx.drawImage(sceneImg, 0, 0);
  compositeCtx.globalCompositeOperation = 'hard-light';
  compositeCtx.drawImage(faceEditorImage, faceTarget.x, faceTarget.y, faceTarget.w, faceTarget.h);

  const compositeDataURL = composite.toDataURL();
  window.open(compositeDataURL, '_blank');

  dispatch({
    type:'FACE_EDIT_COMPLETE',
    compositeDataURL,
    index: activeIndex
  })

}
