import mongoose from "mongoose";

const userCollerction = "user";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    age:{
        type: Number,
    }
});

export const userModel = mongoose.model(userCollerction, userSchema);