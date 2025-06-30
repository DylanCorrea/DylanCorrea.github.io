const productos = [
{id:1,nombre:'remera',precio: 3000,categoria: "ropa", imagen:'remera.jpg'},
{id:2,nombre: 'gorra',precio: 1500,categoria: "accesorios",imagen:'gorra.jpg'},
{id:3,nombre:'mochila',precio: 8000,categoria: "accesorios",imagen:'mochila.jpg'},
{id:4,nombre: 'buzo',precio: 6000,categoria: "ropa",imagen:'buzo.jpg'},
{id:5,nombre: 'zapatillas',precio: 3500,categoria: "calzado",imagen:'zapatillas.jpg'},
{id:6,nombre: 'campera',precio: 20000,categoria: "ropa",imagen:'campera.jpg'}
];

const container= document.getElementById ('articulo');
productos.forEach(productos=>{
    const div = document.createElement("div");

    div.className = 'card p-4 col-md-4 my-2';

    div.innerHTML = 
    `<div class="card h-100 ">
    <img src="${productos.imagen}"style="width:50%; margin: 0 auto;">
    <div class = "card-body d-flex flex-column text-center"> 
        <h5 class="card-title">${productos.nombre}</h5>
        <p class = "card-title">$${productos.precio}</p>
        <button class="btn btn-primary mt-auto" onclick="agregarAlCarrito(${productos.id})">
        <i class="bi bi-gift-fill"></i>
            Agregar al carrito
        </button>
    
    
        </div>
    </div>`;
    container.appendChild(div);
});

let contadorCarrito = 0;

let carrito = []

function agregarAlCarrito(idProducto){
    const producto = productos.find(p => p.id === idProducto);
    if(producto){
        contadorCarrito ++;
        document.getElementById('contador').textContent = contadorCarrito;
        const productoEnCarrito = carrito.find(p => p.id === idProducto);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else{
            carrito.push({...producto, cantidad: 1});
        }
        //alert(`¡${producto.nombre} agregado al carrito!`)
    } 
    
}

document.getElementById('verCarrito').addEventListener('click', function()
    {
        const carritoDiv = document.getElementById('carrito');
        carritoDiv.classList.toggle('d-none');
        actualizarCarrito();
    })
  
// Obtenemos el elemento de la lista del carrito
const listaCarrito = document.getElementById("lista-carrito");
// Obtenemos el elemento del total
const totalSpan = document.getElementById("total");
// Obtenemos el elemento del contador
const contador = document.getElementById("contador");
// Evento para mostrar el carrito al hacer clic en el botón
function actualizarCarrito() 
    {  
        listaCarrito.innerHTML = "";
        let total = 0;
        carrito.forEach(productos =>  
            {
            // Creamos un nuevo elemento de lista
            const item = document.createElement("li"); 
            // Asignamos una clase para el estilo 
            item.className = "list-group-item d-flex justify-content-between lead";
            // Agregamos el nombre del producto y la cantidad 
            item.textContent = `${productos.nombre} x ${productos.cantidad}`; 
            const precio = document.createElement("span");
            // Calculamos el precio total por producto
            precio.textContent = `$${productos.precio * productos.cantidad}`; 
            item.appendChild(precio);
            listaCarrito.appendChild(item);
            // Sumamos el precio total de los productos al total general
            total += productos.precio * productos.cantidad; 
            }
            );  
        totalSpan.textContent = total;
        // Actualizamos el contador de productos en el carrito
        contador.textContent = carrito.reduce((sum, productos) => sum + productos.cantidad, 0); 
    }


function finalizarCompra()
    {
        if (carrito.length === 0)
        {
            alert("El carrito está vacio");
            return;
        }
        const total = carrito.reduce((sum,productos) => sum +(productos.precio * productos.cantidad), 0);
        let mensaje = "¡Hola! Quiero realizar la siguiente compra: %0A%0A";
        carrito.forEach(productos =>
        {
            mensaje += `- ${productos.nombre} x ${productos.cantidad}: $${productos.precio * productos.cantidad}%0A`;
        });
        mensaje += `%0ATotal: $${total}%0A%0A Y proceder con el pago y coordinar envio`;
        const telefono = "5491149899407";
        const urlWhatsApp = `https://wa.me/${telefono}?text=${mensaje}`;
        window.open(urlWhatsApp, '_blank');
        carrito = [];
        actualizarCarrito();
        document.getElementById('carrito').classList.add('d-none');
    }


// Get the button
let myButton = document.getElementById("back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.body.classList.add("show-scroll-button");
  } else {
    document.body.classList.remove("show-scroll-button");
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}    