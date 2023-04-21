require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const notes = require("./router/notes")
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB).catch((err)=>{
  console.log(err);
})
app.use(cors());
app.use("/notes",notes.router);
app.get("/",(req,res)=>{
  res.send("hello world");
})
app.listen(process.env.PORT || 3000,()=>{
  console.log("started");
})