const express = require('express');
const router = express.Router();
// const multer = require('multer')

const tutorCtrl = require('../controllers/tutor')
const verifyToken = require('../middleware/verifyToken')
const multerUpload =  require('../middleware/multer.config')
// const upload = multer({ dest: 'images/' })
const tutorOnly = require('../middleware/tutorOnly');

router.get('/profile/:id', tutorCtrl.getOneProfile)
router.get('/sessions',verifyToken, tutorCtrl.getTutorSessions)
router.get('/subjects', tutorCtrl.getAvailableSubjects)
router.delete('/sessions/:id', tutorCtrl.deleteSession)
router.put('/sessions/:id', verifyToken,tutorCtrl.updateSession)
router.put('/profile/:id', verifyToken, tutorCtrl.updateTutorProfile)
router.post('/profile/:id',multerUpload, tutorCtrl.createTutorProfile)
router.post('/sessions',  tutorCtrl.createTutoringSession )
 
module.exports = router;   