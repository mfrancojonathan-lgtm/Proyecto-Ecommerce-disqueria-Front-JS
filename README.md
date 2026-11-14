# Franco Record Store 🎧 - Disquería Online

Sitio web de e-commerce dinámico e interactivo desarrollado como **Entrega Final** del curso de Desarrollo Web / Front-End. Permite explorar un catálogo de vinilos y CDs cargados dinámicamente, gestionar un carrito de compras persistente y enviar consultas mediante un formulario validado.

---

## 🚀 Funcionalidades Principales

- **Catálogo Dinámico (`fetch` + JSON):** Consumo asíncrono de productos desde `data/productos.json` y renderizado en el DOM.
- **Carrito de Compras Interactivo:** Agregar discos, modificar cantidades (`+` / `-`), eliminar ítems, calcular el total en tiempo real y simular la finalización de compra.
- **Persistencia de Datos:** Uso de `localStorage` para conservar el carrito y el contador del header al recargar o cerrar el navegador.
- **Formulario Validado:** Validación de campos por JavaScript en `pages/contacto.html` e integración con **Formspree**.
- **Diseño Responsivo, SEO y Accesibilidad:** Estructura semántica HTML5, metaetiquetas SEO, atributos `alt` y `aria-label`, Grid, Flexbox y Media Queries.

---

## 🛠️ Tecnologías Utilizadas

- HTML5 Semántico
- CSS3 (Grid, Flexbox, Media Queries y Google Fonts)
- JavaScript ES6+ Modular (`import` / `export`, `fetch`, `localStorage`, manipulación del DOM)