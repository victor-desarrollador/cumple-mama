/*-------------scroll aos -----------------*/


AOS.init();

let audio = null;
let playing = false;

window.addEventListener('DOMContentLoaded', function() {
  const intro = document.getElementById('intro');
  if (intro) {
    intro.style.visibility = 'visible';
    intro.style.opacity = '1';
  }
  document.body.classList.add('intro-open');

  audio = document.getElementById('bg-audio') || document.querySelector('audio');
  if (audio) {
    audio.loop = true;
    audio.preload = 'auto';
  }

  const introButton = document.getElementById('intro-btn-main');
  if (introButton) {
    introButton.addEventListener('click', revealSite);
  }
});

function revealSite() {
  const intro = document.getElementById('intro');
  if (!intro) return;
  document.body.classList.remove('intro-open');
  intro.classList.add('hidden');
  setTimeout(() => {
    intro.style.display = 'none';
  }, 900);

  const musicFloat = document.getElementById('music-float');
  if (musicFloat) musicFloat.classList.add('visible');

  startMusicAfterUserInteraction();
}

function startMusicAfterUserInteraction() {
  if (!audio) return;
  audio.volume = 0;
  audio.load();
  audio.play().then(() => {
    playing = true;
    document.getElementById('mf-play').textContent = '⏸';
    let v = 0;
    const fade = setInterval(() => {
      v += 0.05;
      if (v >= 0.6) {
        audio.volume = 0.6;
        clearInterval(fade);
      } else {
        audio.volume = v;
      }
    }, 200);
  }).catch(() => {
    console.log('Autoplay bloqueado — el usuario podrá tocar play manualmente.');
  });
}

function togglePlay() {
  if (!audio) return;
  if (audio.paused) {
    audio.play().then(() => {
      document.getElementById('mf-play').textContent = '⏸';
      playing = true;
    }).catch(() => {
      console.log('Autoplay bloqueado');
    });
  } else {
    audio.pause();
    document.getElementById('mf-play').textContent = '▶';
    playing = false;
  }
}

// ---------------------- temporizador -------------------------
function updateTimer() {
  const targetDate = new Date("august 16, 2026 13:00:00").getTime();
  const currentDate = new Date().getTime();
  const timeRemaining = targetDate - currentDate;

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

updateTimer();
setInterval(updateTimer, 1000);

// --------------------------------fotos---------------------------------




document.addEventListener("DOMContentLoaded", function() {
  new Swiper(".mySwiper", {
      effect: "cards",
      grabCursor: true,
  });

  // Inicializar Fancybox v5 (CDN @fancyapps/ui)
  if (typeof Fancybox !== 'undefined') {
    Fancybox.bind('[data-fancybox="gallery"]', {
      loop: true,
      infobar: true,
      arrows: true,
      protect: true,
      animationEffect: "fade",
      transitionEffect: "slide",
      transitionDuration: 500,
      touch: {
          vertical: false,
      },
      autoFocus: false,
    });
  }
});




  // --------------------------- dresscode --------------------------

document.addEventListener('DOMContentLoaded', function () {
  const showImageBtn = document.getElementById("showImage");
  const lightbox = document.getElementById("lightbox");
  const closeButton = document.getElementById("closeButton");

  if (showImageBtn && lightbox) {
    showImageBtn.addEventListener("click", function() {
      lightbox.style.display = "flex";
    });
  }

  if (closeButton && lightbox) {
    closeButton.addEventListener("click", function() {
      lightbox.style.display = "none";
    });
  }
});


// --------------------------------gift---------------------------------

document.addEventListener('DOMContentLoaded', function () {
  const boton = document.getElementById('mostrarBoton');
  const textoDesplegable = document.getElementById('textoDesplegable');

  if (boton && textoDesplegable) {
    boton.addEventListener('click', function () {
      textoDesplegable.classList.toggle('mostrar');
    });
  }
});


function copyText() {
  var aliasText = document.getElementById('alias').innerText; // Obtener el texto del alias
  var tempInput = document.createElement('input');
  tempInput.value = aliasText;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);

  // Mostrar el mensaje de "¡Copiado!"
  var copyMessage = document.getElementById('copyMessage');
  copyMessage.style.display = 'block';
  setTimeout(function() {
      copyMessage.style.display = 'none';
  }, 1500); // Ocultar el mensaje después de 1.5 segundos
}



