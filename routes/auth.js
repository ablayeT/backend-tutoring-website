const express = require('express');
const router = express.Router();

const userAuthCtrl = require('../controllers/auth')
const verifyToken =  require('../middleware/verifyToken')

  // Route pour l'inscription (signup) d'un nouvel utilisateur
router.post('/signup', userAuthCtrl.signup,)
  // Route pour la connexion (login) d'un utilisateur
router.post('/login',userAuthCtrl.login)
// route pour modifier le mot de passe 
router.put('/change-password', verifyToken, userAuthCtrl.changePassword)
//Route pour réinitialiser le mot de passe 
router.post('/reset-password', userAuthCtrl.resetPassword)

router.get('/current',verifyToken, userAuthCtrl.authCurrent )

router.post('/logout', userAuthCtrl.logout)

module.exports = router;




// // Route pour créer un nouvel utilisateur
// router.post('/users', async (req, res) => {
//     const { name, email, password, type } = req.body;
  
//     try {
//       const newUser = await knex('users').insert({ name, email, password, type });
//       res.status(201).json({ message: 'Utilisateur créé avec succès', id: newUser[0] });
//     } catch (error) {
//       res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
//     }
//   });