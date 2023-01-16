const { Router } = require("express");
const { PostModel } = require("../model/post.model");

const userpost = Router();

userpost.get("/", async (req, res) => {
  let post = await PostModel.find();
  console.log(post);
  res.send(post);
});



userpost.get("/:device", async (req, res) => {
let query=req.params.device
  let post = await PostModel.find({"device":query});
  console.log(post);
  res.send(post);
});



userpost.post("/creat", async (req, res) => {
  const payload = req.body;
  try {
    const new_post = new PostModel(payload);
    await new_post.save();
    res.send({ msg: "Post Created Sucsessfully..." });
  } catch (error) {
    console.log(error);
    res.send({ msg: "Somthing Went Wrong" });
  }
});

userpost.patch("/posts/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const npost = await PostModel.findOne({ _id: id });
  const userId_innote = note.userId;
  const userID_updating_req = req.body.userId;
  try {
    if (userID_updating_req !== userId_innote) {
      res.send({ msg: "You are Not Authorized..." });
    } else {
      await PostModel.findByIdAndUpdate({ _id: id }, payload);
      res.send({ msg: "Note Updated Sucsessfully...." });
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: "Somthing Went Wrong" });
  }
});
userpost.delete("/posts/delete/:id", async (req, res) => {
  const id = req.params.id;
  const npost = await PostModel.findOne({ _id: id });
  const userId_innote = note.userId;
  const userID_updating_req = req.body.userId;
  try {
    if (userID_updating_req !== userId_innote) {
      res.send({ msg: "You are Not Authorized..." });
    } else {
      await PostModel.findByIdAndDelete({ _id: id });
      res.send({ msg: "Note Deleted Sucsessfully...." });
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: "Somthing Went Wrong" });
  }
});

module.exports = userpost;
