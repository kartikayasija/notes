const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: String,
  content: String
})

exports.Note = mongoose.model("Note",notesSchema)