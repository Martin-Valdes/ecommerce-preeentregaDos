import { Router } from "express";
import productManager from "../productsManager.js"
import {socketServer} from "../app.js"


const router = Router();

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

router.post("/realtimeproducts", async(req, res) =>{

  try {
    const {title, description, price} = req.body;
    await productManager.addProduct({title, description, price});
    const products = await productManager.getProducts();
    socketServer.emit("products", products);

    res.render("realTimeProducts");

  } catch (error) {
    console.log(error)
    res.status(500).json({error: "Error interno del servidor"});
  }


})

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
