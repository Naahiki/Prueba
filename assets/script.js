function changeBodyBackground(pageNumber) {
  const body = document.querySelector('body');

  if (pageNumber === 1 || pageNumber === 21) {
      body.style.backgroundColor = '#ffffff'; 
  } else {
      body.style.backgroundColor ='#573c41' ; 
  }
}


function showPreviousPage(pageNumber) {
  let previousPageNumber;
  let showTransitionContent = false;
  let transitionContentId = '';
  let hideGreeting = false;

  switch (pageNumber) {
      case 3:
          previousPageNumber = 2;
          showTransitionContent = true;
          transitionContentId = 'transition-form-content';
          break;
      case 5:
          previousPageNumber = 4;
          showTransitionContent = true;
          transitionContentId = 'transition-form-content0';
          hideGreeting = true;
          break;
      case 9:
          previousPageNumber = 6;
          break;
      case 13:
          previousPageNumber = 10;
          break;
      case 18:
          previousPageNumber = 14;
          break;
      default:
          previousPageNumber = pageNumber - 1;
  }

  const currentPage = document.querySelector(`.page-${pageNumber}`);
  const previousPage = document.querySelector(`.page-${previousPageNumber}`);
  const transitionContent = document.getElementById(transitionContentId);
  const greeting = document.getElementById('greeting0');

  if (currentPage && previousPage) {
      currentPage.style.display = 'none';
      previousPage.style.display = 'block';

      if (showTransitionContent && transitionContent) {
          transitionContent.style.display = 'block';
      } else if (transitionContent) {
          transitionContent.style.display = 'none';
      }

      if (hideGreeting && greeting) {
          greeting.style.display = 'none';
      }

      changeBodyBackground(previousPageNumber);
  } else {
      console.error('Pages not found or transition not defined.');
  }
}



  

function showNextPage(pageNumber) {
  const currentPage = document.querySelector(`.page-${pageNumber}`);
  const nextPage = document.querySelector(`.page-${pageNumber + 1}`);

  if (currentPage && nextPage) {
      currentPage.style.display = 'none';
      nextPage.style.display = 'block';
      changeBodyBackground(pageNumber - 1); // Cambiar el fondo del body según la página anterior

  } else {
      console.error('Pages not found or transition not defined.');
  }
}


function showNextPageIntro(pageNumber) {
  const currentPage = document.querySelector('.page-1');
  currentPage.classList.remove('active');
  currentPage.style.display = 'none'; // Oculta la página actual

  const nextPage = document.querySelector('.page-' + pageNumber);
  nextPage.classList.add('active');
  nextPage.style.display = 'block'; // Muestra la siguiente página
  changeBodyBackground(pageNumber); // Cambiar el fondo del body según la página anterior

}



// Name-page

function showGreeting() {
  const nameInput = document.getElementById("name-text");
  const name = nameInput.value;

  if (name.trim() === "") {
    nameInput.classList.add("error-border");
    return;
  }

  const checkboxContainer = document.querySelector(".checkbox");
  const checkbox = document.getElementById("checkbox");
  if (!checkbox.checked) {
    checkboxContainer.classList.add("error-border2");
    return;
  }

  nameInput.classList.remove("error-border");
  checkboxContainer.classList.remove("error-border");

  const formContent = document.getElementById("transition-form-content");
  formContent.style.display = "none";

  const greeting = document.getElementById("greeting");
  const namePlaceholder = document.getElementById("name-placeholder");
  namePlaceholder.textContent = name;
  greeting.style.display = "block";

  setTimeout(() => {
    document.getElementById('greeting').style.display = 'none';
    document.querySelector('.page-2').style.display = 'none'; // Oculta la página 2
    document.querySelector('.page-3').style.display = 'block'; // Muestra la página 3
}, 2000);
}



// Birthday-Page

