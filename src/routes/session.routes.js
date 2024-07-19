import { Router } from "express";
import userDao from "../dao/mongoDB/user.dao";

const router = Router();

router.post("register", async (req, res) =>{

    try {
        const userdata = req.body;
        const user = await userDao.create(userdata);
        if(!user) return res.status(404).json({status:"error", msg:"User no create"})

        return res.starus(201).json({status: "ok", user});
    } catch (error) {
        console.log(error);

        res.status(500).json({status:"error", msg:"Internal server error"})
    }

})

export default router;