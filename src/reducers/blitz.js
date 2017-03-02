// reducers
export default (state = null, action) => {
  switch (action.type) {
    case "BLITZ_START":
      return action.interval;

    case "BLITZ_STOP":
      return null;

    default:
      return state;
  }
}

// selectors
export const isBlitzing = (state) => (null !== state);
