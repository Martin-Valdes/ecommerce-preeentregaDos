import { Router } from "express";
import cartDao from "../dao/mongoDB/cart.dao.js";
import productDao from "../dao/mongoDB/product.dao.js";


const router = Router();

/////FUNCION PARA AGREGAR UN CARRITO
router.post("/", async (req, res) => {
    try {
        const newCart = await cartDao.create();

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
        const cart = await cartDao.getById(cId);

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
            
            //vlidamos el id del prod
            const product = await productDao.getById(id);
            if(!product) return res.status(404).json({status:"Error", msg: "El producto no existe"});
            
            //validamos el id del carrito
            const cartExist = await cartDao.getById(cId);
            if(!cartExist) return res.status(404).json({status:"Error", msg: "El id del carrito no existe"});

            //si todo esta ok agregamos el prod al carrito
            const cart = await cartDao.addProductToCart(cId, id);

            res.status(200).json({ status: "success", cart });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
        }
});

router.delete("/:cid", async (req, res) => {
    try {
        const {cid} = req.params;
        const cart = await cartDao.deleteOne(cid);
        if(!cart) return res.status(404).json({status:"Error", msg: "El id del carrito no existe"});

        res.status(200).json({status: "sucess", msj: "Carrito eliminado con exito"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
})



export default router;