import { Router } from "express";
import productsRoutes from "./products.routes.js";
import cartsRoutes from "./carts.routes.js";
import viewsRoutes from "./views.routes.js"

const allRoutes = Router();

allRoutes.use("/products", productsRoutes);
allRoutes.use("/carts", cartsRoutes);
allRoutes.use("/", viewsRoutes);

export default allRoutes;