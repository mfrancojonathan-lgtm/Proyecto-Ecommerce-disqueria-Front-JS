import { cargarProductos } from "./productos.js";
import { actualizarContadorCarrito } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
    cargarProductos();
});