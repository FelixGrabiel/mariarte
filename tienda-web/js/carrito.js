let carrito = [];

document.querySelectorAll('.agregar-carrito').forEach(btn => {
  btn.addEventListener('click', () => {
    const nombre = btn.getAttribute('data-nombre');
    const precio = parseFloat(btn.getAttribute('data-precio'));

    const productoExistente = carrito.find(item => item.nombre === nombre);
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      carrito.push({ nombre, precio, cantidad: 1 });
    }

    actualizarCarrito();
  });
});

document.getElementById('carrito-btn').addEventListener('click', () => {
  document.getElementById('modal-carrito').style.display = 'block';
  actualizarCarrito();
});

document.getElementById('cerrar-carrito').addEventListener('click', () => {
  document.getElementById('modal-carrito').style.display = 'none';
});

document.getElementById('vaciar-carrito').addEventListener('click', () => {
  carrito = [];
  actualizarCarrito();
});

document.getElementById('enviar-pedido').addEventListener('click', () => {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }

  let mensaje = 'Hola, quiero hacer un pedido:%0A';
  carrito.forEach(item => {
    mensaje += `• ${item.nombre} x${item.cantidad} - S/ ${(item.precio * item.cantidad).toFixed(2)}%0A`;
  });

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  mensaje += `%0ATotal: S/ ${total.toFixed(2)}`;

  const numeroWhatsApp = '51928850901';
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
  window.open(url, '_blank');
});

function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  lista.innerHTML = '';

  carrito.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nombre} x${item.cantidad} - S/ ${(item.precio * item.cantidad).toFixed(2)}`;
    lista.appendChild(li);
  });
}
