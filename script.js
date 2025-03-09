const menu = [
    { nombre: "Hamburguesa", precio: 5.00 },
    { nombre: "Pizza", precio: 8.00 },
    { nombre: "Refresco", precio: 2.00 }
];

const carrito = [];

const menuDiv = document.getElementById("menu");
const listaCarrito = document.getElementById("lista-carrito");
const totalSpan = document.getElementById("total");
const confirmarBtn = document.getElementById("confirmar");
const formularioCliente = document.getElementById("formulario-cliente");
const enviarWhatsappBtn = document.getElementById("enviar-whatsapp");

// Generar menú
menu.forEach((producto, index) => {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("producto");
    productoDiv.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>${producto.precio} €</p>
        <button onclick="agregarAlCarrito(${index})">Agregar</button>
    `;
    menuDiv.appendChild(productoDiv);
});

// Función para agregar productos al carrito
function agregarAlCarrito(index) {
    carrito.push(menu[index]);
    actualizarCarrito();
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;
    carrito.forEach(producto => {
        const item = document.createElement("li");
        item.textContent = `${producto.nombre} - ${producto.precio} €`;
        listaCarrito.appendChild(item);
        total += producto.precio;
    });
    totalSpan.textContent = total.toFixed(2);
}

// Evento para confirmar el pedido
confirmarBtn.addEventListener("click", () => {
    if (carrito.length > 0) {
        formularioCliente.style.display = "block";
    } else {
        alert("El carrito está vacío.");
    }
});

// Evento para enviar el pedido por WhatsApp
enviarWhatsappBtn.addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value;
    const direccion = document.getElementById("direccion").value;
    let mensaje = `Pedido de ${nombre} (${direccion}):\n`;
    carrito.forEach(producto => {
        mensaje += `- ${producto.nombre} - ${producto.precio} €\n`;
    });
    mensaje += `Total: ${totalSpan.textContent} €`;
    const numeroTelefono = "+58424406770"; // Reemplaza con tu número
    const url = `https://wa.me/${+584244067710}?text=${encodeURIComponent(mensaje)}`;
    window.open(url);
});
