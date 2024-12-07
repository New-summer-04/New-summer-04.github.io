document.addEventListener('DOMContentLoaded', function() {
    // Inicializar los iconos de Lucide
    lucide.createIcons();

    // Toggle del menú para pantallas pequeñas
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('show');
    });

    // Implementar scroll suave y efectos de hover para los enlaces de navegación
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            // Solo previene el comportamiento predeterminado si el targetElement existe en la misma página
            if (targetElement) {
                e.preventDefault();
                gsap.to(window, {duration: 1, scrollTo: targetElement, ease: "power2.inOut"});
            }
        });

        // Hover efecto para íconos de navegación
        link.addEventListener('mouseenter', function () {
            gsap.to(this, {duration: 0.3, scale: 1.1, color: '#43a9a3'});
        });
        link.addEventListener('mouseleave', function () {
            gsap.to(this, {duration: 0.3, scale: 1, color: '#333'});
        });
    });

    // Añadir clase 'sticky' al header cuando se hace scroll
    const header = document.querySelector('header');
    const sticky = header.offsetTop;
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > sticky) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Animación para las secciones al hacer scroll
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power2.out'
    });

    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power2.out'
    });

    // Manejar el envío del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí iría la lógica para enviar el formulario
            // Por ahora, solo mostraremos un mensaje de éxito
            alert('Gracias por tu mensaje. Te contactaremos pronto.');
            
            // Limpiar el formulario
            contactForm.reset();
        });
    }

    // Validación del formulario
    const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
    });

    // Funcionalidad del botón de WhatsApp
    const whatsappButton = document.getElementById('whatsapp-button');
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Número de teléfono de WhatsApp (reemplaza con el número correcto)
            const phoneNumber = '5627351921';
            
            // Mensaje predeterminado (opcional)
            const message = encodeURIComponent('Hola, me gustaría obtener más información sobre sus productos.');
            
            // Crear el enlace de WhatsApp
            const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;
            
            // Abrir WhatsApp en una nueva pestaña
            window.open(whatsappLink, '_blank');
        });
    }
});

