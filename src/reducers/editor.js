export default (state = {open: false, faceDataURL: null, editorFaceURL: null}, action) => {
  switch (action.type) {
    case 'FACE_EDIT_START':
      return Object.assign({}, state, {
        open: true,
        faceDataURL: action.faceDataURL
      });
    case 'FACE_EDIT_COMPLETE':
      return Object.assign({}, state, {
        open: false,
        editorFaceURL: action.editorFaceURL
      });
    case 'FACE_EDIT_CANCEL':
      return Object.assign({}, state, {
        open: false
      });
    default:
      return state;
  }
}
