const express = require('express');
const router = express.Router();

const seachCtrl = require('../controllers/search');


// Rechercher des tuteurs en fonction de ses critères 
router.get('/tutors', seachCtrl.searchTutors)
// Rechercher des étudiants en foncton de critères ... 
router.get('/student', seachCtrl.searchStudents)


module.exports = router; 