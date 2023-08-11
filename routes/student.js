const express = require('express');
const router = express.Router();

const studentCtrl = require('../controllers/student'); 
const verifyToken = require('../middleware/verifyToken')
const multerUpload = require('../middleware/multer.config');


router.get('/sessions', verifyToken, studentCtrl.getStudentSessions)
router.get('/profile/:id', studentCtrl.getOneProfile)
router.post('/rate-tutor/:tutorId', verifyToken,multerUpload, studentCtrl.rateCommentTutor); 
router.post('/book-session', studentCtrl.bookSession);
router.post('/profile/:id',multerUpload, studentCtrl.createStudentProfiles)




module.exports = router;
