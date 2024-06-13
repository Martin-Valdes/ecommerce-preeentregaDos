import mongoose from "mongoose";

const cartCollerction = "cart";

const cartSchema = new mongoose.Schema({

    products: {
        type: [{porduct:{type: mongoose.Schema.Types.ObjectId, ref:"product"}, quantity: Number}],
    }
});

export const cartModel = mongoose.model(cartCollerction, cartSchema);