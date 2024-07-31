import { Router } from "express";
import cartDao from "../dao/mongoDB/cart.dao.js";
import { verifyProductExist } from "../middlewares/verifyProductExist.middleware.js";
import { verifyCartExist } from "../middlewares/verifyCartExist.middleware.js";
import { isUserCart } from "../middlewares/isUserCart.middleware.js";


const router = Router();
const middlewares = [verifyCartExist, verifyProductExist, isUserCart];

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
router.get("/:cId",verifyCartExist,  async (req, res) => {

    try {
        const {cId} = req.params;
        const cart = await cartDao.getById(cId);

        res.status(200).json({ status: "success", cart });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
});

////FUNCION PARA AGREGAR UN PRODUCTO AL CARRITO
router.post("/:cId/product/:pid", middlewares,  async (req, res) => {

        try {
            const {cId, pid} = req.params;
            
            const cart = await cartDao.addProductToCart(cId, pid);

            res.status(200).json({ status: "success", cart });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
        }
});


///AQUI ELIMINAMOS UN PRODUCTO DEL CARRITO
router.delete("/:cId/product/:pid", middlewares, async (req, res) => {

    try {
        const {cId, pid} = req.params;
        const cart = await cartDao.deletePorductToCart(cId, pid);

        res.status(200).json({ status: "success", cart });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
});


///EN ESTE ENDPOINT REALIZAMOS LA ACTUALIZACION DEL QUNATITY 

router.put("/:cId/product/:pid", middlewares, async (req, res) => {

    try {
        const {cId, pid} = req.params;
        const {quantity} = req.body;
        const cartModify = await cartDao.updateModifyQuantity(cId, pid, quantity);

        res.status(200).json({ status: "success", cartModify });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
});

//EN ESTE ENDPOINT OBTENEMOS EL ID DEL CARRITO Y LLAMAMOS A
//CART.DAO PARA  VACIAR EL CARRITO A TRAVEZ DE UN ARRAY VACIO. 
//EN CASO DE NO COINCIDIR EL ID DEL CART CON NINGUNO DE LA BASE DE DATOS SE MUESTRA EL ERROR
router.delete("/:cId", verifyCartExist, async (req, res) => {

    try {
        const {cId} = req.params;
        const cart = await cartDao.deleteProductsTocarts(cId);

        res.status(200).json({ status: "success", cart });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
});





export default router;