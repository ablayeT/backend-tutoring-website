const express = require('express');
const knex = require('knex')(require('../knexfile')['development']);

const app = express();
app.use(express.json());

// Afficher le profil d'un utilisateur spécifié par son ID
exports.getOneProfile = async (req, res, next) => {
  const { id } = req.params;
  try {
    // verifier le type d'utilisateur en fonction de l'ID fourni
    const user = await knex('users').where('id', id).first();
    if (!user) {
      return res.status(400).json({ error: 'Utilisateur non trouvé' });
    }

    let profile;
    if (user.user_type === 'student') {
      profile = await knex('student_profiles').where('user_id', id).first();
    } else if (user.user_type === 'tutor') {
      profile = await knex('tutor_profiles').where('user_id', id).first();
    }
    return res.json({ user, profile });
  } catch (error) {
    console.error('Error lors de la récuperation des utilisateurs:', error);
    res
      .status(500)
      .json({ message: 'Error lors de la recuraptiion du profile.' });
  }
  next();
};

// Mettre à jour le profil d'un utilisateur en fournissant les details.

exports.updateOneProfile = async (req, res, next) => {
  const { id } = req.params;
  const {
    skills,
    experience,
    hourly_rate,
    availability,
    grade_level,
    major,
    school_name,
  } = req.body;
  // Définir une variable imageUrl vide
  let imageUrl;
  // Verifier si e fichier a été telechargé et mettre à jour imageUrl en consequence
  if (req.file) {
    imageUrl = req.file.path;
  }

  try {
    // verifier si l'utilsateur existe dans la base de donnée
    const user = await knex('users').where('id', id).first();
    if (!user) {
      return res.status(400).json({ error: 'Utiisateur non trouvé' });
    }
    // verifier le type d'utilisateur/ mettre à jour son profil
    if (user.user_type === 'student') {
      await knex('student_profiles').where('user_id', id).update({
        imageUrl,
        skills,
        experience,
        grade_level,
        major,
        school_name,
      });
    } else if (user.user_type === 'tutor') {
      await knex('tutor_profiles')
        .where('user_id', id)
        .update({ imageUrl, skills, experience, hourly_rate, availability });
    } else {
      return res.status(400).json({ error: "Type d'utlisateur invalide" });
    }

    return res.json({ message: 'Profil mise à jour avec succcès' });
  } catch (error) {
    return res.status(500).json({
      error: 'Une erreur est survenue lors de la mise à jour du profil.',
    });
  }
};

// Supprimer le profil d'un utilisateur en fonction de son ID
exports.deleteProfile = async (req, res, next) => {
  const { id } = req.params;

  try {
    // verifier si l'utilisateur existe dans la base de donnée
    const user = await knex('users').where('id', id).first();
    if (!user) {
      return res.status(400).json({ error: 'Utilisateur non trouvé' });
    }

    // supprimer le profil de l'utilisateur en fonction de son type.
    if (user.user_type === 'student') {
      await knex('student_profiles').where('user_id').del();
    } else if (user.user_type === 'tutor') {
      await knex('tutor_profiles').where('user_id').del();
    }

    // supprimer l'utilisateur de la table des utilisateurs
    await knex('users').where('id', id).del();

    return res.json({ message: 'Profil supprimé avec succés' });
  } catch (error) {
    return res.status(500).json({
      error: 'Une erreur est survenue lors de la suppression du profil',
    });
  }
};

