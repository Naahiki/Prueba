function iniciarCamara(containerId, videoId) {
  const container = document.getElementById(containerId);
  const videoElement = document.createElement('video');
  videoElement.setAttribute('id', videoId);
  videoElement.setAttribute('autoplay', true);
  container.appendChild(videoElement);

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      videoElement.srcObject = stream;
    })
    .catch(function (error) {
      console.error("Error al acceder a la cámara:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const page5 = document.querySelector('.page-5');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Página visible, solicitar permiso para acceder a la cámara
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(function (stream) {
            // Permisos otorgados, almacenar esta información en el localStorage
            localStorage.setItem("cameraPermissionGranted", true);

            // Iniciar las cámaras en los contenedores correspondientes
            iniciarCamara('cameraContainer1', 'cameraFeed1');
            iniciarCamara('cameraContainer3', 'cameraFeed3');
            iniciarCamara('cameraContainer5', 'cameraFeed5');
          })
          .catch(function (error) {
            // Permisos denegados, manejar este caso
            localStorage.setItem("cameraPermissionGranted", false);
            console.error("El usuario denegó el acceso a la cámara:", error);

            // Aquí puedes mostrar un mensaje al usuario o realizar otra acción apropiada
          });
      }
    });
  });

  observer.observe(page5);
});








function acceptAccess() {
  // Lógica cuando se acepta el acceso

  // Oculta el fondo de desenfoque
  const blurBackground = document.getElementById('blurBackground');
  blurBackground.style.display = 'none';

  // Oculta la alerta
  const alertModal = document.getElementById('alertModal');
  alertModal.style.display = 'none';
}


function rejectAccess() {
  // Lógica cuando se rechaza el acceso
  // Redirecciona a otra página o toma acciones necesarias
  window.location.href = "../../index.html";
} 


  // Captura imagen 1
  document.addEventListener("DOMContentLoaded", function () {
    // Muestra el fondo de desenfoque al cargar la página
    const blurBackground = document.getElementById('blurBackground');
    blurBackground.style.display = 'block';
  
    // Muestra la alerta al cargar la página
    const alertModal = document.getElementById('alertModal');
    alertModal.style.display = 'block';
    const nextPageIcon = document.getElementById('nextPageIcon');
    nextPageIcon.addEventListener('click', captureAndShowImage);
  });
  
  
  function captureAndShowImage() {
    // Captura la imagen del video
    const videoElement = document.getElementById("cameraFeed1");
    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    
    const capturedImage = canvas.toDataURL('image/png');

    // Oculta la página actual
    const currentPage = document.querySelector('.page-5');
    currentPage.style.display = 'none';

    // Asigna la imagen capturada al div oculto
    const capturedImageContainer = document.getElementById('cameraContainer2');
    const capturedImageContainer3 = document.getElementById('cameraContainerResults');

    // Asigna la imagen a ambos contenedores después de ocultar la página
    capturedImageContainer.innerHTML = `<img src="${capturedImage}" alt="Captured Image">`;
    capturedImageContainer3.innerHTML = `<img src="${capturedImage}" alt="Captured Image">`;

    // Almacena la imagen capturada en localStorage si es necesario
    localStorage.setItem('capturedImage', capturedImage);

    // Muestra la siguiente página
    const nextPage = document.querySelector('.page-6');
    nextPage.style.display = 'block';
}





    //   Captura imagen 2
    function captureAndShowImage1() {
      // Captura la imagen del video
      const videoElement = document.getElementById("cameraFeed3");
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      
      // Almacena la imagen en localStorage
      const capturedImage1 = canvas.toDataURL('image/png');
      localStorage.setItem('capturedImage1', capturedImage1);
    
      // Muestra la imagen capturada en otra página HTML
      const capturedImageContainer = document.getElementById('cameraContainer4');
      capturedImageContainer.innerHTML = `<img src="${capturedImage1}" alt="Captured Image">`;
    
      // Oculta la página actual
      const currentPage2 = document.querySelector('.page-9');
      currentPage2.style.display = 'none';
    
      // Muestra la siguiente página
      const nextPage2 = document.querySelector('.page-10');
      nextPage2.style.display = 'block';
    }
    
    document.addEventListener("DOMContentLoaded", function () {
      const nextPageIcon = document.getElementById('nextPageIcon2');
      nextPageIcon.addEventListener('click', captureAndShowImage1);
    
      // Mostrar la imagen en la siguiente página si está disponible
      const imageData1 = localStorage.getItem('capturedImage1');
      if (imageData1) {
        const capturedImageContainer = document.getElementById('cameraContainer4');
        capturedImageContainer.innerHTML = `<img src="${imageData1}" alt="Captured Image">`;
      } else {
        // Si no hay imagen almacenada, asegúrate de ocultar la página 11
        const nextPage2 = document.querySelector('.page-10');
        nextPage2.style.display = 'none';
      }
    });
    



  //   Captura imagen 3

  function captureAndShowImage3() {
    // Captura la imagen del video
    const videoElement = document.getElementById("cameraFeed5");
    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    
    // Almacena la imagen en localStorage
    const capturedImage3 = canvas.toDataURL('image/png');
    localStorage.setItem('capturedImage3', capturedImage3);

    // Muestra la imagen capturada en otra página HTML
    const capturedImageElement = document.getElementById('capturedImage3');
    capturedImageElement.src = capturedImage3;

    // Redirige a la siguiente página
    const currentPage3 = document.querySelector('.page-13');
    currentPage3.style.display = 'none';

    // Muestra la siguiente página
    const nextPage3 = document.querySelector('.page-14');
    nextPage3.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function () {
    const nextPageIcon = document.getElementById('nextPageIcon3');
    nextPageIcon.addEventListener('click', captureAndShowImage3);

    // Mostrar la imagen en la siguiente página si está disponible
    const imageData3 = localStorage.getItem('capturedImage3');
    if (imageData3) {
        const capturedImageElement = document.getElementById('capturedImage3');
        capturedImageElement.src = imageData3;
    }
});






document.addEventListener('DOMContentLoaded', function () {
  const currentPage = document.querySelector('.page-22');
  
  if (currentPage) {
      const capturedImage = localStorage.getItem('capturedImage');
      
      if (capturedImage) {
          const capturedImageContainer = document.getElementById('cameraContainerResults');
          capturedImageContainer.innerHTML = `<img src="${capturedImage}" alt="Captured Image">`;
      }
  }
});
  
