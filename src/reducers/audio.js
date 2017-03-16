// reducers
export default (state = {canplay:false, playing:false, command:null, progress:0}, action) => {
  switch (action.type) {
    case "AUDIO_CAN_PLAY":
      return {...state, canplay: true};

    case "AUDIO_TOGGLE":
      return {...state, command: state.playing ? 'pause' : 'play'};

    case "AUDIO_PROGRESS":
      return {...state, progress: action.progress};

    case "AUDIO_PLAYED":
      return {...state, playing: true};

    case "AUDIO_STOPPED":
      return {...state, playing: false};

    default:
      return state;
  }
}


// selectors
export const isBlitzing = (state) => (null !== state.interval);
