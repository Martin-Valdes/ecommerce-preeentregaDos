import { Router } from "express";
import passport from "passport";
import {passportCall} from "../middlewares/passport.middleware.js";
import sessionControllers from "../controllers/session.controllers.js";

const router = Router();

router.post("/register", passportCall("register"), sessionControllers.registerStrategy);

router.post("/login", passportCall("login"), sessionControllers.loginStrategy);

router.post("/auth", sessionControllers.authStrategy);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
    session: false,
  }),
  async (req, res) => {
    try {
      return res.status(200).json({ status: "ok", payload: req.user });
    } catch (error) {
      console.log(error);

      res.status(500).json({ status: "error", msg: "Internal server error" });
    }
  }
);

router.get("/current", passportCall("current"), async (req, res) => {
  res.status(200).json({ status: "ok", user: req.user });
});

export default router;
