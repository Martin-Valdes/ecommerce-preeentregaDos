import productDao from "../dao/mongoDB/product.dao.js";


const createproduct = async () => {
    return await productDao.create();
}

const getProducts = async () => {
    return await productDao.getAll();
}

const getproductById = async (cId) => {
    return await productDao.getById(cId);
}

const updateModifyProduct = async (pid) => {
    return await productDao.updateModifyProduct(pid);
};

const deleteProduct = async (pid) => {
    return await productDao.deleteOne(pid);
}

export default {
    createproduct,
    getProducts,
    getproductById,
    updateModifyProduct,
    deleteProduct,
}