import express from "express";
import router from "./router/index.routes.js";

const app = express();
const PORT = 8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use("/api", router);


app.listen(PORT, () =>{
    console.log(`servidor escuchando ${PORT}`);
})