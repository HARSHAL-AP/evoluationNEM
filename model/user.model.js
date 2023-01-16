//model
const mongoose = require("mongoose");

const userSchima = mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  password: String,
});


const UserModel=mongoose.model("user",userSchima)

module.exports={
    UserModel
}