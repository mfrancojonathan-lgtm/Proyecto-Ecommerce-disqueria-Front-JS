import { obtenerCarrito } from "./storage.js";

export function actualizarContadorCarrito() {
    const contador = document.getElementById("contador-carrito");
    if (!contador) return;

    const carrito = obtenerCarrito();
    const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contador.textContent = totalUnidades;
}

export function mostrarNotificacion(mensaje, tipo = "exito") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${tipo}`;
    toast.textContent = mensaje;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("toast-ocultar");
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

export function formatearPrecio(valor) {
    return `$${valor.toLocaleString("es-AR")}`;
}