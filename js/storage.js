const CLAVE_CARRITO = "franco_record_store_carrito";

export function obtenerCarrito() {
    const carritoGuardado = localStorage.getItem(CLAVE_CARRITO);
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

export function guardarCarrito(carrito) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

export function vaciarStorageCarrito() {
    localStorage.removeItem(CLAVE_CARRITO);
}