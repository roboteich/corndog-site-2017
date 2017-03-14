export default (state = {open: false, faceDataURL: null}, action) => {
  switch (action.type) {
    case 'FACE_EDIT_START':
      return {
        open: true,
        faceDataURL: action.faceDataURL
      }
    case 'FACE_EDIT_COMPLETE':
    case 'FACE_EDIT_CANCEL':
      return {
        open: false,
        faceDataURL: null
      }
    default:
      return state;
  }
}
