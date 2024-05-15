import mongoose from "mongoose";
import initInstaTagsScrapCron from "../modules/insta/utils/cron";

export default async function initConnections() {
    try {
        if (!process.env.MONGO_URI) return;

        const mongoInstance = await mongoose.connect(process.env.MONGO_URI);
        if (mongoInstance) console.log("Mongodb connection established!");

        initInstaTagsScrapCron();

    } catch (error) {
        console.error(error);
    }
}