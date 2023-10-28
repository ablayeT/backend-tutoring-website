const express = require('express');
const router = express.Router();

const seachCtrl = require('../controllers/search');
const { getAllSessions } = require('../controllers/tutor');

// Rechercher des tuteurs en fonction de ses critères
router.get('/tutors', seachCtrl.searchTutors);
// Rechercher des étudiants en foncton de critères ...
router.get('/student', seachCtrl.searchStudents);
// Recherche en fonction de la localisation, de la matière et du tuteur

router.get('/sessions', seachCtrl.searchSessions);

module.exports = router;
