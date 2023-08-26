const jwt = require('jsonwebtoken')
const secretKey = process.env.TOKEN_SECRET_KEY


// const jwt = require('jsonwebtoken');
// const secretKey = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  console.log('autorisationHeader:',authorizationHeader);
  if (!authorizationHeader) {
    return res.status(403).json({ error: 'Token manquant. Vous devez être authentifié pour accéder à cette ressource.' });
  }

  const token = authorizationHeader.split(' ')[1];
  

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token invalide. Veuillez vous reconnecter.' });
    }
    req.user = decoded;
    next();
  });
};

// module.exports = (req, res, next) => {
//     const token = req.headers['Authorization'];
//     const {
//       headers: { authorization },
//     } = req;
  
//     if (authorization && authorization.split(' ')[0] === 'Bearer') {
//       return authorization.split(' ')[1];
//     }
  
//     if (!token) {
//       return res.status(403).json({ error: 'Token manquant. Vous devez être authentifié pour accéder à cette ressource.' });
//     }
//   // fonction de rappel pour effectuer une verification asynchrone du token
//   // Préferable pour eviter les blocages du derveur lors de l'attente d'une operation de decodage synchrone.
//     jwt.verify(token, secretKey , (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ error: 'Token invalide. Veuillez vous reconnecter.' });
//       }
//       req.user = decoded;
//       next();
//     });
//   };