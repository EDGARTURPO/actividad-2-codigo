const botonesAgregar = document.querySelectorAll(".btn-agregar");

const contadorCarrito = document.getElementById("contador-carrito");

const carritoIcono = document.querySelector(".carrito");

const panelCarrito = document.getElementById("panel-carrito");

const cerrarCarrito = document.getElementById("cerrar-carrito");

const carritoProductos = document.getElementById("carrito-productos");

const totalCarrito = document.getElementById("total-carrito");

const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

const overlay = document.getElementById("overlay");

let carrito = [];

const carritoGuardado = localStorage.getItem("carrito");

if (carritoGuardado) {
  carrito = JSON.parse(carritoGuardado);

  actualizarCarrito();
}

botonesAgregar.forEach((boton) => {
  boton.addEventListener("click", () => {
    const producto = boton.closest(".producto-card");

    const nombre = producto.querySelector("h4").textContent;

    const precio = producto.querySelector(".precio").textContent;

    const productoInfo = {
      nombre,
      precio,
    };

    carrito.push(productoInfo);

    actualizarCarrito();
  });
});

// ABRIR CARRITO

carritoIcono.addEventListener("click", () => {
  panelCarrito.classList.add("activo");
  overlay.classList.add("activo");
});

// CERRAR CARRITO

cerrarCarrito.addEventListener("click", () => {
  panelCarrito.classList.remove("activo");
  overlay.classList.remove("activo");
});

vaciarCarritoBtn.addEventListener("click", () => {
  carrito = [];

  actualizarCarrito();
});

overlay.addEventListener("click", () => {

    panelCarrito.classList.remove("activo");

    overlay.classList.remove("activo");

});

function actualizarCarrito() {
  // ACTUALIZAR CONTADOR
  contadorCarrito.textContent = carrito.length;

  // LIMPIAR PANEL
  carritoProductos.innerHTML = "";

  // TOTAL
  let total = 0;

  carrito.forEach((producto, index) => {
    const item = document.createElement("div");

    item.classList.add("item-carrito");

    item.innerHTML = `
    <div class="item-info">
        <h4>${producto.nombre}</h4>
        <p>${producto.precio}</p>
    </div>

    <button class="eliminar-item">
        ✕
    </button>
`;

    carritoProductos.appendChild(item);
    const botonEliminar = item.querySelector(".eliminar-item");

    botonEliminar.addEventListener("click", () => {
      carrito.splice(index, 1);

      actualizarCarrito();
    });

    // SUMAR TOTAL
    total += parseFloat(producto.precio.replace("S/", ""));
  });

  // MOSTRAR TOTAL
  totalCarrito.textContent = `S/ ${total}`;

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

const checkLibros = document.getElementById("libros");
const checkPapeleria = document.getElementById("papeleria");
const checkEscritura = document.getElementById("escritura");

const productos = document.querySelectorAll(".producto-card");

function filtrarProductos() {
  productos.forEach((producto) => {
    const categoria = producto.dataset.categoria;

    let mostrar = false;

    if (checkLibros.checked && categoria === "libros") {
      mostrar = true;
    }

    if (checkPapeleria.checked && categoria === "papeleria") {
      mostrar = true;
    }

    if (checkEscritura.checked && categoria === "escritura") {
      mostrar = true;
    }

    // Mostrar todos si no hay filtros
    if (
      !checkLibros.checked &&
      !checkPapeleria.checked &&
      !checkEscritura.checked
    ) {
      mostrar = true;
    }

    producto.style.display = mostrar ? "block" : "none";
  });
}

checkLibros.addEventListener("change", filtrarProductos);

checkPapeleria.addEventListener("change", filtrarProductos);

checkEscritura.addEventListener("change", filtrarProductos);
