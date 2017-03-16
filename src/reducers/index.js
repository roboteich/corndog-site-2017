import { combineReducers } from 'redux';
import scenes, { getLoadedScenes } from './scenes';
import ready from './ready';
import preload from './preload';
import blitz, {isBlitzing} from './blitz';
import editor from './editor';
import share from './share';
import screen from './screen';

const corndog = combineReducers({
  preload,
  ready,
  scenes,
  blitz,
  editor,
  share,
  screen
});

export default corndog;

export const getIsBlitzing = (state) => {
  return isBlitzing(state.blitz);
}

export const getBlitzedIndex = (state) => {
  return state.blitz.count % getLoadedScenes(state.scenes).length;
}

export const getBlitzedScene = (state) => {
  return getLoadedScenes(state.scenes)[getBlitzedIndex(state)];
}
