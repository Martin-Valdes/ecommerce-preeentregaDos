import { Router } from "express";
import userDao from "../dao/mongoDB/user.dao.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";

const router = Router();

router.post("/register", async (req, res) =>{

    try {
        const {firstName, lastName, password, email, age} = req.body;
        const newUser = {
            firstName,
            lastName,
            password: createHash(password),
            email,
            age,
        }
        const user = await userDao.create(newUser);
        if(!user) return res.status(400).json({status:"error", msg:"User no created"})

        return res.status(201).json({status: "ok", user});
    } catch (error) {
        console.log(error);

        res.status(500).json({status:"error", msg:"Internal server error"})
    }

});

router.post("/login", async (req, res) =>{

    try {

        const {email, password} = req.body;

        if(email === "adminCoder@coder.com" && password === "adminCod3r132"){
            req.session.user = {
                email,
                role: "admin",
            };
            return res.status(200).json({status: "ok", user: req.session.user});
        }

        const user = await userDao.getByEmail(email);

        if(!user || !isValidPassword(user.password, password)) return res.status(400).json({status:"error", msg:"User not found"});
        
        req.session.user = {
            email,
            role: "user",
        }

        return res.status(200).json({status: "ok", user: req.session.user});
    } catch (error) {
        console.log(error);

        res.status(500).json({status:"error", msg:"Internal server error"});
    }

});

export default router;