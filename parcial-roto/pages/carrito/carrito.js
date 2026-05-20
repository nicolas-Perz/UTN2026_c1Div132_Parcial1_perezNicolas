function obtenerCarrito() {
    let carrito = localStorage.getItem("carrito")
    if(carrito === null){
        return []
    }
    return JSON.parse(carrito)
}

function cargarProductosCarrito() {
    let tabla = document.getElementById("tabla-carrito");
    let carrito = obtenerCarrito()

    carrito.forEach((producto) => {
        let tabla_fila = '<tr>'
        tabla_fila += `<td>${producto.nombre}</td>`
        tabla_fila += `<td>${producto.cantidad}</td>`
        tabla_fila += `<td>${producto.precio}</td>`
        tabla_fila += '</tr>'
        tabla.innerHTML += tabla_fila
    });
}

function limpiarCarrito() {
    let carrito = obtenerCarrito()
    carrito.length = 0
    localStorage.setItem("carrito",JSON.stringify(carrito))
    alert('Carrito limpiado correctamente')
}

function actualizarValorFinal(){
    let carrito = obtenerCarrito()
    let valor_final = document.getElementById('valor-final')
    let suma_precios = 0
    
    carrito.forEach((producto) => {
        suma_precios += (parseInt(producto.precio.replace('$','')) * producto.cantidad)
    })

    valor_final.textContent = `El valor final a pagar es de: $${suma_precios}`
}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () =>{
    console.log(obtenerCarrito())
    cargarProductosCarrito();
    actualizarValorFinal()
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});