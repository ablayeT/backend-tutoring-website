module.exports = (req, res, next) => {
  if (req.user && req.user.user_type === 'Tutor') {
    next();
  } else {
    return res
      .status(403)
      .json({ error: "Accès refusé, vous n'êtes pas un tuteur" });
  }
};
