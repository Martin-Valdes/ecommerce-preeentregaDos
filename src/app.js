import express from "express";
import allRoutes from "./routes/index.js";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import { Server } from "socket.io";
import { connectMongoDB } from "./config/mongoDB.config.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";


const app = express();
const PORT = 8081;

connectMongoDB();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

//COOKIES
app.use(cookieParser());
app.use(session({
  secret: "secretCoder",
  resave: true,
  saveUninitialized: true,
}));

app.engine("handlebars", handlebars.engine()); 
app.set("views", __dirname + "/views"); 
app.set("view engine", "handlebars"); 


initializePassport();
app.use(passport.initialize());
app.use(passport.session());

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

