import { Router } from "express";
import userDao from "../dao/mongoDB/user.dao.js";
import { isValidPassword } from "../utils/hashPassword.js";
import passport from "passport";

const router = Router();

router.post("/register", passport.authenticate("register"), async (req, res) =>{

    try {
        res.status(201).json({status:"ok", msg:"user create"})
    } catch (error) {
        console.log(error);

        res.status(500).json({status:"error", msg:"Internal server error"})
    }

});

router.post("/login", passport.authenticate("login"), async (req, res) =>{

    try {
        return res.status(200).json({status: "ok", payload: req.user});
    } catch (error) {
        console.log(error);

        res.status(500).json({status:"error", msg:"Internal server error"});
    }
    
});

router.get("/google", passport.authenticate("google", {scope: ["https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"], session: false}), async (req, res) =>{

    try {
        return res.status(200).json({status: "ok", payload: req.user})
    } catch (error) {
        console.log(error);

        res.status(500).json({status:"error", msg:"Internal server error"});
    }
    
});

export default router;