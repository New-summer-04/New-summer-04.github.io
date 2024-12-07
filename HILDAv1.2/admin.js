document.addEventListener('DOMContentLoaded', function() {
    // Inicializar los iconos de Lucide
    lucide.createIcons();

    // Toggle del menú para pantallas pequeñas
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('show');
    });

    // Manejar el envío del formulario
    const form = document.getElementById('add-product-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const product = Object.fromEntries(formData.entries());

        // Convertir el precio a número
        product.price = parseFloat(product.price);

        try {
            const response = await fetch('productos.json');
            let products = await response.json();

            // Agregar el nuevo producto
            products[product.id] = product;

            // Guardar los productos actualizados
            await fetch('productos.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(products),
            });

            alert('Producto agregado con éxito');
            form.reset();
        } catch (error) {
            console.error('Error al agregar el producto:', error);
            alert('Error al agregar el producto. Por favor, intenta de nuevo.');
        }
    });
});