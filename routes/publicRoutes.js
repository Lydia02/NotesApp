const passport = require('passport')

const express = require('express')
const publicRouter = express.Router()

const publicController = require('../controllers/publicNoteController')
publicRouter.get('/notes', publicController.getAllPublicNotes)

module.exports = publicRouter