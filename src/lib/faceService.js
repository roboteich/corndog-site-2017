import loadImage from 'blueimp-load-image';

export const loadFaceDataURL = () => {

  return Promise.resolve(
    new Promise((resolve, reject) => {
      const fileInput = document.createElement('input');
      fileInput.setAttribute('type', 'file');
      fileInput.setAttribute('accept', 'image/*');
      fileInput.style.position = 'absolute';
      fileInput.style.left = '-10000px';
      fileInput.value = null;
      fileInput.onchange = (e) => {
        document.body.removeChild(fileInput);
        resolve(e.target.files[0]);
      };

      document.body.appendChild(fileInput);

      const evt = document.createEvent("MouseEvents");
      evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null)
      fileInput.dispatchEvent(evt);
    }).then(file => {
      return new Promise((resolve, reject) => {
        loadImage(
          file,
          (canvas) => resolve(canvas.toDataURL('image/jpeg')),
          {orientation:true, canvas:true}
        );
      })
    })
  );
};

const cloneFace = (faceCanvas) => {
  var canvas = document.createElement("canvas");
  canvas.width = faceCanvas.width;
  canvas.height = faceCanvas.height;

  var ctx = canvas.getContext('2d');
  ctx.drawImage(faceCanvas, 0, 0, faceCanvas.width, faceCanvas.height);
  return canvas;
}

export const maskFace = (faceCanvas, maskImage) => {
  const canvas = cloneFace(faceCanvas);
  const ctx = canvas.getContext('2d');

  ctx.globalCompositeOperation = 'destination-out';
  ctx.drawImage(maskImage, 0, 0, canvas.width, canvas.height);

  return canvas;
}

export const colorizeFace = (faceCanvas, color) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(0,0,canvas.width, canvas.height);
  ctx.globalCompositeOperation = 'luminosity';
  ctx.drawImage(faceCanvas, 0, 0, canvas.width, canvas.height);

  return canvas;
}

export const grayscaleFace = (faceCanvas) => {
  const canvas = cloneFace(faceCanvas);
  const ctx = canvas.getContext('2d');

  var imgd = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var pix = imgd.data;
  for (var i = 0, n = pix.length; i < n; i += 4) {
    var grayscale = pix[i ] * .3 + pix[i+1] * .59 + pix[i+2] * .11;
    pix[i ] = grayscale; // red
    pix[i+1] = grayscale; // green
    pix[i+2] = grayscale; // blue
    // alpha
  }
  ctx.putImageData(imgd, 0, 0);
  return canvas;
}

export const contrastFace = (faceCanvas, contrast = 50) => {
    const canvas = cloneFace(faceCanvas);
    const ctx = canvas.getContext('2d');

    var imgd = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pix = imgd.data;

    contrast = (contrast/100) + 1;  //convert to decimal & shift range: [0..2]
    var intercept = 128 * (1 - contrast);
    for(var i=0;i<pix.length;i+=4){   //r,g,b,a
        pix[i] = pix[i]*contrast + intercept;
        pix[i+1] = pix[i+1]*contrast + intercept;
        pix[i+2] = pix[i+2]*contrast + intercept;
    }
    ctx.putImageData(imgd, 0, 0);
    return canvas;
}
