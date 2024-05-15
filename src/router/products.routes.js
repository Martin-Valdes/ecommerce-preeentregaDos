import { Router } from "express";

const router = Router();

let products = [];


router.get("/", (req, res) =>{
    
    res.status(200).json(products);
})

router.post ("/", (req, res) =>{

    const product = req.body;
    products.push(product);

    res.status(201).json({status: "status", msg: "Porducto almacenado"})
})

export default router;