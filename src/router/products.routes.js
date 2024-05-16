import { Router } from "express";
import { randomUUID } from 'crypto';


const router = Router();

class productManager {
    
    constructor(){
        this.products = [];
    }
    
    addProduct(product){

        const {title, description, code, price, status, stock, category, thumbnails} = product;
      
        const newProduct = {
            id: randomUUID(),
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        };
        
        const verifyRepit = this.products.find(product => product.code === code);

        if (verifyRepit) throw new Error("Ya existe un producto con este codigo");

        if(Object.values(newProduct).includes(undefined))throw new Error("Debes completar todos los campos");

        this.products.push( newProduct);
       
    }
    getProducts() {

        return this.products
    }

    getProductById({id}){

        const product = this.products.find( product => product.id === id)
        return product

    }
    putProduct({id}){
        let productIndex = this.products.index( product => product.id === id)
        /// falta definir put me da error en este metodo
      
    }

}

const productNew = new productManager();

//respuesta a la solicitud de lista completa de productos
const productList = productNew.getProducts()

router.get("/",(req, res) =>{
   
    res.status(200).json({productList});
});

//FUNCION PARA RETORNAR EL PRODUCTO POR ID MEDIANTE REQ.PARAMS
router.get("/:id",(req, res) =>{
   
    const {id} = req.params;
    
    const productId = productNew.getProductById({id})
    res.send(productId)


});

//fUNCION PARA ALMACENAR UN NUEVO PRODUCTO
router.post ("/", (req, res) =>{

    const product = req.body;

    productNew.addProduct(product);

    res.status(201).json({status: "status", msg: "Porducto almacenado"});
})

router.put("/:id",(req, res) =>{
   
    let dataProduct = req.body;
    const {id} = req.params;
    
    const productId = productNew.putProduct({id})
    res.send(productId)


});

export default router;