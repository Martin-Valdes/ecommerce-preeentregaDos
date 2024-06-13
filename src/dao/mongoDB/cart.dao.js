import {cartModel} from "./models/cart.model.js"
import { productModel } from "./models/products.models.js";

const getAll = async () => {
    const cart = await cartModel.find({status: true});
    return cart
};
const getById = async (id) => {
    const cart = await cartModel.findById(id);
    return cart;
};
const create = async (data) => {
    const cart = await cartModel.create(data);
    return cart;
};
const update = async (id, data) => {
    const cartUpdate = await cartModel.findByIdAndUpdate(id, data, { new: true });
    return cartUpdate;
};
const deleteOne = async (id) => {
    const cart = await cartModel.deleteOne({_id: id});
    return cart;
};
const addProductToCart = async (id, pid) => {

    const product = await productModel.findById(pid);
    if (!product) return { product: false };
    const cart = await cartModel.findById(id);
    if (!cart) return { cart: false };

    const productInCart = await cartModel.findOneAndUpdate({_id: id, "products.product": pid}, {$inc: {"products.$.quantity": 1}});

    if(!productInCart){
        await cartModel.updateOne( {_id: id}, { $push: {products: pid, quantity: 1}});
    }
    const cartUpdate = await cartModel.findById(id);

    return cartUpdate;
}


export default {
    getAll,
    getById,
    create,
    update,
    deleteOne,
    addProductToCart,
};