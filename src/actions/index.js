// standard actionCreators look like (args) => {type}
// promise actionCreators look like (args) => new Promise((resolve, reject) => resolve({type}))
// thunk actionCreators look like (args) => (dispatch, getState) => {type}

import { getIsBlitzing } from '../reducers';
import { loadSceneDataURL } from '../lib/sceneService';
import { loadFaceDataURL } from '../lib/faceService';


// scene load actionCreators
//--------------------------

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

  return scenes.reduce((promise, scene, index) => {
    return promise.then(dispatch(fetchScene(index)));
  }, Promise.resolve());
}

// blitz actionCreators
//--------------------------

export const startBlitz = () => (dispatch, getState) => {

  //exit if already blitzing
  if(getIsBlitzing(getState())) {
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
  // dispatch(mergeActiveFace());
}

// editor actionCreators
//--------------------------

export const loadFaceAndEdit = () => (dispatch, getState) => {
  if(getState().editor.open) {
    return
  }

  dispatch(stopBlitz());

  loadFaceDataURL().then(faceDataURL => {
    dispatch({
      type: 'FACE_EDIT_START',
      faceDataURL
    });
  });

}

export const cancelFaceEditor = () => ({
    type: 'FACE_EDIT_CANCEL'
});

export const mergeFace = () => (dispatch, getState) => {

  const state = getState();
  const scenes = state.scenes;
  const editorFaceURL = state.editor.editorFaceURL;
  // const scene = getBlitzedScene(state);

  if (null !== editorFaceURL) {

    console.log('composite a face');

    scenes.forEach((scene, index) => {

      const faceEditorImage = document.createElement("img");
      const faceTarget = scene.faceTarget;

      faceEditorImage.onload = () => {

          //draw scene in image
          const sceneImg = document.createElement("img");
          sceneImg.onload = () => {

            //create a canvas
            //draw scene into canvas
            const composite = document.createElement("canvas");
            composite.width = sceneImg.naturalWidth;
            composite.height = sceneImg.naturalHeight;
            const compositeCtx = composite.getContext("2d");

            compositeCtx.drawImage(sceneImg, 0, 0, composite.width, composite.height);
            compositeCtx.globalCompositeOperation = 'hard-light';

            // move the origin to 50, 35
            compositeCtx.translate(faceTarget.x, faceTarget.y);

            // now move across and down half the
            // width and height of the image (which is 128 x 128)
            compositeCtx.translate(faceTarget.w/2, faceTarget.h/2);

            // rotate around this point
            compositeCtx.rotate(faceTarget.rotation * (Math.PI/180));


            compositeCtx.drawImage(faceEditorImage, -faceTarget.w/2, -faceTarget.h/2, faceTarget.w, faceTarget.h);

            const compositeDataURL = composite.toDataURL('image/jpeg');

            dispatch({
              type:'FACE_MERGE',
              compositeDataURL,
              index
            });

          };

          sceneImg.src = scene.srcDataURL;


      };

      faceEditorImage.src = editorFaceURL;

    });

  }
}

export const completeFaceEditor = (editorFaceURL = '') => (dispatch, getState) => {
  dispatch({
    type: 'FACE_EDIT_COMPLETE',
    editorFaceURL
  });

  dispatch(mergeFace());
}

// share actionCreators
//--------------------------

export const startShare = () => (dispatch) => {
  dispatch(stopBlitz());
  dispatch({ type:"SHARE_START"});
}

export const completeShare = () => ({
  type:"SHARE_COMPLETE"
});

// screen actionCreators
//--------------------------

export const measureScreen = () => {

  let orientation = "Portrait";

  const w  = window,
    d  = w.document,
    de = d.documentElement,
    db = d.body || d.getElementsByTagName('body')[0],
    x  = w.innerWidth || de.clientWidth || db.clientWidth,
    y  = w.innerHeight|| de.clientHeight|| db.clientHeight;

  if (x > y) {
      orientation = "Landscape";
  }

  return {
    type: "SCREEN_MEASURE",
    orientation,
    width: x,
    height: y
  }
};

// audio actionCreators
//--------------------------

export const audioCanPlay = () => ({
  type:'AUDIO_CAN_PLAY'
});

export const audioToggle = () => ({
  type:'AUDIO_TOGGLE'
});

export const audioProgress = (currentTime, duration) => {
  return {
    type:'AUDIO_PROGRESS',
    progress: (currentTime/duration)
  }
}

export const audioPlayed = () => ({
  type:'AUDIO_PLAYED'
});

export const audioStopped = () => ({
  type:'AUDIO_STOPPED'
});

//
// Startup
//------------------------------------

// preload - kicks of loading of everything
export const ready = () => (dispatch, getState) => {
    dispatch({ type: 'READY' });
    if(!getState().audio.playing){
      dispatch(audioToggle());
    }
};
