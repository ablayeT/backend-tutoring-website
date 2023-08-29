const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const knex = require('knex')(require('../knexfile')['development']);

const app = express();
app.use(express.json());

const token_secret_key = process.env.TOKEN_SECRET_KEY



exports.signup = async (req,res,next)=> {
    const { first_name,last_name, email, password, user_type } = req.body; 
    try {
      //verifier si l'utlisateur existe déja& dans la base de donnée 
      const userExist = await knex('users').where('email', email).first();
      if(userExist){
        return res.status(400).json({ error : 'Un utilisateur avec cette adresse email existe déjà'}); 
      }
      // Hasher le mot de passe avant l'enregistrement dans la base de donnée
      const hashedPassword  = await bcrypt.hash(password, 10);

      // enregister le nouvel utilisateur dans la base de données
      const newUser =  await knex('users').insert({first_name,last_name, email, password : hashedPassword, user_type});
      res.status(201).json({message : 'Utilisateur enregistré avec succés', id: newUser[0]});
    } catch (error) {
      res.status(500).json({error: "Erreur lors de l'enregistrement de l'utilisateur"});
    }
    next();
  }

exports.login  =  async (req, res, next)=>{
    const {email, password} = req.body; 

    try {
// Verifier si l'utilisateur existe dans la base de donnéé
const user = await knex('users').where('email', email).first();  
      if(!user) {
      return res.status(401).json({error : 'Adresse email ou mot de passe incorrect1'});
    } 
// Verifier si le mot de passe est correcte en comparant le hash stocké
    const isPasswordMatch = await bcrypt.compare(password, user.password); 
    if(!isPasswordMatch) {
      return res.status(401).json({error: 'Adresse email ou mot de passe incorrecte2'});
    }

// Gérer un jeton d'authenisafication (JWT) pour l'utilisteur
    const token = jwt.sign({id: user.id, user_type:user.user_type, email: user.email},  token_secret_key, {expiresIn : '24h' }); 

    res.json({ message: 'Connexion réussie',userId:user.id,userType:user.user_type, token}); 
    }catch(error) {
      res.status(500).json({error: "Erreur lors de la connexion de l'utilsateur"});
    }
  }

  exports.changePassword = async(req, res) =>{
    const  {oldPassword, newPassword} = req.body;   
    const userId = req.user.id; 

    try {
      // Verifier si l'utilisateur existe dans la base de donnée
      const user = await knex('users').where({'id': userId}).first(); 
      if(!user) {
        return res.status(400).json({error : "Utilisateur non trouvé"}); 
      }

      // Verifer si l'ancien mot de passe correspond au mot de passe stocké dans la base de donnée
      const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)
      // si le oldPassword fourni ne correspond pas au mot de passe actuel, renvoyer une erreur
      if(oldPassword && !isPasswordMatch) {
        return res.status(401).json({error: 'Ancien mot de passe incorrecte'}); 
      }

      // Gerer le hashage pour le nouveau mot de passe 
      const  hashedPassword = await bcrypt.hash(newPassword, 10);

      // Mettre à jour le mot de passe dans la base de donnée
      await knex('users').where({id: userId}).update({password: hashedPassword}); 

      return res.json({message: 'Mot de passe modifier avec succès'});

    }catch(error) {
      return res.status(500).json({error: 'Mise à jour du mot de passe incorrecte'});
    }
  }

  exports.logout = (req, res) => {
    // Supprimez simplement le token du client (dans ce cas, du stockage local)
    // Cela signifie que l'utilisateur est déconnecté
    //  pas besoin de vérifier le token ici
    //  pas nécessaire de renvoyer une réponse JSON, car le client ne se soucie généralement pas de la réponse de déconnexion
    res.clearCookie('token'); // Supprimez le cookie s'il existe
    res.status(200).send('Déconnexion réussie');
  };
  
  // Fonction pour réinitialiser le mot de passe 

  exports.resetPassword = async (req, res) =>{
    const {email, newPassword} = req.body; 

    try {
      //verifier si l'utlisateur existe dans la base de donnée
      const user = await knex('users').where({email}).first(); 
      if(!user) {
        return res.status(400).json({error : "Utilisateur non trouvé"});
      }

      // Générer le hashage pour le nouveau mot de passe
      const hashedPassword = await bcrypt.hash(newPassword, 10); 

      // Mettre à jour le mot de passe dans la base de données
      await knex('users').where({email}).update({password: hashedPassword});

      return res.json({message : "Mot de passe réinitialisé avec succès"})
    }catch(error) {
      return res.status(500).json({error : "Réinitialisation du mot de passe incorrecte"}); 
    }
  }

  exports.authCurrent = async (req, res) => {
    console.log('authCurrent')
   return  res.json({isLoggedIn : true})
}