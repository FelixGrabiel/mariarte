document.addEventListener('DOMContentLoaded', () => {
  const carritoBtn = document.getElementById('carrito-btn');
  const modalCarrito = document.getElementById('modal-carrito');
  const listaCarrito = document.getElementById('lista-carrito');
  const totalCarrito = document.getElementById('total-carrito');
  const cerrarCarrito = document.getElementById('cerrar-carrito');
  const vaciarCarrito = document.getElementById('vaciar-carrito');
  const enviarPedido = document.getElementById('enviar-pedido');
  const pagarCarrito = document.getElementById('pagar-carrito');

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  carritoBtn.addEventListener('click', () => {
    modalCarrito.style.display = modalCarrito.style.display === 'block' ? 'none' : 'block';
  });

  cerrarCarrito.addEventListener('click', () => {
    modalCarrito.style.display = 'none';
  });

  vaciarCarrito.addEventListener('click', () => {
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
  });
enviarPedido.addEventListener('click', () => {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }

  let mensaje = '🛍️ *MariArte - Pedido por WhatsApp* 🛍️\n\n';
  carrito.forEach(producto => {
    mensaje += `🔹 *${producto.nombre}* x${producto.cantidad} - S/.${(producto.precio * producto.cantidad).toFixed(2)}\n`;
  });

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2);
  mensaje += `\n💰 *Total: S/.${total}*`;

  // Asegúrate de que el número esté en formato correcto
  const numeroWhatsApp = '51928850901'; // Reemplaza si es otro

  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
});


  function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.nombre} - S/.${item.precio.toFixed(2)} x ${item.cantidad}
        <div class="botones-carrito">
          <button class="restar" data-index="${index}">-</button>
          <button class="sumar" data-index="${index}">+</button>
          <button class="eliminar" data-index="${index}">🗑️</button>
        </div>
      `;

      listaCarrito.appendChild(li);
      total += item.precio * item.cantidad;
    });

    totalCarrito.textContent = `Total: S/.${total.toFixed(2)}`;

    // Botones funcionales
    document.querySelectorAll('.restar').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        if (carrito[index].cantidad > 1) {
          carrito[index].cantidad--;
        } else {
          carrito.splice(index, 1);
        }
        guardarCarrito();
        actualizarCarrito();
      });
    });

    document.querySelectorAll('.sumar').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        carrito[index].cantidad++;
        guardarCarrito();
        actualizarCarrito();
      });
    });

    document.querySelectorAll('.eliminar').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        carrito.splice(index, 1);
        guardarCarrito();
        actualizarCarrito();
      });
    });
  }

  const botonesAgregar = document.querySelectorAll('.agregar-carrito');
  botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
      const nombre = boton.getAttribute('data-nombre');
      const precio = parseFloat(boton.getAttribute('data-precio'));
      const cantidadInput = boton.previousElementSibling;
      const cantidad = parseInt(cantidadInput?.value) || 1;

      if (cantidad <= 0) {
        alert("La cantidad debe ser mayor a cero.");
        return;
      }

      const productoExistente = carrito.find(item => item.nombre === nombre);
      if (productoExistente) {
        productoExistente.cantidad += cantidad;
      } else {
        carrito.push({ nombre, precio, cantidad });
      }

      guardarCarrito();
      actualizarCarrito();

      // Animación visual al agregar
      carritoBtn.classList.add('carrito-animado');
      setTimeout(() => {
        carritoBtn.classList.remove('carrito-animado');
      }, 400);
    });
  });
pagarCarrito.addEventListener('click', () => {
  if (carrito.length === 0) {
    alert('No hay productos en el carrito para pagar.');
    return;
  }

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2);

  // Simulación de pago
  alert(`✅ Gracias por tu compra.\nTotal a pagar: S/.${total}\nPor ahora este botón es solo demostrativo.`);

  // Aquí puedes vaciar el carrito si quieres
  // carrito = [];
  // guardarCarrito();
  // actualizarCarrito();
});

  actualizarCarrito(); // Inicializar al cargar
});
