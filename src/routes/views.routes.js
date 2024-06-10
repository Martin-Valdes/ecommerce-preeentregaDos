import { Router } from "express";
import productManager from "../dao/fileSystem/productsManager.js"
import {socketServer} from "../app.js"


const router = Router();
///RENDERIZADO DE LOS PRODUCTOS CON HANDLEBARS 
router.get("/", async(req, res) => {
  
  try {
    const products = await productManager.getProducts();
    console.log(products)
    res.render("home",{products, styles: "index.css"  });

  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Error interno del servidor"});
  }
});
///RENDERIZADO MEDIANTE HANDLEBARS Y WEBSOCKETS DE PRODUCTOS Y FORM
router.get("/realtimeproducts", async (req, res) => {

  try {
    const products = await productManager.getProducts();
    socketServer.emit("products", products)
    res.render("realTimeProducts", {styles: "index.css" });
  } catch (error) {
    console.log(error)
    res.status(500).json({error: "Error interno del servidor"});
  }
});
///METODO POST PARA AGREGADO DE PRODUCTOS A DATA JS
router.post("/realtimeproducts", async(req, res) =>{
    
  try {
    const {title, description, price, stock, category, code} = req.body;
    
    await productManager.addProduct({title, description, price, stock, category, code});
    const products = await productManager.getProducts();
    socketServer.emit("products", products);

    res.render("realTimeProducts");

  } catch (error) {
    console.log(error)
    res.status(500).json({error: "Error interno del servidor"});
  }
})
////ELIMINAR UN PRODUCTO MEDIANTE EL ID GENERADO
router.delete("/realtimeproducts", async(req, res) =>{

  try {
    const {id} = req.body;
    await productManager.deleteProduct(id);
    const products = await productManager.getProducts();
    socketServer.emit("products", products);

    res.render("realTimeProducts");

  } catch (error) {
    console.log(error)
    res.status(500).json({error: "Error interno del servidor"});
  }
})



export default router;
