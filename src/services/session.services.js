import userRepository from "../dao/mongoDB/user.repository.js";
import { createToken } from "../utils/jw.js";

const registerStrategy = async (userData) => {
  
    return await userRepository.create(userData);
  }

const loginStrategy = async (user) => {

    return createToken(user);
  }

const authStrategy = async () => {

}


export default {
    registerStrategy,
    loginStrategy,
    authStrategy,
}