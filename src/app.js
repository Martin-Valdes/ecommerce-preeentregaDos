import express from "express";
import router from "./router/index.js";
import viewRoutes from "./routes/views.routes.js";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import { Server } from "socket.io";
import productsManager from "./productsManager.js";

const app = express();
const PORT = 8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", handlebars.engine()); 
app.set("views", __dirname + "/views"); 
app.set("view engine", "handlebars"); 


app.use("/api", router);
app.use("/", viewRoutes);


const httpServer = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});

export const socketServer = new Server(httpServer);

socketServer.on("connection", async() => {
  console.log("Nuevo usuario conectado");


});

