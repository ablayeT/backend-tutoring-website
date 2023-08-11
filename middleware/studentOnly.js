module.exports =(req, res, next) => {
    if (req.user && req.user_type === "student") {
        // autoriser l'accés
        next(); 
    }else {
        res.status(403).json({error: "Accès refusé. Vous n'êtes pas un étudiant."});
    }

}
