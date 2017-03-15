// reducers
export default (state = {width: null, height: 0, orientation: 'Landscape'}, action) => {
  switch (action.type) {
    case "SCREEN_MEASURE":
      return {width: action.width, height: action.height, orientation:action.orientation};
    default:
      return state;
  }
}
