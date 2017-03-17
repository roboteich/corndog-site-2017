import beyonce from '../assets/scenes/beyonce.jpg';
import bolt from '../assets/scenes/bolt.jpg';
import diddy from '../assets/scenes/diddy.jpg';
import drake from '../assets/scenes/drake.jpg';
import dreamteam from '../assets/scenes/dreamteam.jpg';
import freekick from '../assets/scenes/freekick.jpg';
import got from '../assets/scenes/got.jpg';
import hotub from '../assets/scenes/hotub.jpg';
import howbowdah from '../assets/scenes/howbowdah.jpg';
import kanye from '../assets/scenes/kanye.jpg';
import lavine from '../assets/scenes/lavine.jpg';
import miketyson from '../assets/scenes/miketyson.jpg';
import neil from '../assets/scenes/neil.jpg';
import richard from '../assets/scenes/richard.jpg';
import saltbae from '../assets/scenes/saltbae.jpg';
import strangerthings from '../assets/scenes/strangerthings.jpg';
import toprope from '../assets/scenes/toprope.jpg';

import whale from '../assets/scenes/whale.jpg';
import nsync from '../assets/scenes/nsync.jpg';
import jayz from '../assets/scenes/jayz.jpg';
import fullhouse from '../assets/scenes/fullhouse.jpg';
import fatjewish from '../assets/scenes/fatjewish.jpg';
import dram from '../assets/scenes/dram.jpg';
import dog from '../assets/scenes/dog.jpg';
import cat from '../assets/scenes/cat.jpg';



const defaultScene = (srcURL, x = 0, y = 0, w = 0, h = 0, rotation = 0, po = "50% top", lr = false) => {
  return {
    srcURL,
    srcDataURL: undefined,
    faceTarget: {x:x - w*.05, y:y- h*.05, w:w*1.1, h:h*1.1, rotation},
    compositeDataURL: undefined,
    compositePageURL: undefined,
    compositeURL: undefined,
    portraitOffset: po,
    landscapeRepeat: lr
  }
}

const defaultScenes = [
  defaultScene(beyonce, 667, 401, 241, 241, 9, "85% top", true),
  defaultScene(bolt, 1140, 95, 262, 262, -14, "80% top" ),
  defaultScene(diddy, 782, 515, 411, 411, 0, "52% top"),
  defaultScene(drake, 562, 221, 216, 216, 0, "47% top"),
  defaultScene(dreamteam, 755, 47, 377, 377, 0, "65% top"),
  defaultScene(freekick, 1222, 115, 214, 214, 0, "81% top"),
  defaultScene(got, 1383, 493, 358, 358, 0, "82% top"),
  defaultScene(hotub, 536, 180, 395, 395, -12, "44% top"),
  defaultScene(howbowdah, 165, 125, 535, 535, -8, "10% top"),
  defaultScene(kanye, 480, 192, 323, 323, -4, "55% top", true),
  defaultScene(lavine, 233, 230, 230, 230, -21, "35% top", true),
  defaultScene(miketyson, 57, 178, 319, 319, -25, "10% top"),
  defaultScene(neil, 498, 102, 581, 581, -20, "58% top"),
  defaultScene(richard, 1166, 103, 219, 219,  0, "58% top"),
  defaultScene(saltbae, 779, 245, 176, 176, -17, "100% top", true),
  defaultScene(strangerthings, 1337, 219, 259, 259, 0, "80% top"),
  defaultScene(toprope, 716, 0, 261, 261, 49, "29% top"),
  defaultScene(whale, 1126, 226, 245, 245, 90, "81% top"),
  defaultScene(nsync, 1502, 28, 333, 333, 0, "91% top"),
  defaultScene(jayz, 896, 214, 394, 394, -20, "65% top"),
  defaultScene(fullhouse, 414, 24, 386, 386, 0, "36% top"),
  defaultScene(fatjewish, 508, 40, 279, 279, 0, "29% top"),
  defaultScene(dram, 934, 398, 223, 223, 0, "53% top"),
  defaultScene(dog, 1454, 130, 430, 430, -25, "93% top"),
  defaultScene(cat, 1056, 48, 301, 301, 0, "57% top")
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
        { srcDataURL: action.srcDataURL });
    case 'RECEIVE_SCENE_COMPOSITE_URL':
      return updateSceneAtIndex(state, action.index,
        { compositeURL: action.compositeURL, compositePageURL:action.compositePageURL});
    case 'FACE_EDIT_COMPLETE':
      return state.slice()
        .map(scene => Object.assign({}, scene, {compositeURL:null, compositePageURL:null, compositeDataURL:null}));
    case 'FACE_MERGE':
      return updateSceneAtIndex(state, action.index,
        { compositeDataURL: action.compositeDataURL });
    default:
      return state;
  }
}

//selectors
export const getSceneCount = (state) => state.length;
export const getSceneAtIndex = (state, index) => state[index];
export const getLoadedScenes = (state) =>
  state.filter((scene) => (null !== scene.srcDataURL));
