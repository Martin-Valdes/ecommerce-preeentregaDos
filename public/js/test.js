const socket = io();
const productList = document.getElementById("products");
const addproduct = document.getElementById("addProduct");
const deleteProduct = document.getElementById("deleteProduct");



addproduct.addEventListener("submit", async (e) => {

  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;

  
  await fetch("realtimeproducts", {

    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({title, price, description})
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
      card.classList.add("card");
      card.style.width = "18rem";
      card.innerHTML = `
      <div>
        <h5>hola${product.title}</h5>
        <p>${product.description}</p>
        <p>${product.price}</p>
      </div>
      `;
      productList.appendChild(card);
    });
  })

