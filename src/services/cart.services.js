import cartRepository from "../dao/mongoDB/cart.repository.js";

const createCart = async () => {
    return await cartRepository.create();
}

const getCartById = async (cId) => {
    return await cartRepository.getById(cId);
}

const addProductToCart = async ( cId, pid ) => {
    return await cartRepository.addProductToCart(cId, pid);
}

const updateModifyQuantity = async (cId, pid, quantity) => {
    return await cartRepository.updateModifyQuantity(cId, pid, quantity);
};

const deletePorductToCart = async (cId, pid) => {
    return await cartRepository.deletePorductToCart(cId, pid);
}

const deletePorductsToCarts = async (cId) => {
    return await cartRepository.deleteProductsTocarts(cId);

}

export default {
    createCart,
    getCartById,
    addProductToCart,
    deletePorductToCart,
    deletePorductsToCarts,
    updateModifyQuantity
}