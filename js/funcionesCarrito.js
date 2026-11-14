import { obtenerCarrito, guardarCarrito, vaciarStorageCarrito } from "./storage.js";
import { actualizarContadorCarrito, mostrarNotificacion, formatearPrecio } from "./ui.js";

export function renderizarCarrito() {
    const contenedor = document.getElementById("carrito-container");
    const resumen = document.getElementById("carrito-resumen");
    const totalElemento = document.getElementById("total-compra");

    if (!contenedor || !resumen || !totalElemento) return;

    const carrito = obtenerCarrito();
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="carrito-vacio">
                <p>Tu carrito está vacío por el momento 🎶</p>
                <a href="../index.html#productos" class="btn-comprar">Explorar Catálogo</a>
            </div>
        `;
        resumen.style.display = "none";
        actualizarContadorCarrito();
        return;
    }

    resumen.style.display = "flex";
    let totalGeneral = 0;

    carrito.forEach((item) => {
        const subtotal = item.precio * item.cantidad;
        totalGeneral += subtotal;

        const fila = document.createElement("article");
        fila.className = "carrito-item";

        fila.innerHTML = `
            <img src="../${item.imagen}" alt="${item.titulo} - ${item.artista}">
            <div class="carrito-item-info">
                <h3>${item.titulo}</h3>
                <p class="artista">${item.artista} · ${item.formato}</p>
                <p class="precio-unitario">Precio unitario: ${formatearPrecio(item.precio)}</p>
            </div>
            <div class="carrito-controles">
                <button class="btn-cantidad btn-restar" aria-label="Disminuir cantidad de ${item.titulo}">-</button>
                <span class="cantidad-valor">${item.cantidad}</span>
                <button class="btn-cantidad btn-sumar" aria-label="Aumentar cantidad de ${item.titulo}">+</button>
            </div>
            <div class="carrito-subtotal">
                <p>Subtotal</p>
                <strong>${formatearPrecio(subtotal)}</strong>
            </div>
            <button class="btn-eliminar" aria-label="Eliminar ${item.titulo} del carrito">🗑️</button>
        `;

        fila.querySelector(".btn-restar").addEventListener("click", () => cambiarCantidad(item.id, -1));
        fila.querySelector(".btn-sumar").addEventListener("click", () => cambiarCantidad(item.id, 1));
        fila.querySelector(".btn-eliminar").addEventListener("click", () => eliminarProducto(item.id));

        contenedor.appendChild(fila);
    });

    totalElemento.textContent = formatearPrecio(totalGeneral);
    actualizarContadorCarrito();
}

export function cambiarCantidad(id, delta) {
    const carrito = obtenerCarrito();
    const index = carrito.findIndex((item) => item.id === id);

    if (index === -1) return;

    carrito[index].cantidad += delta;

    if (carrito[index].cantidad <= 0) {
        const nombre = carrito[index].titulo;
        carrito.splice(index, 1);
        mostrarNotificacion(`"${nombre}" eliminado del carrito`, "info");
    }

    guardarCarrito(carrito);
    renderizarCarrito();
}

export function eliminarProducto(id) {
    let carrito = obtenerCarrito();
    const producto = carrito.find((item) => item.id === id);
    carrito = carrito.filter((item) => item.id !== id);

    guardarCarrito(carrito);
    renderizarCarrito();

    if (producto) {
        mostrarNotificacion(`"${producto.titulo}" eliminado del carrito`, "info");
    }
}

export function vaciarCarrito() {
    vaciarStorageCarrito();
    renderizarCarrito();
    mostrarNotificacion("Se vació el carrito", "info");
}

export function finalizarCompra() {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) return;

    vaciarStorageCarrito();
    renderizarCarrito();

    const contenedor = document.getElementById("carrito-container");
    if (contenedor) {
        contenedor.innerHTML = `
            <div class="compra-exitosa">
                <h3>¡Gracias por tu compra en Franco Record Store! 🎉</h3>
                <p>Tu pedido ha sido confirmado y pronto recibirás los detalles del envío por correo.</p>
                <a href="../index.html" class="btn-comprar">Volver a la Tienda</a>
            </div>
        `;
    }
}