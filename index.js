// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Elementos
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  
  const htmlElement = document.documentElement;
  const bodyElement = document.body;
  
  // Verificar si hay un tema guardado en localStorage
  const savedTheme = localStorage.getItem('theme');
  
  // Aplicar tema guardado o tema por defecto
  if (savedTheme === 'dark') {
    enableDarkMode();
  } else {
    enableLightMode();
  }
  
  // Función para activar modo oscuro
  function enableDarkMode() {
    bodyElement.classList.add('dark');
    themeIcon.src = '/img/Icon Sol.png';
    themeIcon.alt = 'Modo Claro';
    localStorage.setItem('theme', 'dark');
  }
  
  // Función para activar modo claro
  function enableLightMode() {
    bodyElement.classList.remove('dark');
    themeIcon.src = '/img/Icon Luna.png';
    themeIcon.alt = 'Modo Oscuro';
    localStorage.setItem('theme', 'light');
  }
  
  // Función para alternar entre temas
  function toggleTheme() {
    if (bodyElement.classList.contains('dark')) {
      enableLightMode();
    } else {
      enableDarkMode();
    }
    
    // Añadir animación al botón
    themeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
      themeToggle.style.transform = 'scale(1)';
    }, 150);
  }
  
  // Escuchar clic en el botón
  themeToggle.addEventListener('click', toggleTheme);
  
  // Detectar preferencia del sistema (opcional)
  function detectSystemTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Si no hay tema guardado, usar la preferencia del sistema
    if (!savedTheme) {
      if (prefersDark.matches) {
        enableDarkMode();
      } else {
        enableLightMode();
      }
    }
    
    // Escuchar cambios en la preferencia del sistema
    prefersDark.addEventListener('change', (e) => {
      if (!savedTheme) { // Solo aplicar si no hay tema guardado manualmente
        if (e.matches) {
          enableDarkMode();
        } else {
          enableLightMode();
        }
      }
    });
  }
  
  // Llamar a la detección del sistema
  detectSystemTheme();
  const langToggle = document.getElementById('langToggle');
const langMenu = document.getElementById('langMenu');
const langLabel = document.querySelector('.lang-label');
const langOption = document.querySelector('.lang-option');

if (langToggle && langMenu && langOption) {
  langToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = langMenu.classList.toggle('show');
    langToggle.classList.toggle('open', isOpen);
    langToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    langMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  });

  // Handle selecting an option (redirect to corresponding page)
  langMenu.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-option');
    if (!btn) return;

    const selected = btn.getAttribute('data-lang');

    // Redirect mapping: 'es' -> Spanish index, 'en' -> English page
    if (selected === 'es') {
      window.location.href = 'index.html';
      return;
    }

    if (selected === 'en') {
      window.location.href = 'PorfolioEN.html';
      return;
    }

    // Fallback: close menu
    langMenu.classList.remove('show');
    langToggle.classList.remove('open');
    langToggle.setAttribute('aria-expanded', 'false');
    langMenu.setAttribute('aria-hidden', 'true');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!langMenu.classList.contains('show')) return;
    if (!langToggle.contains(e.target) && !langMenu.contains(e.target)) {
      langMenu.classList.remove('show');
      langToggle.classList.remove('open');
      langToggle.setAttribute('aria-expanded', 'false');
      langMenu.setAttribute('aria-hidden', 'true');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && langMenu.classList.contains('show')) {
      langMenu.classList.remove('show');
      langToggle.classList.remove('open');
      langToggle.setAttribute('aria-expanded', 'false');
      langMenu.setAttribute('aria-hidden', 'true');
    }
  });
}
});

// descargar PDF

function DescargarPDF() {
  const link = document.createElement('a');
  link.href = '/Archivos/cv Joel Mancilla C (1).pdf';
  link.download = 'CV Joel Mancilla';
  link.click();
}


// Animaciones JS

// ========================================
// SCRIPT DE ANIMACIONES AL HACER SCROLL
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Configuración del Intersection Observer
  const observerOptions = {
    threshold: 0.15, // El elemento debe ser visible al 15%
    rootMargin: '0px 0px -50px 0px' // Comienza la animación un poco antes
  };

  // Crear el observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Agregar clase 'animated' cuando el elemento es visible
        entry.target.classList.add('animated');
        
        // Opcional: dejar de observar después de animar (animación una sola vez)
        // observer.unobserve(entry.target);
      } else {
        // Opcional: remover la clase cuando sale de vista (para reanimar)
        // entry.target.classList.remove('animated');
      }
    });
  }, observerOptions);

  // Seleccionar todos los elementos con la clase 'animate-on-scroll'
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  // Observar cada elemento
  animatedElements.forEach(element => {
    observer.observe(element);
  });

  function animateChildren(parentSelector, animationClass, delayIncrement = 100) {
    const parent = document.querySelector(parentSelector);
    if (!parent) return;
    
    const children = parent.children;
    Array.from(children).forEach((child, index) => {
      child.classList.add('animate-on-scroll', animationClass);
      child.style.transitionDelay = `${index * delayIncrement}ms`;
      observer.observe(child);
    });
  }

  // Ejemplo de uso:
  // animateChildren('.desarrollo-web', 'fade-in-up', 150);
  // animateChildren('.DiseñoUIUX', 'fade-in-up', 150);

  const staggeredContainers = document.querySelectorAll('[data-stagger]');
  
  staggeredContainers.forEach(container => {
    const children = container.querySelectorAll('[data-stagger-item]');
    const delayBase = parseInt(container.dataset.stagger) || 100;
    
    children.forEach((child, index) => {
      child.style.transitionDelay = `${index * delayBase}ms`;
    });
  });
});


// Animar elemento específico programáticamente
function animateElement(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.classList.add('animated');
  }
}


function resetAnimation(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.classList.remove('animated');
  }
}

// Animar todos los elementos inmediatamente (sin scroll)
function animateAll() {
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.classList.add('animated');
  });
}


// Menu De hamburguesas

    // Menu De hamburguesas
    document.addEventListener('DOMContentLoaded', function() {
      const burger = document.getElementById('burger');
      const menu = document.getElementById('menu');
      const overlay = document.getElementById('overlay');
      const menuLinks = document.querySelectorAll('.menu-link');
      
      // Función para alternar el menú
      function toggleMenu() {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Prevenir scroll del body cuando el menú está abierto
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
      }
      
      // Evento para el botón hamburguesa
      burger.addEventListener('click', toggleMenu);
      
      // Evento para cerrar el menú al hacer clic en el overlay
      overlay.addEventListener('click', toggleMenu);
      
      // Evento para cerrar el menú al hacer clic en un enlace
      menuLinks.forEach(link => {
        link.addEventListener('click', function() {
          // Solo cerrar el menú en dispositivos móviles
          if (window.innerWidth <= 968) {
            toggleMenu();
          }
        });
      });
      
      // Cerrar el menú al cambiar el tamaño de la ventana si se sale del rango móvil
      window.addEventListener('resize', function() {
        if (window.innerWidth > 968 && menu.classList.contains('active')) {
          burger.classList.remove('active');
          menu.classList.remove('active');
          overlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });