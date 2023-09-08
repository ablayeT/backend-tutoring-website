const jwt = require('jsonwebtoken');
const secretKey = process.env.TOKEN_SECRET_KEY;

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  if (!authorizationHeader) {
    return res.status(403).json({
      error:
        'Token manquant. Vous devez être authentifié pour accéder à cette ressource.',
    });
  }

  const token = authorizationHeader.split(' ')[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ error: 'Token invalide. Veuillez vous reconnecter.' });
    }
    req.user = decoded;
    next();
  });
};
