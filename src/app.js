import express from "express";

const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())


let users = [];

app.get("/saludo", (req, res) =>{

    res.send("mi primer respuesta express");

})

app.get("/bienvenida", (req, res) =>{

    res.send(`<h1 style="color:blue">bienvenidoooooooo</h1>`)

})

app.get("/usuario", (req, res) =>{

    const user = {

        nombre: "pepe",
        apellido: "loco",
        edad: 32,
        correo: "lolo@gmail.com",

    }

    res.send(user)

})

app.get("/params/:name", ( req, res ) => {

    const {name} = req.params;

    res.send(`el nombre del clinete es ${name}`);

})

const usuarios = [
    {id:23324, nombre:"pepe", apellido:"lolo"},
    {id:22224, nombre:"roro", apellido:"wew"},
    {id:234323, nombre:"titi", apellido:"hgfh"}
]

app.get("/usuarios/:id", (req, res)=>{

    const {id} = req.params;

    const usuario = usuarios.find( usuario => usuario.id === Number(id))

    if(!usuario) return res.send(`errorr: no se encuentra ${id}`)

    res.send(usuario);

})

app.get("/api/user", (req, res) =>{
    res.status(200).json({status:"sucess", payload: users})
})

app.post("/api/user", (req, res) => {
    let user = req.body;

    if (!user.nombre) return res.status(400).json({status: "error", msg: "ingrese un nombre"});

    users.push(user);
    console.log(user)
    res.status(200).json({status:"sucess", payload: user})
})


app.listen(8080, () =>{
    console.log("servidor escuchando");
})