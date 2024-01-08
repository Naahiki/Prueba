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


document.addEventListener('DOMContentLoaded', function () {
  const takePhotoMobileBtn = document.getElementById('take-photo-mobile0');
  const nextPageIcon = document.getElementById('nextPageIcon');

  const blurBackground = document.getElementById('blurBackground');
  blurBackground.style.display = 'block';

  const alertModal = document.getElementById('alertModal');
  alertModal.style.display = 'block';

  function captureAndShowImage() {
    const videoElement = document.getElementById("cameraFeed1");
    const canvas = document.createElement("canvas");
    const maxWidth = 1920;
    const maxHeight = 1080;
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
    context.imageSmoothingEnabled = true;
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    const capturedImage = canvas.toDataURL('image/jpeg', 1.0);

    const currentPage = document.querySelector('.page-5');
    currentPage.style.display = 'none';

    const capturedImageContainer = document.getElementById('cameraContainer2');
    const capturedImageContainer3 = document.getElementById('cameraContainerResults');

    capturedImageContainer.innerHTML = `<img src="${capturedImage}" alt="Captured Image">`;
    capturedImageContainer3.innerHTML = `<img src="${capturedImage}" alt="Captured Image">`;

    localStorage.setItem('capturedImage', capturedImage);
    addToUserImage('capturedImage', capturedImage);

    const nextPage = document.querySelector('.page-6');
    nextPage.style.display = 'block';
  }

  takePhotoMobileBtn.addEventListener('click', function(event) {
    const computedStyle = window.getComputedStyle(takePhotoMobileBtn);
    const displayValue = computedStyle.getPropertyValue('display');

    if (displayValue === 'block') {
      event.preventDefault();
      captureAndShowImage();
    }
  });

  nextPageIcon.addEventListener('click', function(event) {
    const computedStyle = window.getComputedStyle(takePhotoMobileBtn);
    const displayValue = computedStyle.getPropertyValue('display');

    if (displayValue === 'block') {
      event.preventDefault();
    } else {
      captureAndShowImage();
    }
  });

  nextPageIcon.addEventListener('click', captureAndShowImage);
});





document.addEventListener("DOMContentLoaded", function () {
  const takePhotoMobileBtn1 = document.getElementById('take-photo-mobile1');
  const nextPageIcon2 = document.getElementById('nextPageIcon2');

  function captureAndShowImage1() {
    const videoElement = document.getElementById("cameraFeed3");
    const canvas = document.createElement("canvas");
    const maxWidth = 1920;
    const maxHeight = 1080;
    const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (iOS) {
      if (videoElement.videoWidth > maxWidth || videoElement.videoHeight > maxHeight) {
        if (videoElement.videoWidth / videoElement.videoHeight > maxWidth / maxHeight) {
          canvas.width = maxWidth;
          canvas.height = maxWidth / aspectRatio;
        } else {
          canvas.height = maxHeight;
          canvas.width = maxHeight * aspectRatio;
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
    addToUserImage('capturedImage1', capturedImage1);

    const capturedImageContainer = document.getElementById('cameraContainer4');
    capturedImageContainer.innerHTML = `<img src="${capturedImage1}" alt="Captured Image">`;

    const currentPage2 = document.querySelector('.page-9');
    currentPage2.style.display = 'none';

    const nextPage2 = document.querySelector('.page-10');
    nextPage2.style.display = 'block';
  }

  takePhotoMobileBtn1.addEventListener('click', function(event) {
    const computedStyle1 = window.getComputedStyle(takePhotoMobileBtn1);
    const displayValue1 = computedStyle1.getPropertyValue('display');

    if (displayValue1 === 'block') {
      event.preventDefault();
      captureAndShowImage1();
    }
  });

  nextPageIcon2.addEventListener('click', function(event) {
    const computedStyle1 = window.getComputedStyle(takePhotoMobileBtn1);
    const displayValue1 = computedStyle1.getPropertyValue('display');

    if (displayValue1 === 'block') {
      event.preventDefault();
    } else {
      captureAndShowImage1();
    }
  });

  const imageData1 = localStorage.getItem('capturedImage1');
  if (imageData1) {
    const capturedImageContainer = document.getElementById('cameraContainer4');
    capturedImageContainer.innerHTML = `<img src="${imageData1}" alt="Captured Image">`;
  } else {
    const nextPage2 = document.querySelector('.page-10');
    nextPage2.style.display = 'none';
  }
});




document.addEventListener('DOMContentLoaded', function () {
  const takePhotoMobileBtn2 = document.getElementById('take-photo-mobile2');
  const nextPageIcon3 = document.getElementById('nextPageIcon3');

  function captureAndShowImage3() {
    const videoElement = document.getElementById("cameraFeed5");
    const canvas = document.createElement("canvas");
    const maxWidth = 1920;
    const maxHeight = 1080;
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
    context.imageSmoothingEnabled = true;
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    const capturedImage3 = canvas.toDataURL('image/jpeg', 1.0);
    localStorage.setItem('capturedImage3', capturedImage3);
    addToUserImage('capturedImage3', capturedImage3);

    const capturedImageElement = document.getElementById('capturedImage3');
    capturedImageElement.src = capturedImage3;

    const currentPage3 = document.querySelector('.page-13');
    currentPage3.style.display = 'none';

    const nextPage3 = document.querySelector('.page-14');
    nextPage3.style.display = 'block';
  }

  takePhotoMobileBtn2.addEventListener('click', function(event) {
    const computedStyle2 = window.getComputedStyle(takePhotoMobileBtn2);
    const displayValue2 = computedStyle2.getPropertyValue('display');

    if (displayValue2 === 'block') {
      event.preventDefault();
      captureAndShowImage3();
    }
  });

  nextPageIcon3.addEventListener('click', function(event) {
    const computedStyle2 = window.getComputedStyle(takePhotoMobileBtn2);
    const displayValue2 = computedStyle2.getPropertyValue('display');

    if (displayValue2 === 'block') {
      event.preventDefault();
    } else {
      captureAndShowImage3();
    }
  });

  const imageData3 = localStorage.getItem('capturedImage3');
  if (imageData3) {
    const capturedImageElement = document.getElementById('capturedImage3');
    capturedImageElement.src = imageData3;
  }
});




