import mongoose from "mongoose";

const instaTagsSchema = new mongoose.Schema({
    instaUrl: {
        type: String,
        unique: true,
    },
    url: String,
    link: String,
    userId: String,
    filename: String,
});
const InstaTagsModel = mongoose.model('instaTags', instaTagsSchema);

export default InstaTagsModel;