const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");
const user=require("./routes/useRroute")
const userpost=require("./routes/postRoute")
const {authonticate}=require("./midalwere/authonticate.middlewere")

const app = express();

app.use(cors({
    origin:"*",
}))

app.use(express.json());
app.use("/users",user)
app.use(authonticate)
app.use("/post",userpost)
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connecter TO Db");
  } catch (error) {
    console.log(error);
  }
});
