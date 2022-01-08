var articulos = [];
$.ajax({
  url: "./js/data/datos.json",
  dataType: "json",
  success: (response) => {
    response.productos.forEach((producto) => {
      $("#productos").append(
        `<div class="item ">
              <div class="card h-100">
                 <img src="${producto.imagen}" id="clickme" class="item__img card-img-top" alt="${producto.id}"></img>
        <a class ="cardHover">
        <div class= "item__descr card-body">
            <h5 class="item__title card-title">${producto.nombre}</h5>
            <p>contiene ${producto.contenido} unid.</p>
            <p class="item__price card-text">$${producto.precio}</p>
            <button id="btn_buy" class= "button btn  btn-lg "  >Agregar </button>
        </div>
        </a>
        </div>
            </div>`
      );
      inicializarBotones();
    });
  },
});

function Datos(nombre, apellido, email, telefono, direccion, ciudad) {
  this.nombre = nombre;
  this.apellido = apellido;
  this.email = email;
  this.telefono = telefono;
  this.direccion = direccion;
  this.ciudad = ciudad;
}

function cargarDatos() {
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let email = document.getElementById("inputEmail4").value;
  let telefono = document.getElementById("inputTel").value;
  let direccion = document.getElementById("inputAddress").value;
  let ciudad = document.getElementById("inputCity").value;
  let datos = new Datos(nombre, apellido, email, telefono, direccion, ciudad);
  formDatos(datos);
}

const formDatos = (datos) => {
  $("#formulario").remove();
  $(".compraFinal").remove()

  $("#formSection").append(
    `<div class="formModal">

            <div class="msjheader">
                <h5 class="msj-title" >Gracias por tu compra!</h5>
            </div>
            <div class="msj-body">
                <p> Tus datos: ${datos.nombre} ${datos.apellido}</p>
                <p>Direccion para envío: ${datos.direccion}, ${datos.ciudad}</p>
                <p>Te contactaremos al teléfono ${datos.telefono} para coordinar el envío </p>
                

            </div>
            <div class="msj-footer">
        <a  href="index.html"><button type="button" id="button2" class="btn btn-secondary"  >Aceptar</button></a>
            </div>
        </div>`
  );
};





const tbody = document.querySelector(".tbody");
let carrito = [];

const inicializarBotones = () => {
  const clickBtn = document.querySelectorAll(".button");
  clickBtn.forEach((btn) => {
    btn.addEventListener("click", agregarCarrito);
  });
};

function agregarCarrito(e) {
  const button = e.target;
  const item = button.closest(".item");
  const itemTitle = item.querySelector(".item__title").textContent;
  const itemPrice = item.querySelector(".item__price").textContent;
  const itemImg = item.querySelector(".item__img").src;
  const miCarrito = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1,
  };

  agregarItemCarrito(miCarrito);
}

const agregarItemCarrito = (miCarrito) => {
  const alert = document.querySelector(".alert");

  setTimeout(function () {
    alert.classList.add("hide");
  }, 2000);
  alert.classList.remove("hide");
  

  const inputItem = $(".select");

  let existeProducto = false;
  carrito.forEach((item) => {
    if (item.title.trim() === miCarrito.title.trim()) {
      item.cantidad++;
      existeProducto = true;
      const inputValue = inputItem;
      inputValue.value++;

      carritoTotal();

      return null;
    }
  });

  if (!existeProducto) {
    carrito.push(miCarrito);
  }

  renderCarrito();
};

function renderCarrito() {
  tbody.innerHTML = "";
  carrito.map((item) => {
    const tr = document.createElement("tr");
    tr.classList.add("itemCarrito");
    const content = `
      <th scope="row" class="carrito_th"></th>
                <td class="py-4">
                    <img class="carrito_img" src=${item.img} alt="">
                    <h6 class="carrito_title">${item.title}</h6>
                </td>

                <td>
                  <p class="carrito_precio px-3"> ${item.precio}</p>
                </td>
                <td>
                  <input class="select" type="number" min="1" value=${item.cantidad} > 
                  <button class=" delete btn btn-danger">x</button>
                </td>   
      
      `;

    tr.innerHTML = content;
    tbody.append(tr);

    tr.querySelector(".delete").addEventListener("click", removeItem);

    tr.querySelector(".select").addEventListener("change", sumaCantidad);
  });

  carritoTotal();
}

const carritoTotal = () => {
  let total = 0;
  

  const itemTotal = document.querySelector(".total");

  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ""));
    total = total + precio * item.cantidad;
  });

  itemTotal.innerHTML = `<div >
  <span>Total</span> <strong class="totalCompra"> $${total} </strong> 
  </div>`;

  addLocalStorage();
};

const removeItem = (e) => {
  const buttonDelete = e.target;
  const tr = buttonDelete.closest(".itemCarrito");
  const title = tr.querySelector(".carrito_title").textContent;

  for (items of carrito) {
    if (items.title === title) {
      carrito.splice(items, 1);
    }
  }
  tr.remove();

  
  carritoTotal();
};

const sumaCantidad = (e) => {
  const sumaInput = e.target;
  const tr = sumaInput.closest(".itemCarrito");
  const title = tr.querySelector(".carrito_title").textContent;

  carrito.forEach((item) => {
    if (item.title.trim() === title) {
      sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      carritoTotal();
    }
  });
};

const addLocalStorage = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

window.onload = function () {
  const storage = JSON.parse(localStorage.getItem("carrito"));
  if (storage) {
    carrito = storage;
    renderCarrito();
  }
};




const vaciarCarrito = () => {
  while(tbody.firstChild) {
    tbody.removeChild(tbody.firstElementChild);


  }

  vaciarLocalStorage();
    return false;

    
};


function vaciarLocalStorage() {
  localStorage.clear();
  
  
}




$(document).ready(function (){

  $(".submenu #cartIcon").click(function() {

    $("#cart").fadeToggle(600);
  });




});  



$(document).ready(function (){

  $(".quieroBtn").animate({left: '28rem'}, 3000);

  $(".titulo").animate({left: '15rem',
fontSize:"3rem"}, 1500);


})