document.addEventListener("DOMContentLoaded", function () {
  const birthdayInput = document.getElementById("birthdayInput");

  function isValidDate2(dateString) {
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!regex.test(dateString)) return false;

      const [day, month, year] = dateString.split('/').map(Number);
      const date = new Date(year, month - 1, day);

      return (
          date.getFullYear() === year &&
          date.getMonth() === month - 1 &&
          date.getDate() === day
      );
  }

  birthdayInput.addEventListener("input", function (event) {
      let birthdayValue = event.target.value.trim().replace(/[^\d\/]/g, '');

      if (birthdayValue.length > 2 && birthdayValue.charAt(2) !== '/') {
          birthdayValue = `${birthdayValue.slice(0, 2)}/${birthdayValue.slice(2)}`;
      }
      if (birthdayValue.length > 5 && birthdayValue.charAt(5) !== '/') {
          birthdayValue = `${birthdayValue.slice(0, 5)}/${birthdayValue.slice(5)}`;
      }
      if (birthdayValue.length > 10) {
          birthdayValue = birthdayValue.slice(0, 10);
      }

      event.target.value = birthdayValue;
  });

  document.getElementById("nextLink").addEventListener("click", function (event) {
      const birthdayValue = birthdayInput.value.trim();

      if (!isValidDate2(birthdayValue)) {
          birthdayInput.classList.add("error-border");
          event.preventDefault();
          // Puedes mostrar un mensaje de error aquí si lo deseas
          return;
      }

      birthdayInput.classList.remove("error-border");
      showNextPage(3);
  });
});


// Country-Page

document.addEventListener("DOMContentLoaded", function() {
  const countryInput = document.getElementById("country-input");

  // Función para obtener la lista de países desde la API REST Countries
  function fetchCountries() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            const countries = data.sort((a, b) => {
                // Orden alfabético por el nombre común del país
                const nameA = a.name.common.toUpperCase();
                const nameB = b.name.common.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });

            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.name.common;
                option.textContent = country.name.common;
                countryInput.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
        });
}


  fetchCountries(); // Llamada a la función para cargar los países al cargar la página

  document.getElementById("nextButtonCountry").addEventListener("click", function (event) {
      const countryValue = countryInput.value.trim();

      if (countryValue === '' || countryValue === null) {
          countryInput.classList.add("error-border");
          event.preventDefault();
          return;
      }

      countryInput.classList.remove("error-border");

      const formContent = document.getElementById("transition-form-content0");
      formContent.style.display = "none";

      const greeting = document.getElementById("greeting0");
      greeting.style.display = "block";

      // Programa el avance automático a la siguiente página después de 5 segundos
      setTimeout(() => {
        document.getElementById('greeting').style.display = 'none';
        document.querySelector('.page-4').style.display = 'none'; // Oculta la página 2
        document.querySelector('.page-5').style.display = 'block'; // Muestra la página 3
    }, 2000);
  });
});



// Skin-Type-1select

function showCustomAlert1() {
  var customAlert = document.getElementById('customAlert');
  customAlert.style.display = 'block';
}

function closeCustomAlert1() {
  var customAlert = document.getElementById('customAlert');
  customAlert.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll('.svg-image');

  images.forEach((image) => {
    image.addEventListener('click', function() {
      toggleActive(this);
    });
  });

  function toggleActive(clickedImage) {
    images.forEach((image) => {
      image.classList.remove('active');
    });

    clickedImage.classList.add('active');
  }

  function validateSelection() {
    const selectedImages = document.querySelectorAll('.svg-image.active');

    if (selectedImages.length !== 1) {
      showCustomAlert1(); // Utiliza tu alerta personalizada
      return false;
    } else {
        const currentPage = document.querySelector('.page-7');
        currentPage.style.display = 'none'; // Ocultar página 5

        const nextPage = document.querySelector('.page-8');
        nextPage.style.display = 'block'; // Mostrar página 6
        return true;
    }
}

  const nextButton = document.getElementById('nextButton3');
  nextButton.addEventListener('click', function(event) {
    if (!validateSelection()) {
      event.preventDefault();
    }
  });
});


// Progress bar-1

