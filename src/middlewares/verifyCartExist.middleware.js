import { request, response } from "express";
import productsDao from "../dao/mongoDB/cart.dao.js";


export const verifyCartExist = async (req = request, res = response, next) => {
    
    const {cId} = req.params;
    const cart = await productsDao.getById(cId);
    if(!cart) return res.status(404).json({status: "Error", msg: `No se encontro el carrito con el ID ${cId}`});
    next();
} 