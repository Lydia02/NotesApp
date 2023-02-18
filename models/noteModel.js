const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const NoteSchema = new Schema({

  title: {
    type: String,
    required: true,
    unique: true
},
description: {
    type: String,
},
tags: {
    type: String,
},
body: {
    type: String
},
owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
},
accessControl: {
     type: String,
     default: 'private',
     enum: ['private', 'public']
 },
 read_count: {
    type: Number,
    default: 0
},
reading_time: {
    type: Number,
    tags: [ String ]
},

 
},
{ timestamps: true}
);

const Notes = mongoose.model('Notes', NoteSchema);

module.exports = Notes;
