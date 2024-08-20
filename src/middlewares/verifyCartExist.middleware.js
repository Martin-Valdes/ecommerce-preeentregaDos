import { request, response } from "express";
import cartRepository from "../dao/mongoDB/cart.repository.js";

export const verifyCartExist = async (req = request, res = response, next) => {
  const { cId } = req.params;
  const cart = await cartRepository.getById(cId);
  if (!cart)
    return res
      .status(404)
      .json({
        status: "Error",
        msg: `No se encontro el carrito con el ID ${cId}`,
      });
  next();
};
