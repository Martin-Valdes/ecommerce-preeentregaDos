import { request, response } from "express";
import productsManager from "../productsManager.js";

export const verifyDataProduct = async (req = request, res = response, next) => {
  try {
    const { title, description, code, price, stock, category } = req.body;
    const newProduct = {
      title,
      description,
      code,
      price,
      stock,
      category,
    };

    const products = await productsManager.getProducts();
    // Validar que no se repita el campo de code
    const productExists = products.find((p) => p.code === code);
    if (productExists) return res.status(400).json({ status: "Error", msg: `El producto con el código ${code} ya existe` });

    // Validamos que los campos sean obligatorios

    const checkData = Object.values(newProduct).includes(undefined);
    if (checkData) return res.status(400).json({ status: "Error", msg: "Todos los datos son obligatorios" });

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
};
