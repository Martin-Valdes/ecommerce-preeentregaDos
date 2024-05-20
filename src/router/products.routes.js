import { Router } from "express";
import productsManager from "../productsManager.js";
import { verifyDataProduct } from "../middlewares/verifyDataProduct.middleware.js";

const router = Router();

router.get("/",async (req, res) => {
   try {
    const { limit } = req.query;
    const products = await productsManager.getProducts(limit);
    res.status(200).json({status: "success", products});
   }catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
});

//FUNCION PARA RETORNAR EL PRODUCTO POR ID MEDIANTE REQ.PARAMS
router.get("/:id", async (req, res) => {
   try {
    const {id} = req.params;
    
    const productId = await productsManager.getProductById(id);
    
    if (!productId) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

    res.status(200).json({status: "success", productId});

   } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }

});

//fUNCION PARA ALMACENAR UN NUEVO PRODUCTO
router.post ("/", verifyDataProduct, async (req, res) =>{
    try {
        const product = req.body;
        const productNew = await productsManager.addProduct(product);
        
        res.status(201).json({status: "status", productNew});
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
      }
    
})
// endPoint para modificar un producto
router.put("/:id", async (req, res) =>{
   
    try {
        const dataProduct = req.body;
        const {id} = req.params;
        const productId = await productsManager.putProduct(id, dataProduct)
        console.log(productId)
        if (!productId) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });
      
        res.status(200).json({ status: "success", productId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
      }
    

});

router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const productToDelete = await productsManager.deleteProduct(id);
        if(!productToDelete) return res.status(404).json({status: "Error", msg: `El producto con ID ${id}, no se encontró`})
    
        res.status(200).json({ status: "success", productToDelete });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
      }
    
})

export default router;