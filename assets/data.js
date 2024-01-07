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
    const imagesAsDataURL = {};

    // Convertir cada imagen base64 a Data URI en formato PNG
    imageKeys.forEach(imageKey => {
      const base64String = userImage[imageKey];
      imagesAsDataURL[imageKey] = `data:image/png;base64,${base64String}`;
    });

    // Ejemplo: Mostrar las URLs en la consola antes de utilizarlas
    console.log("URLs de las imágenes en formato PNG:", Object.values(imagesAsDataURL));

    // Realizar operaciones con las URLs de Data URI si es necesario

    return imagesAsDataURL;
  }

  return null; // Si aún no se han agregado las tres imágenes
}


