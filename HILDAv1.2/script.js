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

    // Animaciones con GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Animación para el hero
    gsap.from('.hero h1, .hero p, .hero .button', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top 80%',
        }
    });

    // Animación para los productos destacados
    gsap.from('.product-card', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.featured-products',
            start: 'top 80%',
        }
    });

    // Animación para la sección "Sobre Nosotros"
    gsap.from('.about-us h2, .about-us p, .about-us .button', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about-us',
            start: 'top 80%',
        }
    });

    // Animación para los testimonios
    gsap.from('.testimonial-card', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.testimonials',
            start: 'top 80%',
        }
    });

    // Efecto de hover para los botones
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {duration: 0.3, scale: 1.05, backgroundColor: '#2c7a75', color: 'white'});
        });
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {duration: 0.3, scale: 1, backgroundColor: 'white', color: '#43a9a3'});
        });
    });
});
