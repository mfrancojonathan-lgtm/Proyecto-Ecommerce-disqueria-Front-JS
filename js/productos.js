import { obtenerCarrito, guardarCarrito } from "./storage.js";
import { actualizarContadorCarrito, mostrarNotificacion, formatearPrecio } from "./ui.js";

export async function cargarProductos() {
    const contenedor = document.getElementById("productos-container");
    if (!contenedor) return;

    try {
        const respuesta = await fetch("./data/productos.json");
        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el catálogo de productos.");
        }

        const productos = await respuesta.json();
        renderizarProductos(productos, contenedor);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        contenedor.innerHTML = `<p class="mensaje-error">Hubo un problema al cargar los discos. Por favor, intentá nuevamente más tarde.</p>`;
    }
}

function renderizarProductos(productos, contenedor) {
    contenedor.innerHTML = "";

    productos.forEach((producto) => {
        const card = document.createElement("article");
        card.className = "disco-card";

        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo} - ${producto.artista}">
            <h3>${producto.titulo}</h3>
            <p class="artista">${producto.artista}</p>
            <p class="formato">${producto.formato}</p>
            <p class="precio">${formatearPrecio(producto.precio)}</p>
            <button class="btn-comprar" data-id="${producto.id}" aria-label="Agregar ${producto.titulo} al carrito">
                Agregar al carrito
            </button>
        `;

        const botonAgregar = card.querySelector(".btn-comprar");
        botonAgregar.addEventListener("click", () => agregarAlCarrito(producto));

        contenedor.appendChild(card);
    });
}

function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();
    const existente = carrito.find((item) => item.id === producto.id);

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    actualizarContadorCarrito();
    mostrarNotificacion(`"${producto.titulo}" agregado al carrito 🎧`);
}