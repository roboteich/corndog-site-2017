import { combineReducers } from 'redux';
import scenes from './scenes';
import ready from './ready';
import preload from './preload';
import activeSceneIndex from './activeSceneIndex';
import blitz from './blitz';

const corndog = combineReducers({
  preload,
  ready,
  scenes,
  activeSceneIndex,
  blitz
});

export default corndog;
