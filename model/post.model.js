//models

const mongoose = require("mongoose");

const postSchima = mongoose.Schema({
    title: String,
    body: String,
    device: String,
    userId:String,
});


const PostModel=mongoose.model("post",postSchima)

module.exports={
    PostModel
}