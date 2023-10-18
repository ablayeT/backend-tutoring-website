const express = require('express');
const knex = require('knex')(require('../knexfile')['development']);
// const multerUpload = require('../middleware/multer.config');

const Session = require('../models/session');

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

exports.getAllSessionsWithStudents = async (req, res, next) => {
  try {
    const tutorId = req.user.id;
    // console.log('tutorId :', tutorId);

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

    // console.log('tutoring_sessions :', tutorSessions);
    // Pour chaque session, récupérez la liste des étudiants qui ont réservé
    const sessionsWithStudents = await Promise.all(
      tutorSessions.map(async (session) => {
        const students = await knex('student_sessions')
          .select('users.first_name', 'users.last_name')
          .select('student_profiles.imageUrl')
          .join('users', 'student_sessions.student_id', 'users.id')
          .leftJoin(
            'student_profiles',
            'student_sessions.student_id',
            'student_profiles.user_id',
          )
          .where('student_sessions.tutoring_session_id', session.id);

        return { ...session, students };
      }),
    );
    // console.log('sessionWithStudents :', sessionsWithStudents);
    return res.json({ sessions: sessionsWithStudents });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      error: 'Erreur lors de la recuperation des sessions de tutora.',
    });
  }
};

exports.updateSessionStatus = async (req, res, next) => {
  const { sessionId } = req.params;
  const { status } = req.body;

  try {
    // Mettreà jour le statut de la session dans la base de données
    await knex('tutoring_sessions').where({ id: sessionId }).update({ status });

    res
      .status(200)
      .json({ message: 'Statut de la session mis à jour avec succès' });
  } catch (error) {
    console.error(
      'Erreur lors de la mise à jour du statut de la session :',
      error,
    );
    res
      .status(500)
      .json({ error: 'Erreur lors de la mise à jour du statut de la session' });
  }
};

// exports.getAllSessionsWithStudents = async (req, res, next) => {
//   try {
//     const tutorId = req.user.id;

//     const sessionsWithTutors = await knex
//       .select(
//         'tutoring_sessions.*',
//         'tutor_profiles.imageUrl',
//         'users.first_name as tutor_first_name',
//         'users.last_name as tutor_last_name',
//         'subjects.name as subject_name',
//         'subjects.description as subject_description',
//       )
//       .from('tutoring_sessions')
//       .join(
//         'tutor_profiles',
//         'tutoring_sessions.tutor_id',
//         'tutor_profiles.user_id',
//       )
//       .join('users', 'tutoring_sessions.tutor_id', 'users.id')
//       .join('subjects', 'tutoring_sessions.subject_id', 'subjects.id')
//       .join('tutoring_sessions.tutor_id', tutorId);

//     const sessionswithStudents = await Promise.all(
//       sessionsWithTutors.map(async (session) => {
//         const students = await knex('student_sessions')
//           .select('users.first_name', 'users.last_name')
//           .join('users', 'student_sessions.student_id', 'users.id')
//           .where('student_sessions.tutoring_session_id', session.id);

//         return { ...session, students };
//       }),
//     );

//     res.json(sessionsWithTutors);
//   } catch (error) {
//     return res.status(500).json({
//       error:
//         'Erreur lors de la recuperation des toutes les sessions de tutorat',
//     });
//   }
// };

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
  console.log('req.body:', req.body);
  try {
    // Vérifier si le tuteur existe dans la base de données
    const tutor = await knex('users')
      .where({ id: tutor_id, user_type: 'Tutor' })
      .first();
    console.log('tutor : ', tutor);

    if (!tutor) {
      return res.status(400).json({ error: 'Tuteur non existant' });
    }

    // Vérifier si la matière existe dans la base de données
    const subject = await knex('subjects').where({ id: subject_id }).first();
    if (!subject) {
      return res.status(400).json({ error: 'Matière non existante' });
    }
    console.log('subject :', subject);
    // Créer la nouvelle session de tutorat dans la table tutoring_sessions
    const sessionData = {
      tutor_id: tutor_id,
      subject_id: subject_id,
      date: date,
      start_time: start_time,
      end_time: end_time,
      location: location,
      price: price,
    };
    // Créer la session en utilisant le modèle Session
    const newSession = await Session.create(sessionData);
    console.log('newSession: ', newSession);

    return res.status(201).json({
      message: 'Session de tutorat créée avec succès',
      session: newSession,
    });
  } catch (error) {
    console.error(error);
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

exports.getStudentsBySessionId = async (req, res, next) => {
  const sessionId = req.params.id;

  try {
    // Récupérer les étudiants inscrits à la session spécifique en fonction de l'ID de la session
    const students = await knex('student_sessions')
      .where('tutoring_session_id', sessionId)
      .join('users', 'users.id', 'student_sessions.student_id')
      .select('users.*')
      .where('users.user_type', 'Student'); // Filtrer uniquement les étudiants

    return res.json(students);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error:
        'Erreur lors de la récupération des étudiants inscrits à cette session',
    });
  }
};

exports.getAllSessions = async (req, res, next) => {
  try {
    const sessionsWithTutors = await knex
      .select(
        'tutoring_sessions.*',
        'tutor_profiles.imageUrl',
        'users.first_name',
        'users.last_name',
        'subjects.name as subject_name',
        'subjects.description as subject_description',
      )
      .from('tutoring_sessions')
      .join(
        'tutor_profiles',
        'tutoring_sessions.tutor_id',
        'tutor_profiles.user_id',
      )
      .join('users', 'tutoring_sessions.tutor_id', 'users.id')
      .join('subjects', 'tutoring_sessions.subject_id', 'subjects.id');

    res.json(sessionsWithTutors);
  } catch (error) {
    return res.status(500).json({
      error:
        'Erreur lors de la recuperation des toutes les sessions de tutorat',
    });
  }
};
