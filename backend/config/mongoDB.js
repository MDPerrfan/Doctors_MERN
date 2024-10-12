import mongoose from "mongoose";

const connectDB = async() => {
    try {
        mongoose.connection.on('connected', () => console.log("Database Connected!"))
        await mongoose.connect(`${process.env.MONGODB_URI}/doctorsbd`)
    } catch (error) {
        console.error("DB connection error:", error.message);
    }
}

export default connectDB;