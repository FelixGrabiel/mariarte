// main.js
document.addEventListener('DOMContentLoaded', () => {
    const cart = [];

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            cart.push(productId);
            alert(`Producto ${productId} añadido al carrito.`);
        });
    });

    const checkoutButton = document.getElementById('checkout');
    checkoutButton.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Procediendo al pago...');
            // Aquí se puede implementar la lógica de pago
        } else {
            alert('El carrito está vacío.');
        }
    });
});