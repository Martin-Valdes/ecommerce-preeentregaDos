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
router.post("/:cId/product/:pid", async (req, res) => {

        try {
            const {cId, pid} = req.params;
            //vlidamos el id del prod
            const product = await productDao.getById(pid);
            if(!product) return res.status(404).json({status:"Error", msg: "El producto no existe"});
            
            //validamos el id del carrito
            const cartExist = await cartDao.getById(cId);
            if(!cartExist) return res.status(404).json({status:"Error", msg: "El id del carrito no existe"});

            //si todo esta ok agregamos el prod al carrito
            
            const cart = await cartDao.addProductToCart(cId, pid);

            res.status(200).json({ status: "success", cart });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
        }
});


///AQUI ELIMINAMOS UN PRODUCTO DEL CARRITO
router.delete("/:cId/product/:pid", async (req, res) => {

    try {
        const {cId, pid} = req.params;
        //vlidamos el id del prod
        const product = await productDao.getById(pid);
        if(!product) return res.status(404).json({status:"Error", msg: "El producto no existe"});
        
        //validamos el id del carrito
        const cartExist = await cartDao.getById(cId);
        if(!cartExist) return res.status(404).json({status:"Error", msg: "El id del carrito no existe"});

        //si todo esta ok agregamos el prod al carrito
        const cart = await cartDao.deletePorductToCart(cId, pid);

        res.status(200).json({ status: "success", cart });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
});


///EN ESTE ENDPOINT REALIZAMOS LA ACTUALIZACION DEL QUNATITY 

router.put("/:cId/product/:pid", async (req, res) => {

    try {
        const {cId, pid} = req.params;
        const {quantity} = req.body;
        //vlidamos el id del prod
        const product = await productDao.getById(pid);
        if(!product) return res.status(404).json({status:"Error", msg: "El producto no existe"});
        
        //validamos el id del carrito
        const cartExist = await cartDao.getById(cId);
        if(!cartExist) return res.status(404).json({status:"Error", msg: "El id del carrito no existe"});
        
        const cartModify = await cartDao.updateModifyQuantity(cId, pid, quantity);

        if(!product) return res.status(404).json({status:"Error", msg: "El producto no existe en el carrito"});

        res.status(200).json({ status: "success", cartModify });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
});

//EN ESTE ENDPOINT OBTENEMOS EL ID DEL CARRITO Y LLAMAMOS A
//CART.DAO PARA  VACIAR EL CARRITO A TRAVEZ DE UN ARRAY VACIO. 
//EN CASO DE NO COINCIDIR EL ID DEL CART CON NINGUNO DE LA BASE DE DATOS SE MUESTRA EL ERROR
router.delete("/:cId", async (req, res) => {

    try {
        const {cId} = req.params;
        const cart = await cartDao.deleteProductsTocarts(cId);

        if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });
        res.status(200).json({ status: "success", cart });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
});





export default router;