function copyCbuText() {
  const aliasText = document.getElementById('cbuAlias').textContent;
  const copyMessage = document.getElementById('copyCbuMessage');

  const textarea = document.createElement('textarea');
  textarea.value = aliasText;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);

  copyMessage.style.display = 'block';
  setTimeout(() => {
      copyMessage.style.display = 'none';
  }, 2000);
}


// --------------------------- playlist --------------------------------

document.addEventListener('DOMContentLoaded', function() {
  // Definir los números de teléfono
  const phoneNumber1 = '543816591298'; // Número para el primer botón
  const phoneNumber2 = '543814663266'; // Número para el segundo botón

  // Función para enviar mensaje por WhatsApp
  function sendMessage(phoneNumber) {
      const name = document.getElementById('userName').value.trim();
      const message = document.getElementById('whatsappMessage').value.trim();

      if (name === '' || message === '') {
          alert('Por favor, completa ambos campos antes de enviar.');
          return;
      }

      const fullMessage = `*Nombre y Apellido:* ${name}\n\n*Tema recomendado:* ${message}`;
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(fullMessage)}`;

      // Abre la URL de WhatsApp en una nueva pestaña
      window.open(whatsappURL, '_blank');

      // Mostrar mensaje de confirmación
      alert('Mensaje enviado');

      // Limpiar los campos de entrada
      document.getElementById('userName').value = '';
      document.getElementById('whatsappMessage').value = '';

      // Volver al bloque de formulario
      document.getElementById('playlist').scrollIntoView({ behavior: 'smooth' });
  }

  // Asignar eventos a los botones
  document.getElementById('recomendarPlay1').addEventListener('click', function() {
      sendMessage(phoneNumber1);
  });

  document.getElementById('recomendarPlay2').addEventListener('click', function() {
      sendMessage(phoneNumber2);
  });
});


// ----------------------- confirmacion ---------------------------


document.addEventListener('DOMContentLoaded', function() {
  // Definir el número de teléfono único sin el signo + para wa.me
  const recipientNumber = '543816224395';

  // Función para enviar mensaje por WhatsApp
  function sendMessage() {
      const userName = document.getElementById('userFullName').value.trim();
      const userMessage = document.getElementById('customMessage').value.trim();
      const attendanceStatus = document.querySelector('input[name="attendanceOption"]:checked');

      if (!attendanceStatus) {
          alert('Por favor, selecciona si asistirás o no.');
          return;
      }

      if (userName === '') {
          alert('Por favor, completa todos los campos antes de enviar.');
          return;
      }

      const finalMessage = `*Presencia:* ${attendanceStatus.value}\n*Nombre y Apellido:* ${userName}\n*Mensaje:* ${userMessage ? userMessage : 'N/A'}`;
      const whatsappLink = `https://wa.me/${recipientNumber}?text=${encodeURIComponent(finalMessage)}`;

      // Abre la URL de WhatsApp en una nueva pestaña
      window.open(whatsappLink, '_blank');

      // Mostrar mensaje de confirmación
      alert('Mensaje enviado');

      // Limpiar los campos de entrada
      document.getElementById('userFullName').value = '';
      document.getElementById('customMessage').value = '';
      document.querySelectorAll('input[name="attendanceOption"]').forEach(radio => radio.checked = false);

      // Volver al bloque de formulario
      document.getElementById('correo').scrollIntoView({ behavior: 'smooth' });
  }

  // Asignar eventos a los botones
  document.getElementById('confirmar1').addEventListener('click', function() {
      sendMessage();
  });

  document.getElementById('confirmar2').addEventListener('click', function() {
      sendMessage();
  });
});





function descargarArchivo() {
  // Mostrar la alerta "Descargado" durante 1 segundo
  setTimeout(function() {
    alert('Descargado');
  }, 1000);
}