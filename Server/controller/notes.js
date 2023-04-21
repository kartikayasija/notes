const express = require("express");
const mongoose = require("mongoose");
const model = require("../model/notes");

exports.createNote = async(req,res)=>{
  const newNote = new model.Note({
    title: req.body.title,
    content: req.body.content
  })
  newNote.save().then(()=>{
    res.status(200).json({
      message: 'Note created successfully',
      note: newNote
    })
  }).catch((err)=>{
    res.status(400).json({
      message: 'Failed to create note',
      error: err
    });
    console.log(err)
  })
}

exports.getNote=async(req,res)=>{
  const notes = await model.Note.find({})
  res.json(notes);
}

exports.deleteNote=async(req,res)=>{
  const id = req.params.id;
  await model.Note.findOneAndDelete({_id:id}).then(()=>{
    res.status(200).json({
      message: 'Note Deleted successfully',
    });
  }).catch((err)=>{
    res.status(400).json(err);
  })
}

exports.updateNote=async(req,res)=>{
  await model.Note.findOneAndUpdate({_id:req.params.id},{
    title: req.body.title,
    content: req.body.content
  }).then(()=>{
    res.status(200).json({
      message: 'Note updated successfully',
    })
  }).catch((err)=>{
    res.status(400).json({
      message: 'Failed to update note',
      error: err
    });
    console.log(err)
  })
}