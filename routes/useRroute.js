const { Router } = require("express");
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user = Router();
require("dotenv").config();
user.post("/register", async (req, res) => {
  let { name, email, gender, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, secured_pass) => {
      if (err) {
        console.log(err);
      } else {
        const newUser = new UserModel({
          name,
          email,
          gender,
          password: secured_pass,
        });
        await newUser.save();
        console.log(newUser);
        res.send({ msg: "New user Create Succsessfully...." });
      }
    });
  } catch (error) {
    res.send("Error With the registration with this user");
    console.log(error);
  }
});

user.post("/login", async (req, res) => {
  let {  email, password } = req.body;
  try {
    const loger = await UserModel.find({ email });
    if (loger.length > 0) {
      bcrypt.compare(password, loger[0].password, (err, result) => {
        if (result) {
          var token = jwt.sign(
            { course: "backentevoluation" },
            process.env.key
          );
          res.send({ msg: "Login Sucsessfull", token: token });
        } else {
          res.send({ msg: "Wrong Credentials" });
        }
      });
    }
  } catch (error) {
    res.send({ msg: "Somthing Went Wrong while Login" });
    console.log(error);
  }
});

module.exports = user;
