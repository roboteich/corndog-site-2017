export default (state = false, action) => {
  switch (action.type) {
    case 'SHARE_START':
      return true;
    case 'SHARE_COMPLETE':
      return false;
    default:
      return state;
  }
}
