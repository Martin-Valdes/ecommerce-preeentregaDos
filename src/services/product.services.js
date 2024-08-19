import productRepository from "../dao/mongoDB/product.repository.js";


const createproduct = async (productData) => {
    return await productRepository.create(productData);
}

const getProducts = async (query, options) => {
    return await productRepository.getAll(query, options);
}

const getproductById = async (pid) => {
    return await productRepository.getById(pid);
}

const updateModifyProduct = async (pid, productData) => {
    return await productRepository.updateModifyProduct(pid, productData);
};

const deleteProduct = async (pid) => {
    return await productRepository.deleteOne(pid);
}

export default {
    createproduct,
    getProducts,
    getproductById,
    updateModifyProduct,
    deleteProduct,
}