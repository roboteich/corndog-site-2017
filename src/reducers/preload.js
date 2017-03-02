// reducers
export default (state = 0, action) => {
  switch (action.type) {
    case 'RECEIVE_SCENE':
      return state + 1;
    default:
      return state;
  }
}
