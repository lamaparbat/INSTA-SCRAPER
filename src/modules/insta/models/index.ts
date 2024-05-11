import mongoose from "mongoose";

const instaTagsSchema = new mongoose.Schema({
    url: {
        type: String,
        unique: true,
    },
    link: String,
    userId: String,
});
const InstaTagsModel = mongoose.model('instaTags', instaTagsSchema);

export default InstaTagsModel;