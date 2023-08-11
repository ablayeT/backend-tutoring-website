const express = require('express');
const knex = require('knex')(require('../knexfile')['development']);

const app = express();
app.use(express.json());

exports.getAllStudentProfile = async (req, res) => {
try {
    const students = await knex('profiles').where({ type: 'student' }).select('*');
    // const students  = await knex('profiles')
    // .join('users', 'profiles.user_id', 'users.id')
    //   .select('users.id', 'users.name', 'profiles.photo', 'profiles.skills', 'profiles.experience', 'profiles.hourly_rate')
    //   .where('users.type', 'student');

      res.json(students); 
}catch(error) {
    console.error('Erreur lors de la récuperation du profil des étudiants'); 
    res.status(500).json({message : 'Erreur lors de la récuperation des profiles des étudiants'});
}
}

exports.createStudentProfile = async (req, res, next)=> {
    const {user_id, photo} = req.body;

    try {
// Vérifier si l'utilisateur existe dans la base de donnée
const user = await knex('users').where('id', user_id).first(); 
if(!user) {
    return res.status(404).json({error : 'Utilisateur non trouvé'});
}

// Créer le profil de l'étudiant
const newStudent = await knex('profiles').insert({user_id, photo,  field_of_study, year_of_study,type: 'student'});
res.status(201).json({ message: 'Profil étudiant créé avec succés', id: newStudent[0]});

    } catch(error) {
        res.status(500).json({error: "Erreur lors de la création du profil étudiant"});
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    next(); 
}

// Route pour créer le profil d'un tuteur

exports.createTutorProfile = async (req, res, next) =>{
    const {user_id, photo, skills, experience, hourly_rate} = req.body; 
    
    try {
// vérifier si l'utilisateur existe dans la base de donnée. 
    const user  = await knex('users').where('id', user_id).first(); 
    if(!user) {
        res.status(404).json({error: 'Utilisateur non trouvé'}); 
// créer le profil du tuteur
    const newTutor = await knex('profiles').inser({
        user_id,
        photo,
        skills,
        experience,
        hourly_rate,
        type: 'tutor',
    });
    res.status(201).json({message: 'Profil tuteur créé avec succés', id: newTutor[0]});
    }
    } catch(error) {
    res.status(500).json({error: 'Erreur lors de la création du profil tuteur'}); 
    }
}