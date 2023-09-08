const express = require('express');
const knex = require('knex')(require('../knexfile')['development']);
// const multerUpload = require('../middleware/multer.config');

const app = express();
app.use(express.json());

exports.getOneProfile = async (req, res, next) => {
  const { id } = req.params;
  try {
    // Récupérer le profil de l'étudiant depuis la table student_profiles
    const profile = await knex('tutor_profiles').where('user_id', id).first();

    if (!profile) {
      return res.status(400).json({ error: 'Profil tuteur non trouvé' });
    }

    return res.json({ profile });
  } catch (error) {
    console.error('Error lors de la récupération du profil du tuteur:', error);
    res
      .status(500)
      .json({ message: 'Error lors de la récupération du profil du tuteur.' });
  }
};

exports.createTutorProfile = async (req, res, next) => {
  const { id } = req.params;
  const { skills, experience, hourly_rate, availability } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await knex('users').where('id', id).first();
    //   console.log('utilisateur:',user)
    if (!user) {
      return res.status(400).json({ error: 'Utilisateur non trouvé' });
    }

    // Vérifier si le profil de cet utilisateur existe déjà
    const existingProfile = await knex('tutor_profiles')
      .where('user_id', id)
      .first();
    if (existingProfile) {
      return res.status(400).json({
        error:
          'Le profil de cet utilisateur existe déjà dans la base de données',
      });
    }

    // Créer le profil tuteur dans la table tutor_profiles
    const imageUrl = req.file.filename;

    await knex('tutor_profiles').insert({
      user_id: id,
      imageUrl,
      skills,
      experience,
      hourly_rate,
      availability,
    });

    return res.json({ message: 'Profil du tuteur créé avec succès' });
  } catch (error) {
    return res.status(500).json({
      error: 'Une erreur est survenue lors de la création du profil du tuteur',
    });
  }
};

exports.updateTutorProfile = async (req, res, next) => {
  // Récupérer l'ID de l'utilisateur depuis le token
  const userId = req.user.id;

  // Récupérer les données du formulaire de mise à jour du profil
  const { skills, experience, hourly_rate, availability } = req.body;

  try {
    // Vérifier si le profil de l'utilisateur existe
    const existingProfile = await knex('tutor_profiles')
      .where('user_id', userId)
      .first();
    if (!existingProfile) {
      return res
        .status(404)
        .json({ error: "Le profil de l'utilisateur n'existe pas" });
    }

    // Mettre à jour les informations du profil
    await knex('tutor_profiles')
      .where('user_id', userId)
      .update({ skills, experience, hourly_rate, availability });

    return res.json({ message: 'Profil du tuteur mis à jour avec succès' });
  } catch (error) {
    return res.status(500).json({
      error:
        'Une erreur est survenue lors de la mise à jour du profil du tuteur',
    });
  }
};

exports.getTutorSessions = async (req, res, next) => {
  try {
    const tutorId = req.user.id;

    // Recuperer les sessions de tutotat réservées par le tuteur
    const tutorSessions = await knex('tutoring_sessions')
      .where('tutor_id', tutorId)
      .select(
        'tutoring_sessions.id',
        'subjects.name',
        'subjects.description',
        'tutoring_sessions.date',
        'tutoring_sessions.start_time',
        'tutoring_sessions.end_time',
        'tutoring_sessions.location',
        'tutoring_sessions.price',
      )
      .leftJoin('subjects', 'tutoring_sessions.subject_id', 'subjects.id'); // Joindre table des matières  pour obtenir le nom.

    // console.log(tutorSessions);
    return res.json({ sessions: tutorSessions });
  } catch (error) {
    // console.log('Erreur:',error);
    return res.status(500).json({
      error: 'Erreur lors de la recuperation des sessions de tutora.',
    });
  }
};

//  exports.deleteSession  = async (req, res, next) => {
//     const {id} = req.params;

//     try {
// Verifier si la session existe dans la base de donnée
//         const session = await knex('tutoring_sessions').where('id', id).first();
//         if(!session) {
//             return res.status(400).json({error: 'Session de mentorat non existante'})
//         }
// supprimer la session de mentorat
//         await knex('tutoring_sessions').where('id', id).del()
//     }catch (error) {
//         return res.status(500).json({error: 'Erreur lors de la suppresion de la session de mentorat'})
//     }

//  }

exports.updateSession = async (req, res, next) => {
  const sessionId = req.params.id;
  const { date, start_time, end_time, location, price } = req.body;

  try {
    // Vérifier si la session existe dans la base de données
    const session = await knex('tutoring_sessions')
      .where('id', sessionId)
      .first();
    if (!session) {
      return res.status(400).json({ error: 'Session de tutorat non trouvée' });
    }

    // Vérifier les autorisations du tuteur
    if (session.tutor_id !== req.user.id) {
      return res.status(403).json({
        error: 'Vous n"êtes pas autorisé à modifier cette session de tutorat',
      });
    }

    // Mettre à jour les informations de la session
    await knex('tutoring_sessions').where('id', sessionId).update({
      date: date,
      start_time: start_time,
      end_time: end_time,
      location: location,
      price: price,
    });

    return res.json({ message: 'Session de tutorat mise à jour avec succès' });
  } catch (error) {
    return res.status(500).json({
      error: 'Erreur lors de la mise à jour de la session de tutorat',
    });
  }
};

exports.createTutoringSession = async (req, res, next) => {
  const { tutor_id, subject_id, date, start_time, end_time, location, price } =
    req.body;
  // console.log('req.body:', req.body);

  try {
    // Vérifier si le tuteur existe dans la base de données
    const tutor = await knex('users')
      .where({ id: tutor_id, user_type: 'Tutor' })
      .first();
    if (!tutor) {
      return res.status(400).json({ error: 'Tuteur non existant' });
    }

    // Vérifier si la matière existe dans la base de données
    const subject = await knex('subjects').where({ id: subject_id }).first();
    if (!subject) {
      return res.status(400).json({ error: 'Matière non existante' });
    }

    // Créer la nouvelle session de tutorat dans la table tutoring_sessions
    const newSession = {
      tutor_id: tutor_id,
      subject_id: subject_id,
      date: date,
      start_time: start_time,
      end_time: end_time,
      location: location,
      price: price,
    };
    // console.log('newSession:', newSession);

    await knex('tutoring_sessions').insert(newSession);
    return res.json({ message: 'Session de tutorat créée avec succès' });
  } catch (error) {
    // console.error(error);
    return res
      .status(500)
      .json({ error: 'Erreur lors de la création de la session de tutorat' });
  }
};

exports.deleteTutoringSession = async (req, res, next) => {
  const sessionId = req.params.id;

  try {
    // verifier si la session existe dans la base de données
    const session = await knex('tutoring_sessions')
      .where('id', sessionId)
      .first();
    if (!session) {
      return res.status(400).json({ error: 'Session de tutorat non trouvée' });
    }
    // supprimer la session de tutorat
    await knex('tutoring_sessions').where('id', sessionId).del();

    return res.json({ message: 'Session de tutorat supprimée avec succès' });
  } catch (error) {
    return res.status(500).json({
      error: 'Erreur lors de la suppression de la session de tutorat',
    });
  }
};

// Récupérer la liste des matières disponibles pour les tuteurs
exports.getAvailableSubjects = async (req, res, next) => {
  try {
    const subjects = await knex('subjects').select(
      'id',
      'name',
      'level',
      'description',
    );

    return res.json({ subjects });
  } catch (error) {
    return res.status(500).json({
      error: 'Erreur lors de la recuperation des matières disponible ',
    });
  }
};

exports.getAllSessions = async (req, res, next) => {
  // console.log(res);
  try {
    const sessionsWithTutors = await knex
      .select(
        'tutoring_sessions.*',
        'tutor_profiles.imageUrl',
        'users.first_name',
        'users.last_name',
      )
      .from('tutoring_sessions')
      .join(
        'tutor_profiles',
        'tutoring_sessions.tutor_id',
        'tutor_profiles.user_id',
      )
      .join('users', 'tutoring_sessions.tutor_id', 'users.id');
    // console.log(sessionsWithTutors);
    // console.log(sessionsWithTutors);
    res.json(sessionsWithTutors);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error:
        'Erreur lors de la recuperation des toutes les sessions de tutorat',
    });
  }
};
