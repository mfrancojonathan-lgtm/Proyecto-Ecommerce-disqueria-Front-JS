import { actualizarContadorCarrito } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();

    const formulario = document.getElementById("contacto-form");
    const feedback = document.getElementById("form-feedback");

    if (!formulario || !feedback) return;

    formulario.addEventListener("submit", (evento) => {
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nombre.length < 3) {
            evento.preventDefault();
            mostrarFeedback("Por favor, ingresá tu nombre completo (mínimo 3 caracteres).", "error");
            return;
        }

        if (!emailRegex.test(email)) {
            evento.preventDefault();
            mostrarFeedback("Por favor, ingresá un correo electrónico válido.", "error");
            return;
        }

        if (mensaje.length < 10) {
            evento.preventDefault();
            mostrarFeedback("El mensaje debe tener al menos 10 caracteres.", "error");
            return;
        }

        mostrarFeedback("Validación correcta. Enviando consulta...", "exito");
    });

    function mostrarFeedback(texto, tipo) {
        feedback.textContent = texto;
        feedback.className = `form-feedback ${tipo}`;
    }
});