document.addEventListener("DOMContentLoaded", function () {
  const percentageElement = document.getElementById("percentage");
  const circle = document.querySelector(".progress-ring-circle");
  const page6 = document.querySelector('.page-6');
  const page7 = document.querySelector('.page-7');

  function animateProgress() {
    let currentPercentage = 0;
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const animationDuration = 9500; // Duración de la animación en milisegundos
    const interval = animationDuration / 100;

    const animate = setInterval(function () {
      currentPercentage++;
      const progressOffset = circumference - (currentPercentage / 100) * circumference;
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = progressOffset;
      percentageElement.textContent = `${currentPercentage}%`;

      if (currentPercentage === 100) {
        clearInterval(animate);
        setTimeout(() => {
          page6.style.display = 'none'; 
          page7.style.display = 'block'; 
        }, 2000); 
      }
    }, interval);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateProgress();
      }
    });
  });

  observer.observe(page6);
});




// Progress bar-2
document.addEventListener("DOMContentLoaded", function () {
  const percentageElement2 = document.getElementById("percentage0");
  const circle2 = document.querySelector(".progress-ring-circle0");
  const page10 = document.querySelector('.page-10');
  const page11 = document.querySelector('.page-11');

  function animateProgress2() {
    let currentPercentage2 = 0;
    const radius2 = circle2.r.baseVal.value;
    const circumference2 = 2 * Math.PI * radius2;
    const animationDuration2 = 9500; // Duración de la animación en milisegundos
    const interval2 = animationDuration2 / 100;

    const animate2 = setInterval(function () {
      currentPercentage2++;
      const progressOffset2 = circumference2 - (currentPercentage2 / 100) * circumference2;
      circle2.style.strokeDasharray = `${circumference2} ${circumference2}`;
      circle2.style.strokeDashoffset = progressOffset2;
      percentageElement2.textContent = `${currentPercentage2}%`;

      if (currentPercentage2 >= 100) {
        clearInterval(animate2);
        setTimeout(() => {
          page10.style.display = 'none'; // Ocultar la página actual después de 2 segundos
          page11.style.display = 'block'; // Mostrar la siguiente página
        }, 2000); // Retraso de 2 segundos antes de ocultar la página
      }
    }, interval2);
  }

  const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateProgress2(); // Comienza la animación cuando la página se vuelve visible
      }
    });
  });

  observer2.observe(page10);
});

// Progress bar-3
document.addEventListener("DOMContentLoaded", function () {
  const percentageElement3 = document.getElementById("percentage1");
  const circle3 = document.querySelector(".progress-ring-circle1");
  const page14 = document.querySelector('.page-14');
  const page15 = document.querySelector('.page-15');

  function animateProgress3() {
    let currentPercentage3 = 0;
    const radius3 = circle3.r.baseVal.value;
    const circumference3 = 2 * Math.PI * radius3;
    const animationDuration3 = 9500; 
    const interval3 = animationDuration3 / 100;

    const animate3 = setInterval(function () {
      currentPercentage3++;
      const progressOffset3 = circumference3 - (currentPercentage3 / 100) * circumference3;
      circle3.style.strokeDasharray = `${circumference3} ${circumference3}`;
      circle3.style.strokeDashoffset = progressOffset3;
      percentageElement3.textContent = `${currentPercentage3}%`;

      if (currentPercentage3 >= 100) {
        clearInterval(animate3);
        setTimeout(() => {
          page14.style.display = 'none'; 
          page15.style.display = 'block'; 
        }, 2000); 
      }
    }, interval3);
  }

  const observer3 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateProgress3(); 
      }
    });
  });

  observer3.observe(page14);
});


// Transicion-done


document.addEventListener("DOMContentLoaded", function () {
  const page8 = document.querySelector('.page-8');
  const page9 = document.querySelector('.page-9');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target === page8) {
        setTimeout(function () {
          page8.style.display = 'none'; 
          page9.style.display = 'block'; 
        }, 3000);
      }
    });
  });

  observer.observe(page8);
});


