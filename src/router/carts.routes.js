import { Router } from "express";
import cartsManager from "../cartsManager.js";
import productsManager from "../productsManager.js";


const router = Router();

/////FUNCION PARA AGREGAR UN CARRITO
router.post("/", async (req, res) => {

    try {
        const newCart = await cartsManager.addCart();

        res.status(201).json({status: "success", newCart});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
});

//////FUNCION PARA VER CARRITO POR ID
router.get("/:cId", async (req, res) => {

    try {
        const {cId} = req.params;
        const cart = await cartsManager.getCartById(cId);

        if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });
        res.status(200).json({ status: "success", cart });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
});

////FUNCION PARA AGREGAR UN PRODUCTO AL CARRITO
router.post("/:cId/product/:id", async (req, res) => {

        try {
            const {cId, id} = req.params;
            
            const product = await productsManager.getProductById(id);
            if(!product) return res.status(404).json({status:"Error", msg: "El producto no existe"});
            

            const cart = await cartsManager.addProductToCart(cId, id);
            if(!cart) return res.status(404).json({status:"Error", msg: "El producto no existe"});

            res.status(200).json({ status: "success", cart });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Erro", msg: "Error ojo interno del servidor" });
        }


})



export default router;