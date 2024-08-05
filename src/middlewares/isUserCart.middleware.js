import { request, response } from "express";


///VERIFICAMOS QUE EL CARRITO ES DEL USUARIO LOGUEADO
export const isUserCart = async (req = request, res = response) => {
    const {cid} = req.params;

    if(req.user.cart !== cid) return res.status(401).json({status: "error", msg: "Wrong cart user"});

    next();
}