// Récupérer la liste de tous les profils ou des profils filtrés par type d'utilisateur (étudiant ou tuteur)
exports.getProfiles = async (req, res, next) => {
  const { userType } = req.query;

  try {
    let profilesQuery = knex('users');

    if (userType) {
      profilesQuery = profilesQuery.where('user_type', userType);
    }

    const profiles = await profilesQuery
      .leftJoin('student_profiles', 'users.id', '=', 'student_profiles.user_id')
      .leftJoin('tutor_profiles', 'users.id', '=', 'tutor_profiles.user_id')
      .select(
        'users.id',
        'users.full_name',
        'users.email',
        'users.user_type',
        'student_profiles.imageUrl as student_imageUrl',
        'student_profiles.skills as student_skills',
        'student_profiles.experience as student_experience',
        'student_profiles.grade_level as student_grade_level',
        'student_profiles.major as student_major',
        'student_profiles.university as student_university',
        'tutor_profiles.imageUrl as tutor_imageUrl',
        'tutor_profiles.skills as tutor_skills',
        'tutor_profiles.experience as tutor_experience',
        'tutor_profiles.hourly_rate',
        'tutor_profiles.availability',
      )
      .groupBy('users.id');

    return res.json({ profiles });
  } catch (error) {
    return res.status(500).json({
      error: 'Une erreur est survenue lors de la recuperation des profils',
    });
  }
};

// Créer le profil d'un utilisateur en fournissant les détails
exports.createProfile = async (req, res, next) => {
  const { id } = req.params;
  const { userType } = req.query; // recuperer le type d'utilsateur depuis le paramertre de la requete

  // verifier que le type d'utilisateur est valide
  if (userType !== 'student' && userType !== 'tutor') {
    return res.status(400).json({ error: 'Type d"utilisteur invalide1' });
  }
  const {
    skills,
    experience,
    hourly_rate,
    availability,
    grade_level,
    major,
    university,
  } = req.body;

  try {
    // verifier si l'utilisateur existe
    const user = await knex('users').where('id', id).first();
    if (!user) {
      return res.status(400).json({ error: 'Utilisateur non trouvé' });
    }

    // verifier si le profil de cet utilsateur existe déjà
    const existingProfile =
      userType === 'student'
        ? await knex('student_profiles').where('user_id', id).first()
        : await knex('tutor_profiles').where('user_id', id).first();

    if (existingProfile) {
      return res
        .status(400)
        .json({ error: 'Le profile de cet utilisateur existe déjà' });
    }

    // Créer le profil dans la table appopriée en fonction du type d'utilisateur
    const imageUrl = req.file.filename;
    if (userType === 'student') {
      await knex('student_profiles').insert({
        user_id: id,
        imageUrl,
        skills,
        experience,
        grade_level,
        major,
        university,
      });
    } else if (userType === 'tutor') {
      await knex('tutor_profiles').insert({
        user_id: id,
        imageUrl,
        skills,
        experience,
        hourly_rate,
        availability,
      });
    }

    return res.json({ message: 'Profil créé avec succés' });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Une erreur est survenue lors de la creation du profil' });
  }
};

exports.updateUserProfileImage = async (req, res) => {
  // Extraire les données de la requête
  console.log('req.file:', req.file);
  const { userType, userId } = req.params;

  try {
    let profileTable;

    // Vérifiez le type d'utilisateur pour déterminer la table à utiliser
    if (userType === 'Tutor') {
      profileTable = 'tutor_profiles';
    } else if (userType === 'Student') {
      profileTable = 'student_profiles';
    } else {
      // Si le type d'utilisateur n'est pas valide, retournez une erreur
      return res.status(400).json({ error: "Type d'utilisateur non valide" });
    }

    // Vérifiez si l'utilisateur existe dans la table correspondante
    const userExists = await knex(profileTable)
      .where({ user_id: userId })
      .first();

    if (!userExists) {
      // Si l'utilisateur n'est pas trouvé, retournez une erreur
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Mettre à jour l'URL de l'image de profil dans la table appropriée
    const response = await knex(profileTable)
      .where({ user_id: userId })
      .update({ imageUrl: req.file.filename });

    // Répondre avec un message de succès et les détails de la mise à jour
    return res.status(200).json({
      message: 'Image de profil mise à jour avec succès',
      updatedProfile: {
        userType,
        userId,
        imageUrl: req.file.filename,
      },
    });
  } catch (error) {
    // Gérer les erreurs en cas d'échec de la mise à jour
    console.error("Erreur lors de la mise à jour de l'image de profil", error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de l'image de profil" });
  }
};
