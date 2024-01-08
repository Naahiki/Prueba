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
    const imagesAsBase64 = {};

    // Convertir cada imagen a base64
    imageKeys.forEach(imageKey => {
      imagesAsBase64[imageKey] = userImage[imageKey];
    });

    // Mostrar los datos que se enviarán por la API
    console.log("Datos a enviar por la API:", imagesAsBase64);


    return imagesAsBase64;
  }

  return null; // Si aún no se han agregado las tres imágenes
}
