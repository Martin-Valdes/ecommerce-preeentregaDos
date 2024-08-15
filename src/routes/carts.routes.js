import { Router } from "express";
import cartsControllers from "../controllers/carts.controllers.js";
import { verifyProductExist } from "../middlewares/verifyProductExist.middleware.js";
import { verifyCartExist } from "../middlewares/verifyCartExist.middleware.js";
import { isUserCart } from "../middlewares/isUserCart.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";


const router = Router();

const middlewares = [verifyCartExist, verifyProductExist, passportCall("jwt"), isUserCart];

/////FUNCION PARA AGREGAR UN CARRITO
router.post("/", cartsControllers.createCart);

//////FUNCION PARA VER CARRITO POR ID
router.get("/:cId", verifyCartExist, cartsControllers.getCartById);

////FUNCION PARA AGREGAR UN PRODUCTO AL CARRITO
router.post(
  "/:cId/product/:pid",
  middlewares,
  cartsControllers.addProductToCart
);

///AQUI ELIMINAMOS UN PRODUCTO DEL CARRITO
router.delete(
  "/:cId/product/:pid",
  middlewares,
  cartsControllers.deletePorductToCart
);

///EN ESTE ENDPOINT REALIZAMOS LA ACTUALIZACION DEL QUNATITY

router.put(
  "/:cId/product/:pid",
  middlewares,
  cartsControllers.updateModifyQuantity
);

//EN ESTE ENDPOINT OBTENEMOS EL ID DEL CARRITO Y LLAMAMOS A
//CART.DAO PARA  VACIAR EL CARRITO A TRAVEZ DE UN ARRAY VACIO.
//EN CASO DE NO COINCIDIR EL ID DEL CART CON NINGUNO DE LA BASE DE DATOS SE MUESTRA EL ERROR
router.delete("/:cId", verifyCartExist, cartsControllers.deletePorductToCarts);

export default router;