document.addEventListener("DOMContentLoaded", function () {
  const page12 = document.querySelector('.page-12');
  const page13 = document.querySelector('.page-13');

  const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target === page12) {
        setTimeout(function () {
          page12.style.display = 'none'; // Ocultar la página 8 después de 3 segundos
          page13.style.display = 'block'; // Mostrar la página 9
        }, 3000); // Esperar 3 segundos antes de cambiar las páginas
      }
    });
  });

  observer2.observe(page12);
});

document.addEventListener("DOMContentLoaded", function () {
  const page16 = document.querySelector('.page-16');
  const page17 = document.querySelector('.page-17');

  const observer3 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target === page16) {
        setTimeout(function () {
          page16.style.display = 'none'; // Ocultar la página 8 después de 3 segundos
          page17.style.display = 'block'; // Mostrar la página 9
        }, 3000); // Esperar 3 segundos antes de cambiar las páginas
      }
    });
  });

  observer3.observe(page16);
});

document.addEventListener("DOMContentLoaded", function () {
  const page17 = document.querySelector('.page-17');
  const page18 = document.querySelector('.page-18');

  const observer4 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target === page17) {
        setTimeout(function () {
          page17.style.display = 'none'; // Ocultar la página 8 después de 3 segundos
          page18.style.display = 'block'; // Mostrar la página 9
        }, 3000); // Esperar 3 segundos antes de cambiar las páginas
      }
    });
  });

  observer4.observe(page17);
});




// Solo un seleccionable2

function showCustomAlert2() {
  var customAlert0 = document.getElementById('customAlert0');
  customAlert0.style.display = 'block';
}

// Función para cerrar la alerta personalizada
function closeCustomAlert2() {
  var customAlert0 = document.getElementById('customAlert0');
  customAlert0.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function () {
  const options2 = document.querySelectorAll('.skyn-age-select option');

  options2.forEach((option) => {
    option.addEventListener('click', function() {
      toggleActiveAge(this);
    });
  });

  function toggleActiveAge(clickedOption) {
    options2.forEach((option) => {
      option.classList.remove('active');
    });

    clickedOption.classList.add('active');
  }

  function validateSelectionThree() {
    const selectedOptions = document.querySelectorAll('.skyn-age-select option.active');

    if (selectedOptions.length !== 1) {
      showCustomAlert2(); 
      return false;
    } else {
        const currentPage = document.querySelector('.page-11');
        currentPage.style.display = 'none'; 

        const nextPage = document.querySelector('.page-12');
        nextPage.style.display = 'block'; 
        return true;
    }
  
}

  const nextButton0 = document.querySelector('#nextButton4');
  nextButton0.addEventListener('click', function(event) {
    if (!validateSelectionThree()) {
      event.preventDefault();
    }
  });
});


// Solo un seleccionable3


function showCustomAlert() {
  var customAlert = document.getElementById('customAlert1');
  customAlert.style.display = 'block';
}

// Función para cerrar la alerta personalizada
function closeCustomAlert() {
  var customAlert = document.getElementById('customAlert1');
  customAlert.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function () {
  const options3 = document.querySelectorAll('.skyn-damage-select option');
  
  options3.forEach((option1) => {
    option1.addEventListener('click', function() {
      toggleActive3(this);
    });
  });

  function toggleActive3(clickedOption) {
    options3.forEach((option1) => {
      option1.classList.remove('active');
    });

    clickedOption.classList.add('active');
  }

  function validateSelectionThree() {
    const selectedOptions3 = document.querySelectorAll('.skyn-damage-select option.active');

    if (selectedOptions3.length !== 1) {
      showCustomAlert(); 
      return false;
    } else {
        const currentPage3 = document.querySelector('.page-15');
        currentPage3.style.display = 'none'; 

        const nextPage3 = document.querySelector('.page-16');
        nextPage3.style.display = 'block'; 
        return true;
    }
  
}

  const nextButton5 = document.querySelector('#nextButton5');
  nextButton5.addEventListener('click', function(event) {
    if (!validateSelectionThree()) {
      event.preventDefault();
    }
  });
});


// Multiple chpize
function showCustomAlert3() {
  var customAlert3 = document.getElementById('customAlert2');
  customAlert3.style.display = 'block';
}

