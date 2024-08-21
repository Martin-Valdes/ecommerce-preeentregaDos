import { Router } from "express";
import cartsControllers from "../controllers/carts.controllers.js";
import { verifyProductExist } from "../middlewares/verifyProductExist.middleware.js";
import { verifyCartExist } from "../middlewares/verifyCartExist.middleware.js";
import { isUserCart } from "../middlewares/isUserCart.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";



const router = Router();

const middlewares = [verifyCartExist, passportCall("jwt"), isUserCart];

/////FUNCION PARA AGREGAR UN CARRITO
router.post("/",middlewares, 
  authorization("user"),
   cartsControllers.createCart
  );

//////FUNCION PARA VER CARRITO POR ID
router.get("/:cId", verifyCartExist,middlewares,  cartsControllers.getCartById);

////FUNCION PARA AGREGAR UN PRODUCTO AL CARRITO
router.post(
  "/:cId/product/:pid",
  middlewares, 
  authorization("user"),
  cartsControllers.addProductToCart
);

///AQUI ELIMINAMOS UN PRODUCTO DEL CARRITO
router.delete(
  "/:cId/product/:pid",
  authorization("user"),
  middlewares,
  cartsControllers.deletePorductToCart
);

///EN ESTE ENDPOINT REALIZAMOS LA ACTUALIZACION DEL QUNATITY

router.put(
  "/:cId/product/:pid",
  authorization("user"),
  middlewares,
  cartsControllers.updateModifyQuantity
);

//EN ESTE ENDPOINT OBTENEMOS EL ID DEL CARRITO Y LLAMAMOS A
//CART.DAO PARA  VACIAR EL CARRITO A TRAVEZ DE UN ARRAY VACIO.
//EN CASO DE NO COINCIDIR EL ID DEL CART CON NINGUNO DE LA BASE DE DATOS SE MUESTRA EL ERROR
router.delete("/:cId", verifyCartExist, cartsControllers.deletePorductToCarts);

router.get("/:cId/purchase",passportCall("jwt"), authorization("user"), cartsControllers.purchaseCart);

export default router;
