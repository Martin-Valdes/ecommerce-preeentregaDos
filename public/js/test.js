const socket = io();
const productList = document.getElementById("products");
const addproduct = document.getElementById("addProduct");
const deleteProduct = document.getElementById("deleteProduct");

////EVENTO DEL FORMULARIO PARA AGREGAR UN PRODUCTO
//// SE GENERA EL BODY CON LA DATA PARA QUE EL BACK 
////ATIENDA LA PETICION Y SE CREE EL NUEVO PRODUCTO
addproduct.addEventListener("submit", async (e) => {
  
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const code = document.getElementById("code").value;
  const category = document.getElementById("category").value;
  const stock = document.getElementById("stock").value;
  const price = document.getElementById("price").value;

  await fetch("realtimeproducts", {

    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({title, price, description, code, stock, category})
  })

  addproduct.reset();
})
////ELIMINAR UN PRODUCTO, DEL LADO DEL CLIENTE AL DAR SUBMIT
/// SE GENERA EL EVENTO Y ENVIAMOS AL BACK LOS DATOS DEL BODY 
/// PARA QUE SEPA CUAL ELIMINAR
deleteProduct.addEventListener("submit", async (e) =>{
  e.preventDefault();

  const id = document.getElementById("id").value;
  
  await fetch("realtimeproducts", {

    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id})
  })
  deleteProduct.reset();

})
///DEL LADO DEL FRONT ESTAMOS INSERTANDO EL O LOS DIV CON LA DATA DEL PRODUCTO 
socket.on("products", (data) => {
    productList.innerHTML = "";
     data.forEach((product) => {
      const card = document.createElement("div");
      card.innerHTML = `
        <div class= "containerCard">
          <h5>${product.title}</h5>
          <p class="itemsList">Descripcion: ${product.description}</p>
          <p class="itemsList">Codigo: ${product.code}</p>
          <p class="itemsList">Precio: ${product.price}</p>
          <p class="itemsList">Stock: ${product.stock}</p>
          <p class="itemsList">Categoria: ${product.category}</p>
          <p class="itemsList">ID: ${product.id}</p>
        </div>
      `;
      productList.appendChild(card);
    });
  })

