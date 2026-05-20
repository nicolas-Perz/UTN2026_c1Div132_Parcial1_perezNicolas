//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() {
    let carrito = localStorage.getItem("carrito")
    if(carrito === null){
        return []
    }
    return JSON.parse(carrito)
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) {
    localStorage.setItem("carrito",JSON.stringify(carrito))
}

function sumarAlCarrito(e) {
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;
    let carrito = obtenerCarrito()

    let producto_actual_nombre = elementoClickeado.parentElement.querySelector('.nombre-producto').textContent
    let producto_actual_precio = elementoClickeado.parentElement.querySelector('.precio-producto').textContent
    let producto_existe = carrito.find((producto) => producto.nombre === producto_actual_nombre)

    if(producto_existe){
        producto_existe.cantidad += 1
    }else{
        producto_nuevo = {
            nombre:producto_actual_nombre,
            precio:producto_actual_precio,
            cantidad:1
        }
        carrito.push(producto_nuevo)
    }
    alert(`Un ${producto_actual_nombre} fue agregado al carrito`)
    guardarCarrito(carrito)
}

function restarDelCarrito(e) {
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;
    let carrito = obtenerCarrito()

    let producto_actual_nombre = elementoClickeado.parentElement.querySelector('.nombre-producto').textContent
    let producto_existe = carrito.find((producto) => producto.nombre === producto_actual_nombre)

    if(producto_existe){
        producto_existe.cantidad -= 1
        alert(`Un ${producto_actual_nombre} fue eliminado del carrito`)
    }else{
        alert(`No hay más ${producto_actual_nombre} en el carrito`)
    }
    let carrito_limpio = carrito.filter((producto) => producto.cantidad > 0)
    guardarCarrito(carrito_limpio)
}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" con la funcion manejadora del evento ---//
window.addEventListener("DOMContentLoaded", () => {
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");

    console.log(obtenerCarrito())
    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
});
