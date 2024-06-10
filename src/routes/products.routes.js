import { Router } from "express";
import productDao from "../dao/mongoDB/product.dao.js";
import { verifyDataProduct } from "../middlewares/verifyDataProduct.middleware.js";

const router = Router();

router.get("/", async (req, res) =>{
    
    try {
        const products = await productDao.getAll();

        res.status(200).json({status: "sucess", payload: products});

    } catch(error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal server error" });
    }
})

router.post("/",verifyDataProduct, async (req, res) => {
    try {
        const newProduct = req.body;
        const product = await productDao.create(newProduct);

        res.status(200).json({status: "sucess", payload: product})
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal server error" });
    }
});

router.delete("/:pid", async (req, res) => {
    
    try {
       const {pid} = req.params;
       const product = await productDao.deleteOne(pid);
       if(!product) return res.status(404).json({status: "Error", msg: "No se encontro el producto"});

       res.status(200).json({status: "sucess", msg: `El producto con el ID numero ${pid} fue eliminado`});

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal server error" });
    }
});

router.put("/:pid", async (req, res) => {
    try {
        const {pid} = req.params;
        const data = req.body;
        const product = await productDao.update(pid, data);
        if(!product) return res.status(404).json({status: "Error", msg: "No se encontro el producto"});

        res.status(200).json({status: "sucess", payload: product});

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal server error" });
    }
});

router.get("/:pid", async(req,res) => {
    try {
        const {pid} = req.params;
        const product = await productDao.getById(pid);
        if(!product) return res.status(404).json({status: "error", msg: "Producto no encontrado"});

        res.status(200).json({status: "sucess", payload: product});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal server error" });
    }
})


export default router;