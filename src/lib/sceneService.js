export const loadSceneDataURL = (srcURL) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');

    //onload resolve
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height =  img.naturalHeight;
      canvas.getContext('2d').drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/jpeg'));
    }

    //start loading
    img.src = srcURL;
  });
}