// Función para cerrar la alerta personalizada
function closeCustomAlert3() {
  var customAlert3 = document.getElementById('customAlert2');
  customAlert3.style.display = 'none';
}

var selectedCount = 0;

function toggleActive4(element) {
    element.classList.toggle('selected');
    element.classList.toggle('active');
    selectedCount = document.querySelectorAll('.option.selected').length;
}

function checkSelection() {
    if (selectedCount === 0) {
        showCustomAlert3(); 
    } else {
        const currentSection = document.querySelector('.page-18');
        const nextSection = document.querySelector('.page-19');

        currentSection.style.display = 'none'; 
        nextSection.style.display = 'block'; 
    }
}

function showCustomAlert4() {
  var customAlert4 = document.getElementById('customAlert3');
  customAlert4.style.display = 'block';
}

// Función para cerrar la alerta personalizada
function closeCustomAlert4() {
  var customAlert4 = document.getElementById('customAlert3');
  customAlert4.style.display = 'none';
}


var selectedCount2 = 0;

function toggleActive5(element) {
    element.classList.toggle('selected');
    element.classList.toggle('active');
    selectedCount2 = document.querySelectorAll('.option0.selected').length;
}

function checkSelection2() {
    if (selectedCount2 === 0) {
        showCustomAlert4(); 
    } else {
        const currentSection2 = document.querySelector('.page-19');
        const nextSection2 = document.querySelector('.page-20');

        currentSection2.style.display = 'none'; 
        nextSection2.style.display = 'block'; 
    }
}



function showCustomAlert5() {
  var customAlert5 = document.getElementById('customAlert5');
  customAlert5.style.display = 'block';
}

// Función para cerrar la alerta personalizada
function closeCustomAlert5() {
  var customAlert5 = document.getElementById('customAlert5');
  customAlert5.style.display = 'none';
}

var selectedCount3 = 0;

function toggleActive6(element) {
    element.classList.toggle('selected');
    element.classList.toggle('active');
    selectedCount3 = document.querySelectorAll('.option1.selected').length;
}

function checkSelection3() {
  if (selectedCount3 === 0) {
      showCustomAlert5(); // Mostrar alerta si no hay opciones seleccionadas
  } else {
      const currentSection3 = document.querySelector('.page-21');
      const nextSection3 = document.querySelector('.page-22');

      currentSection3.style.display = 'none'; // Oculta la sección actual
      nextSection3.style.display = 'block'; // Muestra la siguiente sección

      // Verificar si la próxima sección es la página 22 y cambiar el color del fondo
      if (nextSection3.classList.contains('page-22')) {
          document.body.style.backgroundColor = 'white';
      } else {
          document.body.style.backgroundColor = ''; // Restaurar el color de fondo predeterminado si no es la página 22
      }
  }
}




  //   Results-function
  function resultsFuncion(strokeColor) {
    var rectangles = document.getElementsByClassName('rectangle');
  
    for (var i = 0; i < rectangles.length; i++) {
      var rect = rectangles[i];
      var rectStrokeColor = rect.getAttribute('stroke');
  
      if (rectStrokeColor === strokeColor) {
        rect.style.display = (rect.style.display === 'none') ? 'block' : 'none';
      }
    }
  }
  
  
  
  // Email finally

  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("nextButton2").addEventListener("click", function (event) {
      // Obtén el valor del input
      const emailInput = document.getElementById("email");
      const emailValue = emailInput.value.trim();

      // Verifica si el valor es un correo electrónico válido
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

      if (!isValidEmail) {

        emailInput.classList.add("error-border");

        event.preventDefault();
        return;
      }

      // Si es un correo electrónico válido, elimina el estilo de borde rojo
      emailInput.classList.remove("error-border");

      const currentSection3 = document.querySelector('.page-20');
      const nextSection3 = document.querySelector('.page-21');

      currentSection3.style.display = 'none'; // Oculta la sección actual
      nextSection3.style.display = 'block'; // Muestra la siguiente sección

    });
  });