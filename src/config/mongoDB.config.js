import mongoose from "mongoose";

export const connectMongoDB = async () => {

    try {
        await mongoose.connect("mongodb+srv://valdesmartin:123@cluster0.tjoeobj.mongodb.net/prueba");
        console.log("Mong DB connected")
    } catch (error) {
        console.log(error);
    }
}

