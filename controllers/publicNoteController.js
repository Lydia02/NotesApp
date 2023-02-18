const jwt = require("jsonwebtoken");
//const passport = require("passport");
require('dotenv').config()
const Note = require('../models/noteModel')
//const { readingTime } = require('../utils/utils')

exports.getAllPublicNotes = async (req, res) => {
    let {page, postsPerPage } = req.param
    
    try {
        page = !page? 0: page
        postsPerPage = !postsPerPage? 20: postsPerPage
        let note = await Note
        .find({accessControl:'public'})
        .skip(page)
        .limit(postsPerPage);
        if(note)
        return res.status(200).json({
            success:true,
            message: 'Public Note found!',
            note
        })
        res.status(404).json({
            success:false,
            message: 'Public Notes not found!',
            
      }) 
 } catch(error) {
    res.status(500).json({
        success:false,
        message: "Interal Server Error",
        error: error.message
    })
 }
}

