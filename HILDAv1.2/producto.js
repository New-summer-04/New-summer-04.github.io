document.addEventListener('DOMContentLoaded', function() {
    // Inicializar los iconos de Lucide
    lucide.createIcons();

    // Toggle del menú para pantallas pequeñas
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('show');
    });

    // Obtener el ID del producto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Función para cargar los detalles del producto
    async function loadProductDetails(productId) {
        try {
            const response = await fetch('productos.json');
            const productDetails = await response.json();
            
            const product = productDetails[productId];
            if (product) {
                document.getElementById('product-name').innerHTML = `<i data-lucide="package"></i> <span>${product.name}</span>`;
                document.getElementById('product-description').textContent = product.description;
                const featuresList = document.getElementById('product-features');
                featuresList.innerHTML = '';
                product.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    featuresList.appendChild(li);
                });
                document.getElementById('product-ingredients').textContent = product.ingredients;
                document.getElementById('product-usage').textContent = product.usage;

                // Actualizar las imágenes
                const mainImage = document.getElementById('main-image');
                const thumbnailGrid = document.querySelector('.thumbnail-grid');
                
                // Establecer la imagen principal
                mainImage.src = product.images[0];
                mainImage.alt = product.name;

                // Limpiar y actualizar las miniaturas
                thumbnailGrid.innerHTML = '';
                product.images.forEach((imgSrc, index) => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = `${product.name} - Imagen ${index + 1}`;
                    img.classList.add('thumbnail');
                    img.addEventListener('click', function() {
                        mainImage.src = this.src;
                        mainImage.alt = this.alt;
                    });
                    thumbnailGrid.appendChild(img);
                });

                // Reinicializar los iconos de Lucide después de actualizar el contenido
                lucide.createIcons();
            }
        } catch (error) {
            console.error('Error al cargar los detalles del producto:', error);
        }
    }

    // Cargar los detalles del producto
    if (productId) {
        loadProductDetails(productId);
    }

    // Implementar scroll suave para los enlaces de navegación si el destino está en la misma página
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            // Solo previene el comportamiento predeterminado si el targetElement existe en la misma página
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
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
});