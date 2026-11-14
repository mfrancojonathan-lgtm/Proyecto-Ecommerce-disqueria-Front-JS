import { renderizarCarrito, vaciarCarrito, finalizarCompra } from "./funcionesCarrito.js";
import { actualizarContadorCarrito } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
    renderizarCarrito();

    const btnVaciar = document.getElementById("btn-vaciar");
    const btnFinalizar = document.getElementById("btn-finalizar");

    if (btnVaciar) {
        btnVaciar.addEventListener("click", vaciarCarrito);
    }

    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", finalizarCompra);
    }
});