//midlewer

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config();

const authonticate=(req,res,next) => {
const token=req.headers.authorization;
if(token){
  const decode=jwt.verify(token,process.env.key)
  if(decode){

    const userId=decode.userId
    console.log(decode)
    req.body.userId=userId
    next()
  }
else{
  res.send({msg:"Please Login FIrst..."})
}
}
else{
  res.send({msg:"Please Login FIrst..."})
}



}

module.exports={
    authonticate
}
