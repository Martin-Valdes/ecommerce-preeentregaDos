import { Router } from "express";
import productsRoutes from "./products.routes.js";
import cartsRoutes from "./carts.routes.js";
import viewsRoutes from "./views.routes.js";
import sessionRouter from "./session.routes.js"

const allRoutes = Router();

allRoutes.use("/api/products", productsRoutes);
allRoutes.use("/api/carts", cartsRoutes);
allRoutes.use("/", viewsRoutes);
allRoutes.use("/session", sessionRouter);

export default allRoutes;