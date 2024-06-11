import { Router } from "express";
import productsRoutes from "./products.routes.js";
import cartsRoutes from "./carts.routes.js";
import viewsRoutes from "./views.routes.js"

const allRoutes = Router();

allRoutes.use("/api/products", productsRoutes);
allRoutes.use("/api/carts", cartsRoutes);
allRoutes.use("/", viewsRoutes);

export default allRoutes;