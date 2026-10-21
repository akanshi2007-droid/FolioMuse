// Resize an uploaded image in the browser so drafts fit in LocalStorage
// and the exported ZIP stays small. Always outputs a JPEG data URL.
export function fileToResizedDataUrl(file, maxSide = 900, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) return reject(new Error('Please choose an image file (JPG, PNG, WebP).'));
    if (file.size > 8 * 1024 * 1024) return reject(new Error('That image is over 8 MB. Try a smaller one.'));
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("We couldn't read that image. Try another file."));
    };
    img.src = url;
  });
}
