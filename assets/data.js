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

    // Llamar a la función para enviar los datos por la API
    enviarDatosPorAPI(imagesAsBase64);

    return imagesAsBase64;
  }

  return null; // Si aún no se han agregado las tres imágenes
}

function enviarDatosPorAPI() {
  const imageKeys = Object.keys(userImage);
  if (imageKeys.length === 3) {
    const formData = new FormData();

    // Agregar cada imagen a FormData (simulando que se envían en base64)
    imageKeys.forEach(imageKey => {
      formData.append(imageKey, userImage[imageKey]);
    });

    // Mostrar los datos que se enviarán en la consola
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    // Realizar la solicitud POST a JSONPlaceholder (endpoind de ejemplo)
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      // Manejar la respuesta de la API
      if (response.ok) {
        return response.json(); // Si la respuesta es JSON
      } else {
        throw new Error('Error al enviar los datos');
      }
    })
    .then(data => {
      // Manejar la respuesta de la API, si devuelve datos
      console.log('Respuesta de la API:', data);
    })
    .catch(error => {
      // Manejar cualquier error durante la solicitud
      console.error('Error:', error);
    });
  } else {
    console.error('No se han agregado las tres imágenes');
  }
}
