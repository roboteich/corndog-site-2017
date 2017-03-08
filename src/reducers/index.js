import { combineReducers } from 'redux';
import scenes, { getLoadedScenes } from './scenes';
import ready from './ready';
import preload from './preload';
import blitz from './blitz';

const corndog = combineReducers({
  preload,
  ready,
  scenes,
  blitz
});

export default corndog;

export const getBlitzedScene = (state) => {
  const loadedScenes = getLoadedScenes(state.scenes);
  const activeIndex = state.blitz.count % loadedScenes.length;
  return loadedScenes[activeIndex];
}
