import express from "express";
import allRoutes from "./routes/index.js";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import { Server } from "socket.io";
import { connectMongoDB } from "./config/mongoDB.config.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 8080;

connectMongoDB();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

app.use(cookieParser());

app.engine("handlebars", handlebars.engine()); 
app.set("views", __dirname + "/views"); 
app.set("view engine", "handlebars"); 

app.use("/", allRoutes);

const httpServer = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});

export const socketServer = new Server(httpServer);

socketServer.on("connection", async() => {
  console.log("Nuevo usuario conectado");
  const products = await productsManager.getProducts();
  socketServer.emit("products", products)
});

