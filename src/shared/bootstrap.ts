import mongoose from "mongoose";

export default async function initConnections() {
    try {
        if (!process.env.MONGO_URI) return;

        const mongoInstance = await mongoose.connect(process.env.MONGO_URI);
        if (mongoInstance) console.log("Mongodb connection established!");

    } catch (error) {
        console.error(error);
    }
}