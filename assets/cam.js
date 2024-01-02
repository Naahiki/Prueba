function iniciarCamara(containerId, videoId) {
  const container = document.getElementById(containerId);
  const videoElement = document.createElement('video');
  videoElement.setAttribute('id', videoId);
  videoElement.setAttribute('playsinline', '');
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

function startVideo() {
  navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
          const videoElement = document.getElementById('liveVideo');
          videoElement.srcObject = stream;
          videoElement.play();
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
              navigator.mediaDevices.getUserMedia({ video: true })
                  .then(function (stream) {
                      localStorage.setItem("cameraPermissionGranted", true);
                      iniciarCamara('cameraContainer1', 'cameraFeed1');
                      iniciarCamara('cameraContainer3', 'cameraFeed3');
                      iniciarCamara('cameraContainer5', 'cameraFeed5');
                  })
                  .catch(function (error) {
                      localStorage.setItem("cameraPermissionGranted", false);
                      console.error("El usuario denegó el acceso a la cámara:", error);
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
  const maxWidth = 1920; // Establecer un ancho máximo para el canvas
  const maxHeight = 1080; // Establecer una altura máxima para el canvas
  const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;

  if (videoElement.videoWidth > maxWidth) {
    canvas.width = maxWidth;
    canvas.height = maxWidth / aspectRatio;
  } else if (videoElement.videoHeight > maxHeight) {
    canvas.height = maxHeight;
    canvas.width = maxHeight * aspectRatio;
  } else {
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
  }

  const context = canvas.getContext('2d');
  // Ajustar la calidad de la imagen capturada
  context.imageSmoothingEnabled = true;
  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  // Obtener la imagen en formato de alta calidad (mejora la calidad del JPEG)
  const capturedImage = canvas.toDataURL('image/jpeg', 1.0); // Cambiado a 'image/jpeg' con calidad máxima

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





function captureAndShowImage1() {
  const videoElement = document.getElementById("cameraFeed3");
  const canvas = document.createElement("canvas");
  const maxWidth = 1920; // Ancho máximo para el canvas
  const maxHeight = 1080; // Altura máxima para el canvas
  const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  if (iOS) {
    if (videoElement.videoWidth > maxWidth || videoElement.videoHeight > maxHeight) {
      if (videoElement.videoWidth / videoElement.videoHeight > maxWidth / maxHeight) {
        canvas.width = maxWidth;
        canvas.height = maxWidth / aspectRatio;
      } else {
        canvas.width = maxHeight * aspectRatio;
        canvas.height = maxHeight;
      }
    } else {
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
    }
  } else {
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
  }

  const context = canvas.getContext('2d');
  context.imageSmoothingEnabled = true;
  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  const capturedImage1 = canvas.toDataURL('image/jpeg', 1.0);
  localStorage.setItem('capturedImage1', capturedImage1);

  const capturedImageContainer = document.getElementById('cameraContainer4');
  capturedImageContainer.innerHTML = `<img src="${capturedImage1}" alt="Captured Image">`;

  const currentPage2 = document.querySelector('.page-9');
  currentPage2.style.display = 'none';

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
    // Si no hay imagen almacenada, asegúrate de ocultar la página 10
    const nextPage2 = document.querySelector('.page-10');
    nextPage2.style.display = 'none';
  }
});


function captureAndShowImage3() {
  // Captura la imagen del video
  const videoElement = document.getElementById("cameraFeed5");
  const canvas = document.createElement("canvas");
  const maxWidth = 1920; // Ancho máximo para el canvas
  const maxHeight = 1080; // Altura máxima para el canvas
  const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;

  if (videoElement.videoWidth > maxWidth) {
    canvas.width = maxWidth;
    canvas.height = maxWidth / aspectRatio;
  } else if (videoElement.videoHeight > maxHeight) {
    canvas.height = maxHeight;
    canvas.width = maxHeight * aspectRatio;
  } else {
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
  }

  const context = canvas.getContext('2d');
  // Ajustar la calidad de la imagen capturada
  context.imageSmoothingEnabled = true;
  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  // Obtener la imagen en formato de alta calidad (JPEG con máxima calidad)
  const capturedImage3 = canvas.toDataURL('image/jpeg', 1.0); // Cambiado a 'image/jpeg' con calidad máxima
  localStorage.setItem('capturedImage3', capturedImage3);

  // Mostrar la imagen capturada en otra página HTML
  const capturedImageElement = document.getElementById('capturedImage3');
  capturedImageElement.src = capturedImage3;

  // Redirigir a la siguiente página
  const currentPage3 = document.querySelector('.page-13');
  currentPage3.style.display = 'none';

  // Mostrar la siguiente página
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
