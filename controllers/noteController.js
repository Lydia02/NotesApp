const express = require('express')
const Notes = require('../models/noteModel')
const { readingTime } = require('../utils/utils')

const createNote = async (req, res, next) => {
  try {
  
    const { title, description, read_count ,tags, body } = req.body
    // create  object
    const newNote =  new Notes({
      title,
      description,
      tags,
      body,
      owner: req.user._id,
      read_count,
      timestamp:Date.now(),
      reading_time: readingTime(body)
    })
    
    // save to database
    const createdNote = await newNote.save()
    //return response
    return res.status(201).json({
      status: true,
      data: createdNote 
    })


  } catch (error) {
    // console.log(error)
    next(error)
  }
}

const AllpublicNotes = async (req, res, next) => {
  const {page, posts, owner,title,tags, order_by, order} = req.query;
  try {
    const searchQuery = {
      state: "public"
    },
    sortQuery = {};
    let searchtags = {};

    //Pagination

    const startpage = (!page ? 0: page);
    const postsPerPage = (!posts?20:posts);
    const sortOrder = (!order ? "asc": order);
    const orderParams = (!order_by ? "timestamp": order_by);
    //Searching
    searchtags = (!tags ? ["post"]: getTags(tags));
    if(owner) {
      searchQuery.owner = owner

    }
    if(title) {
      searchQuery.title = title.toLowerCase()
    }

    //Sorting

    sortParams = orderParams.split(",");
    for (const param of sortParams) {

      if(sortOrder == "asc" && order_by) {
        sortQuery[param] =1;
      }
      if(sortOrder == "desc" && order_by) {
        sortQuery[param] = -1
      }
      if(sortOrder == "desc" && order_by) {
        sortQuery[param] = -1
      }
      if(sortOrder == "asc" && !order_by) {
        sortQuery[param] = 1
      }
    }
    
    const notes = await Note
    .find({tags:{$in:searchtags },...searchQuery})
  return res.json({
      status: true,
      data: notes
    })
  } catch (err) {
    err.source = 'get public notes controller'
    next(err)
  }
}

const PublicNote = async (req, res, next) => {
  try {
    const { id } = req.params
    const note = await Note.findById(id)
      .populate('owner', { firstname: 1 })

    if (note.accessControl !== 'Public') {
      return res.status(403).json({
        status: true,
        error: 'Requested notes is private'
      })
    }
  

    // update note read count
    note.read_count += 1
    await note.save()

    return res.json({
      status: true,
      data: note
    })
  } catch (err) {
    err.source = 'get public notes'
    next(err)
  }
}

const updatePublicNoteState = async (req, res) => {
  try{
  const { id } = req.params;
  console.log(id)
  

  const note = await Notes.findById(id)

  if(!note) {
    return res.status(404).json({
      status: false,
      note: null
    })
  }
 note.accessControl = 'public';

  await note.save();
    return res.status(200).json({
      status: true,
     message: 'Note updated successfully',
     note: note
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    })
  }
}

const updatePublicNote = async (req, res) => {
  try{
  const { id } = req.params;
   
 const { title, description,tags, body } = req.body


  const note = await note.findById(id)

  if(!note) {
    return res.status(404).json({
      status: false,
      note: null
    })
  }
 note.title = title;
 note.tags = tags;
 note.description = description;
 note.body = body;

  await note.save();
    return res.status(200).json({
      status: true,
     message: 'Note updated successfully',
     note: note
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    })
  }
}


const deletePublicNotes = async(req, res) => {
  const { id } = req.params;

  const note = await Notes.deleteOne({_id:id})

  return res.json({ status: true, note})
}
module.exports = {
  createNote,
  AllpublicNotes,
  PublicNote,
  updatePublicNoteState,
  updatePublicNote,
  deletePublicNotes
}