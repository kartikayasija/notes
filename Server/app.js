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

app.listen(process.env.PORT,()=>{
  console.log("started");
})