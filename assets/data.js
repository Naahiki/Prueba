// Crear un objeto vacío para almacenar los datos
let userData = {};

function addToUserData(key, value) {
  userData[key] = value;
  console.log(`Valor agregado a userData[${key}]:`, value);
}
