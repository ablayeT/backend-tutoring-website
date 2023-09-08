module.exports = (req, res, next) => {
  console.log('req.user:', req.user);
  console.log(req.user.user_type);
  if (req.user && req.user.user_type === 'Tutor') {
    next();
  } else {
    return res
      .status(403)
      .json({ error: "Accès refusé, vous n'êtes pas un tuteur" });
  }
};
