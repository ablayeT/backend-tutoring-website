module.exports = (req, res, next) => {
  if (req.user && req.user.user_type === 'Student') {
    next();
  } else {
    res
      .status(403)
      .json({ error: "Accès refusé. Vous n'êtes pas un étudiant." });
  }
};
