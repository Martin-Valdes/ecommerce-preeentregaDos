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
    },
    role:{
        type:String,
        default: "user"
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId, 
        ref: "cart" 

    },
});

export const userModel = mongoose.model(userCollerction, userSchema);