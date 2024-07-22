import passport from "passport";
import local from "passport-local";
import userDao from "../dao/mongoDB/user.dao";

const LocalStrategy = local.Strategy;

export const initializePassport = () => {
    passport.use(
        "register",
        new LocalStrategy({passReqToCallback: true, usernameField: "email"}), //EN esta linea le decimos que en vez de usar un username use el email, ES UN OBJETO DE CONFIGURACION PASSPORT TAMBIEN HABILITAMOS PARA QUE UTILICE REQUEST
            async(req, username, password, done) => {
                try {
                    
                    const {firstName, lastName, email, age} = req.body;
                    const user = await userDao.getByEmail(username);
                    if(user) return done(null, false, {message: "User already exist"});
                } catch (error) {
                    
                }
            }

    )
}