import userDao from "../dao/mongoDB/user.repository.js";
import { createToken } from "../utils/jw.js";

const registerStrategy = async () => {
    return await userDao.create();
  }

const loginStrategy = async () => {
    return createToken();
  }

const authStrategy = async () => {

}


export default {
    registerStrategy,
    loginStrategy,
    authStrategy,

}