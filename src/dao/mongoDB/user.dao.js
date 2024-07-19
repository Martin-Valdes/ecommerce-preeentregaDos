import {userModel} from "./models/user.model.js"


const getAll = async (query, option) => {
    ////AQUI APLICAMOS LA PAGINACION SEGUN LOS DOS PARAMETROS QUE NOS LLEGAN QUERY Y OPTION
    const products = await userModel.paginate(query, option);
    return users
};
const getById = async (id) => {
    const user = await userModel.findById(id);
    return user;
};
const create = async (data) => {
    const user = await userModel.create(data);
    return user;
};
const update = async (id, data) => {
    const userUpdate = await userModel.findByIdAndUpdate(id, data, { new: true });
    return userUpdate;
};
const deleteOne = async (id) => {
    const user = await userModel.findByIdAndUpdate(id, {status: false}, { new: true });
    return user;
};


export default {
    getAll,
    getById,
    create,
    update,
    deleteOne,
};
