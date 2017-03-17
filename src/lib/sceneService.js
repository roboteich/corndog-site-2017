import 'whatwg-fetch';

const imgurUploadRoute = 'https://api.imgur.com/3/upload';

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

export const loadSceneCompositeURL = (scene) => {

  return new Promise((resolve, reject) => {

    if(!(scene.compositeDataURL)) {

      resolve('https://www.corndog.love' + scene.srcURL);

    } else {

      const compositeUploadData = scene.compositeDataURL.replace(/^data:image\/[a-z]+;base64,/, "");
      const fd = new FormData();

      fd.append('image', compositeUploadData);
      fd.append('title', 'National Corndog Day');
      fd.append('description', 'Show your love at http://corndog.love and put your face on a corndog for #NationalCorndogDay');

      return fetch(imgurUploadRoute, {
        method: 'POST',
        headers: {
          'Authorization': 'Client-ID 12c997458d9fbd5'
        },
        body: fd
      }).then(response => {
        return response.json()
      }).then(json => {
        console.log(json);
        if(json.success) {
          resolve({compositeURL:json.data.link, compositePageURL:'http://imgur.com/'+json.data.id});
        } else {
          reject(json.status);
        }
      });
    }
  });
}
