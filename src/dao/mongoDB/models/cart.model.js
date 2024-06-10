import mongoose from "mongoose";

const cartCollerction = "cart";

const cartSchema = new mongoose.Schema({

    products: {
        type: Array,
        default: [],
    }
});

export const cartModel = mongoose.model(cartCollerction, cartSchema);