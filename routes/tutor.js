const express = require('express');
const router = express.Router();
// const multer = require('multer')

const tutorCtrl = require('../controllers/tutor');
const verifyToken = require('../middleware/verifyToken');
const multerUpload = require('../middleware/multer.config');
const tutorsOnly = require('../middleware/tutorsOnly');
const studentsOnly = require('../middleware/studentsOnly');

router.get('/profile/:id', verifyToken, tutorsOnly, tutorCtrl.getOneProfile);
router.get(
  '/sessions',
  verifyToken,
  tutorsOnly,
  verifyToken,
  tutorCtrl.getAllSessionsWithStudents,
);
router.get('/allSessions', verifyToken, studentsOnly, tutorCtrl.getAllSessions);
router.get(
  '/subjects',
  //   verifyToken,
  //   tutorsOnly,
  tutorCtrl.getAvailableSubjects,
);
router.delete(
  '/sessions/:id',
  verifyToken,
  tutorsOnly,
  tutorCtrl.deleteTutoringSession,
);
router.put(
  '/sessions/:id',
  verifyToken,
  tutorsOnly,
  verifyToken,
  tutorCtrl.updateSession,
);
router.put(
  '/profile/:id',
  verifyToken,
  tutorsOnly,
  tutorCtrl.updateTutorProfile,
);
router.put('/session/ChangeStatus', verifyToken, tutorCtrl.updateSessionStatus);
router.post(
  '/profile/:id',
  verifyToken,
  tutorsOnly,
  multerUpload,
  tutorCtrl.createTutorProfile,
);
router.post(
  '/sessions',
  verifyToken,
  tutorsOnly,
  tutorCtrl.createTutoringSession,
);

module.exports = router;
