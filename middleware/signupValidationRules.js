// middleware/validationMiddleware.js
const { body } = require('express-validator');

const signupValidationRules = () => [
  body('first_name').notEmpty().withMessage('Le prénom est requis'),
  body('last_name').notEmpty().withMessage('Le nom est requis'),
  body('email').isEmail().withMessage("L'adresse email n'est pas valide"),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères')
    .custom((value, { req }) => {
      if (!value.match(/[A-Z]/)) {
        throw new Error(
          'Le mot de passe doit contenir au moins une lettre majuscule',
        );
      }
      return true;
    }),
  body('email').custom((value, { req }) => {
    if (!value.includes('@')) {
      throw new Error("L'adresse email doit contenir le symbole '@'");
    }
    return true;
  }),
  body('user_type')
    .isIn(['Student', 'Tutor'])
    .withMessage("Le type d'utilisateur doit être Student ou Tutor"),
];

module.exports = {
  signupValidationRules,
};
