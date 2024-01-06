// Crear un objeto vacío para almacenar los datos
let userData = {};

function addToUserData(key, value) {
  userData[key] = value;
  console.log(`Valor agregado a userData[${key}]:`, value);
}

let userImage = {};

function addToUserImage(key, value) {
  userImage[key] = value;
  console.log(`Valor agregado a userImage[${key}]:`, value);

  // Verificar si se han agregado las tres imágenes
  const imageKeys = Object.keys(userImage);
  if (imageKeys.length === 3) {
    const imagesAsBlob = {};

    // Convertir cada imagen base64 a Blob en formato PNG y obtener las URLs
    imageKeys.forEach(imageKey => {
      const base64String = userImage[imageKey];
      const blob = base64toBlob(base64String);
      imagesAsBlob[imageKey] = blob;

      // Crear una URL de objeto para cada imagen y guardarla en el array
      const urlObjeto = URL.createObjectURL(blob);
      const nombreArchivo = `${imageKey}.png`;

      // Descargar automáticamente la imagen en formato PNG
      descargarImagen(blob, nombreArchivo);
    });

    // Ejemplo: Mostrar las URLs en la consola antes de enviarlas al modelo
    console.log("URLs de las imágenes:", Object.values(imagesAsBlob).map(blob => URL.createObjectURL(blob)));

    return imagesAsBlob;
  }

  return null; // Si aún no se han agregado las tres imágenes
}




// Función para convertir base64 a Blob (PNG)
function base64toBlob(base64Data) {
  const byteString = atob(base64Data.split(',')[1]);
  const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
}



function descargarImagen(blob, nombreArchivo) {
  const urlObjeto = URL.createObjectURL(blob);
  
  const enlaceDescarga = document.createElement('a');
  enlaceDescarga.href = urlObjeto;
  enlaceDescarga.download = nombreArchivo || 'imagen.png';
  
  const clicEvento = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  
  enlaceDescarga.dispatchEvent(clicEvento);
  URL.revokeObjectURL(urlObjeto);
}

