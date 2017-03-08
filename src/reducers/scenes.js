import kanye from '../assets/scenes/kanye.png';
import drake from '../assets/scenes/drake.png';
import tub from '../assets/scenes/tub.png';

const defaultScene = (srcURL, x = 0, y = 0, w = 0, h = 0) => {
  return {
    srcURL,
    srcDataURL: undefined,
    faceBounds: {x, y, w, h},
    faceDataURL: undefined,
    compositeDataURL: undefined
  }
}

const defaultScenes = [
  defaultScene(kanye),
  defaultScene(drake),
  defaultScene(tub)
];

//helpers
const updateSceneAtIndex = (state, index, props) => {
  const scene = Object.assign({}, state[index], props);
  return [
    ...state.slice(0, index),
    scene,
    ...state.slice(index + 1)
  ]
}

//reducers
export default (state = defaultScenes, action) => {
  switch (action.type) {
    case 'RECEIVE_SCENE':
      return updateSceneAtIndex(state, action.index,
        { srcDataURL: action.srcDataURL});
    case 'SET_FACE_DATA':
      return updateSceneAtIndex(state, action.index,
        { faceDataURL: action.faceDataURL});
    case 'SET_COMPOSITE_DATA':
      return updateSceneAtIndex(state, action.index,
        { compositeDataURL: action.faceDataURL});
    default:
      return state;
  }
}

//selectors
export const getSceneCount = (state) => state.length;
export const getSceneAtIndex = (state, index) => state[index];
export const getLoadedScenes = (state) =>
  state.filter((scene) => (null !== scene.srcDataURL));
