export default (state = 0, action) => {
  switch (action.type) {
    case "BLITZ_TICK":
      return action.index;
    default:
      return state;
  }
}
