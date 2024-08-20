import { createToken } from "../utils/jw.js";
import sessionServices from "../services/session.services.js";
import userRepository from "../dao/mongoDB/user.repository.js";
import { isValidPassword } from "../utils/hashPassword.js";

const registerStrategy = async (req, res) => {
    try {
      res.status(201).json({ status: "ok", msg: "User created" });
    } catch (error) {
      console.log(error);
  
      res.status(500).json({ status: "error", msg: "Internal server error" });
    }
  }


const loginStrategy = async (req, res) => {
    try {
        
      const token = sessionServices.loginStrategy(req.user);
      console.log(token)
      //SETEAMOS EL TOCKEN EN LA COOKIE
      res.cookie("token", token, { httpOnly: true });
      
      return res.status(200).json({ status: "ok", payload: req.user, token: token });
    } catch (error) {
      console.log(error);
  
      res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const authStrategy = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userRepository.getByEmail(email);
  
      if (!user || !isValidPassword(user.password, password))
        return res.status(401).json({ status: "error", msg: "User or email not found" });
  
      const token = createToken(user);
  
      res.cookie("token", token, { httpOnly: true });
  
      return res.status(200).json({ status: "ok", user, token });
    } catch (error) {
      console.log(error);
  
      res.status(500).json({ status: "error", msg: "Internal server error" });
    }
  }

  export default {
    registerStrategy,
    loginStrategy,
    authStrategy
  }