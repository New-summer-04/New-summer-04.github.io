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

    // Animación para el hero del catálogo
    gsap.from('.catalog-hero h1, .catalog-hero p', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.catalog-hero',
            start: 'top 80%',
        }
    });

    // Animación para los productos
    gsap.from('.product-card', {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.product-grid',
            start: 'top 80%',
        }
    });

    // Filtrado de productos
    const filterButtons = document.querySelectorAll('.filter-button');
    const products = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filtrar productos
            products.forEach(product => {
                if (filter === 'all' || product.getAttribute('data-category') === filter) {
                    gsap.to(product, {duration: 0.5, opacity: 1, scale: 1, display: 'block'});
                } else {
                    gsap.to(product, {duration: 0.5, opacity: 0, scale: 0.8, display: 'none'});
                }
            });
        });
    });

    // Efecto de hover para los botones de productos
    const productButtons = document.querySelectorAll('.product-card .button');
    productButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {duration: 0.3, scale: 1.05, backgroundColor: '#2c7a75'});
        });
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {duration: 0.3, scale: 1, backgroundColor: '#43a9a3'});
        });
    });
});

