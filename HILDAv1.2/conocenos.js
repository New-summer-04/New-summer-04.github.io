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

    gsap.from('.about-grid', {
        scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out'
    });

    gsap.from('.mission-vision', {
        scrollTrigger: {
            trigger: '.mission-vision',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out'
    });

    gsap.from('.team-member', {
        scrollTrigger: {
            trigger: '.team-grid',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power2.out'
    });
});
