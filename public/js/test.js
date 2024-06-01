const socket = io();
const productList = document.getElementById("products");
const addproduct = document.getElementById("addProduct");
const deleteProduct = document.getElementById("deleteProduct");


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

