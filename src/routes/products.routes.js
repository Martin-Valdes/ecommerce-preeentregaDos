import { Router } from "express";
import productDao from "../dao/mongoDB/product.dao.js";
import { verifyDataProduct } from "../middlewares/verifyDataProduct.middleware.js";
import { verifyProductExist } from "../middlewares/verifyProductExist.middleware.js";
import { checkToken } from "../middlewares/checToken.middleware.js";

const router = Router();

/// OBTENEMOS LOS PRODUCTOS SEGUN LOS FILTROS DEFINIDOS POR PARAMS DESDE QUERY
router.get("/", checkToken, async (req, res) =>{
    
    try {
        ///OBTENEMOS DATOS PARA PAGINACION
        const {limit, page, sort, category, status } = req.query;

        const options = {
            limit: limit || 10,
            page: page || 1,
            sort: {
                price: sort === "asc" ? 1 : -1,
            },
            learn: true
        }
        if(category){
            const products = await productDao.getAll({category}, options);
            return res.status(200).json({status: "sucess", products});
        }
        if(status){
            const products = await productDao.getAll({status}, options);
            return res.status(200).json({status: "sucess", products});
        }

        const products = await productDao.getAll({}, options) ;

        res.status(200).json({status: "sucess", payload: products});

    } catch(error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal server error" });
    }
})
///AGREGAMOS NUEVO PRODUCTO PERO ANTES SE VERIFICA LA DATA CON MIDDLEWARE.
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

////ELIMINAMOS UN PRODUCTO MEDIANTE ID
router.delete("/:pid",verifyProductExist, async (req, res) => {
    
    try {
       const {pid} = req.params;
       await productDao.deleteOne(pid);

       res.status(200).json({status: "sucess", msg: `El producto con el ID numero ${pid} fue eliminado`});

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal server error" });
    }
});

////MODIFICAMOS LA DATA DE UN PRODUCTO
router.put("/:pid", verifyProductExist, async (req, res) => {
    try {
        const {pid} = req.params;
        const data = req.body;
        const product = await productDao.update(pid, data);
        
        res.status(200).json({status: "sucess", payload: product});

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal server error" });
    }
});

/////BUSCAMOS UN PRODUCTO MEDIANTE ID
router.get("/:pid", verifyProductExist, async(req,res) => {
    try {
        const {pid} = req.params;
        const product = await productDao.getById(pid);
    
        res.status(200).json({status: "sucess", payload: product});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal server error" });
    }
})


export default router;