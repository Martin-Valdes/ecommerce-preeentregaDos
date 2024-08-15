import cartDao from "../dao/mongoDB/cart.dao.js";

const createCart = async () => {
    return await cartDao.create();
}

const getCartById = async (cId) => {
    return await cartDao.getById(cId);
}

const addProductToCart = async ( cId, pid ) => {
    return await cartDao.addProductToCart(cId, pid);
}

const updateModifyQuantity = async (cId, pid, quantity) => {
    return await cartDao.updateModifyQuantity(cId, pid, quantity);
};

const deletePorductToCart = async (cId, pid) => {
    return await cartDao.deletePorductToCart(cId, pid);
}

const deletePorductsToCarts = async (cId) => {
    return await cartDao.deleteProductsTocarts(cId);

}

export default {
    createCart,
    getCartById,
    addProductToCart,
    deletePorductToCart,
    deletePorductsToCarts,
    updateModifyQuantity
}