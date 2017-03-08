// reducers
export default (state = {interval: null, count: 0}, action) => {
  switch (action.type) {
    case "BLITZ_START":
      return {...state, interval: action.interval};

    case "BLITZ_STOP":
      return {...state, interval: null};

    case "BLITZ_TICK":
      return {...state, count: action.count};

    default:
      return state;
  }
}


// selectors
export const isBlitzing = (state) => (null !== state.interval);
