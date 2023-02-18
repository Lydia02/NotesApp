const passport  = require('passport')
const router = require('express').Router()
const { createNote, AllpublicNotes, PublicNote, updatePublicNote, updatePublicNoteState, deletePublicNotes} = require('../controllers/noteController')
const auth = require('../middleware/auth')
router.route('/note').get(AllpublicNotes)
router.route('/:id').get(PublicNote)
router.route('/note/:id').patch(updatePublicNote)
router.route('/:id').patch(updatePublicNoteState)
router.route('/:id').delete(deletePublicNotes)
// router.use(auth)
 //router.post('/', passport.authenticate('blog', {session:false}))


 router.route('/').post(createNote)

module.exports = router