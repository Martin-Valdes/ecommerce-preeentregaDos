import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  
  res.render("home", {styles: "index.css" });
});

router.post("/products", (req, res) => {

  let products = [];

  const { title, description, code, price, stock, category} = req.body;

  const newProduct = {
    title,
    description,
    code,
    price,
    stock,
    category
  };

  products.push(newProduct)

  res.render("home", {styles: "index.css" });
});



export default router;
