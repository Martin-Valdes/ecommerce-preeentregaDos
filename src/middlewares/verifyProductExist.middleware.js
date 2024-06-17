import { request, response } from "express";
import productsDao from "../dao/mongoDB/product.dao.js";


export const verifyProductExist = async (req = request, res = response, next) => {
    
    const {pid} = req.params;
    const product = await productsDao.getById(pid);
    if(!product) return res.status(404).json({status: "Error", msg: `No se encontro el producto con el ID ${pid}`});
    next();
} 