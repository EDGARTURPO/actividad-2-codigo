const botonesAgregar = document.querySelectorAll(".btn-agregar");

const contador = document.querySelector(".contador");

let cantidad = 0;

botonesAgregar.forEach((boton) => {
  boton.addEventListener("click", () => {
    cantidad++;

    contador.textContent = cantidad;
  });
});


const checkLibros = document.getElementById("libros");
const checkPapeleria = document.getElementById("papeleria");
const checkEscritura = document.getElementById("escritura");

const productos = document.querySelectorAll(".producto-card");

function filtrarProductos(){

    productos.forEach(producto => {

        const categoria = producto.dataset.categoria;

        let mostrar = false;

        if(checkLibros.checked && categoria === "libros"){
            mostrar = true;
        }

        if(checkPapeleria.checked && categoria === "papeleria"){
            mostrar = true;
        }

        if(checkEscritura.checked && categoria === "escritura"){
            mostrar = true;
        }

        // Mostrar todos si no hay filtros
        if(
            !checkLibros.checked &&
            !checkPapeleria.checked &&
            !checkEscritura.checked
        ){
            mostrar = true;
        }

        producto.style.display = mostrar ? "block" : "none";

    });

}

checkLibros.addEventListener("change", filtrarProductos);

checkPapeleria.addEventListener("change", filtrarProductos);

checkEscritura.addEventListener("change", filtrarProductos);
