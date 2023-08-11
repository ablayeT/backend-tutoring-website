const express = require('express');
const router = express.Router();

const userCRUDCtrl = require('../controllers/userController'); 
const multerUpload =  require('../middleware/multer.config')
const verifyToken = require('../middleware/verifyToken')
// Route pour récuperer un profil par l'id
router.get('/profiles/:id', userCRUDCtrl.getOneProfile);
// Route pour modifier un profile par id et par type de profile
router.put('/profiles/:id',  userCRUDCtrl.updateOneProfile);
router.delete('profiles/:id', userCRUDCtrl.deleteProfile)
// Récupérer la liste de tous les profils ou des profils filtrés par type d'utilisateur (étudiant ou tuteur)
router.get('/profiles', userCRUDCtrl.getProfiles)
router.get('/profiles/?userType=student', userCRUDCtrl.getProfiles)
router.get('/profiles/?userType=tutor', userCRUDCtrl.getProfiles)
// Route pour créé un profil en fonction du type de profil
router.post('/profiles/:id',verifyToken,  userCRUDCtrl.createProfile)
// Route pour laisser une evaluation et un commentaire sur tutor en tant qu'etdiant

// Route pour récupérer les détails d'un utilisateur par son ID
// router.get('/:id',userCRUDCtrl.getOneUser);
  // Route pour créer une session de tutorat
// router.post('/tutoring-sessions',userCRUDCtrl.createTutoringSessions);
  // Route pour récupérer les sessions de tutorat d'un utilisateur par son ID
// router.get('/:id/tutoring-sessions',userCRUDCtrl.getOneTutoringSessions);


module.exports = router;





