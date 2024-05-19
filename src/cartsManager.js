import { randomUUID } from 'crypto';
import fs from "fs";

let carts = [];

///ESTE PATH ES EL QUE SE UTILIZA PARA FS
const pathFile = "./src/data/carts.json";


//// TRAEMOS LOS CARRITOS GUARDADOS Y LOS DEJAMOS PASEADOS EN CARTS
const getCarts = async() => {

    const listCarts = await fs.promises.readFile(pathFile, "utf-8");
    const listPars = JSON.parse(listCarts);
    
    carts = listPars || [];
}


// AGREGAMOS UN NUEVO CARRITO LO PUSHEAMOS Y LUEGO DE PASARLOS A JSON LOS GUARDAMOS PARA PERSISTENCIA DE DATOS.
const addCart = async () =>{
    await getCarts();
    const newCart = {
        id: randomUUID(),
        products: [],
    };
    carts.push(newCart);
    await fs.promises.writeFile(pathFile, JSON.stringify(carts));
    return newCart;

}

// FUNCION PARA MOSTRAR UN CARRITO POR ID
const getCartById = async (cid) => {
    await getCarts();
    const cartId = carts.find((cart) => cart.id ===cid);
    return cartId;
} 

///FUNCION QUE REALIZA EL AGREGADO DE UN PRODUCTO AL CARRO
const addProductToCart = async (id, pId) => {
    console.log("first")
    await getCarts();
    
    const product = {
        product: pId,
        quantity: 1,
    };

    const index = carts.findIndex((cart) => cart.id === id);
    carts[index].products.push(product);

    await fs.promises.writeFile(pathFile, JSON.stringify(carts));
    return carts[index];

}

export default {
    getCarts,
    getCartById,
    addProductToCart,
    addCart,
  };
