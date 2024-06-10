import mongoose from "mongoose";

const productCollerction = "products";

const productSchema = new mongoose.Schema({

    title: String,
    description: String,
    price: Number,
    thumbnail: {
        type: Array,
        default: [],
    },
    code: String,
    stock: Number,
    category: String,
    status: {
        type: Boolean,
        default: true,
    },
});

export const productModel = mongoose.model(productCollerction, productSchema);