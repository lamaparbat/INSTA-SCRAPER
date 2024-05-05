import mongoose from "mongoose";

export default async function initConnections() {
    try {
        if (!process.env.MONGODB_URL) return;

        const mongoInstance = await mongoose.connect(process.env.MONGODB_URL);
        if (mongoInstance) console.log("Mongodb connection established!");

    } catch (error) {
        console.error(error);
    }
}