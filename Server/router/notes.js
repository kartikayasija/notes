const express = require("express");
const notesController = require("../controller/notes");
const router = express.Router();

router
  .get("/",notesController.getNote)
  .post("/",notesController.createNote)
  .delete("/:id",notesController.deleteNote)
  .patch("/:id",notesController.updateNote)
exports.router=router;