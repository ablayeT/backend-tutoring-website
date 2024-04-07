const express = require('express');
const knex = require('knex')(require('../knexfile')['development']);
const moment = require('moment');

const app = express();
app.use(express.json());

exports.getOneProfile = async (req, res, next) => {
  const { id } = req.params;
  try {
    // vérifier si l'utilisateur existe dans la base de données
    const profile = await knex('student_profiles').where('user_id', id).first();
    if (!profile) {
      return res.status(400).json({ error: 'Profil d"étudiant non trouvé' });
    }

    return res.json(profile);
  } catch (error) {
    console.error('error :', error);
    return res.status(500).json({
      error: 'Une erreur est survenue lors de la récupération du profil',
    });
  }
};

exports.createStudentProfiles = async (req, res, next) => {
  const { id } = req.params;
  const { skills, experience, grade_level, major, school_name } = req.body;
  try {
    // verifier si l'utilisateur existe dans la base de donnée
    const user = await knex('users').where('id', id).first();
    if (!user) {
      return res.status(400).json({ error: 'Utilisateur non trouvé' });
    }

    //Verifier si le profil de cet utilisateur existe déjà
    const existingProfile = await knex('student_profiles')
      .where('user_id', id)
      .first();
    if (existingProfile) {
      return res
        .status(400)
        .json({ error: 'Le profil de cet utilisateur existe déjà' });
    }

    //créer le profil etudiant dans la table student_profiles
    const imageUrl = req.file.filename;
    await knex('student_profiles').insert({
      user_id: id,
      imageUrl,
      skills,
      experience,
      grade_level,
      major,
      school_name,
    });

    return res.json({ message: 'Profil étudiant créé avec succès' });
  } catch (error) {
    return res.status(500).json({
      error:
        'Une erreur est survenue lors de la création du profil de l"étuddiant',
    });
  }
};

exports.updateStudentProfile = async (req, res, next) => {
  // Récupérer l'ID de l'utilisateur depuis le token
  const userId = req.user.id;

  // Récupérer les données du formulaire de mise à jour du profil
  const { skills, experience, grade_level, major, school_name } = req.body;

  try {
    // Vérifier si le profil de l'utilisateur existe
    const existingProfile = await knex('student_profiles')
      .where('user_id', userId)
      .first();
    if (!existingProfile) {
      return res
        .status(404)
        .json({ error: "Le profil de l'utilisateur n'existe pas" });
    }

    // Mettre à jour les informations du profil
    await knex('student_profiles')
      .where('user_id', userId)
      .update({ skills, experience, grade_level, major, school_name });

    return res.json({ message: 'Profil du tuteur mis à jour avec succès' });
  } catch (error) {
    return res.status(500).json({
      error:
        'Une erreur est survenue lors de la mise à jour du profil de l"étudiant',
    });
  }
};

//Laisser une evaluation et un commentaire sur un tuteur en tant qu'étudiant
exports.rateCommentTutor = async (req, res, next) => {
  const { tutorId } = req.params;
  const { rating, comment } = req.body;

  try {
    // verifier si le tuteur existe dans la base de donnée
    const tutor = await knex('users').where({ id: tutorId }).first();
    if (!tutor) {
      return res.status(400).json({ error: 'Tutor non existant' });
    }
    // verifier si l'utisateur qui laisse l'evaluation est un étudiant
    const student = await knex('users').where({ id: req.user.id }).first();
    if (!student || student.user_type !== 'student') {
      return res.status(400).json({
        error: 'Vous devez être un étudiant pour laisser une évaluaition',
      });
    }
    //Inserer l'valuation dans la table des evaluations et commentaire
    const ratingCommentData = {
      student_id: req.user.id,
      tutor_id: tutorId,
      rating: parseFloat(rating),
      comment: comment,
    };

    await knex('rating_comments').insert(ratingCommentData);

    return res.json({
      message: 'Evaluation et commentaire ajouté avec succès',
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la soumission de l'évaluation et commentaire",
    });
  }
};

// Reserver une session de tutorat
exports.bookSession = async (req, res, next) => {
  try {
    const {
      student_id,
      tutoring_session_id,
      date,
      start_time,
      end_time,
      subject,
      price,
      status,
    } = req.body;
    // Insérez les données dans la table 'student_sessions'
    const result = await knex('student_sessions').insert({
      student_id,
      tutoring_session_id,
      date,
      start_time,
      end_time,
      subject,
      price,
      status,
    });

    if (result) {
      const reservedSession = await knex('student_sessions')
        .where('id', result[0]) // result[0] contient l'ID de la session réservée
        .first();
      res.status(201).json({
        message: 'Session réservée avec succès',
        session: reservedSession,
      });
    } else {
      res.status(500).json({ error: 'Échec de la réservation de session' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la réservation de session' });
  }
};

// récupérer les sessions réservées par l'étudiant
exports.getStudentSessions = async (req, res, next) => {
  const studentId = req.user.id; // Assurez-vous que vous avez accès à l'ID de l'étudiant de manière appropriée

  try {
    const studentSessions = await knex('student_sessions')
      .select(
        'student_sessions.id',
        'users.first_name as first_name',
        'users.last_name as last_name',
        'tutor_profiles.imageUrl as imageUrl',
        'tutoring_sessions.date', // Ajout de la colonne date
        'tutoring_sessions.start_time', // Ajout de la colonne start_time
        'tutoring_sessions.end_time', // Ajout de la colonne end_time
        'tutoring_sessions.location', // Ajout de la colonne location
        'tutoring_sessions.price', // Ajout de la colonne price
        'subjects.name as subject_name',
        'subjects.description as subject_description',
      )
      .where('student_id', studentId)
      .join(
        'tutoring_sessions',
        'student_sessions.tutoring_session_id',
        'tutoring_sessions.id',
      )
      .join('users', 'tutoring_sessions.tutor_id', 'users.id')
      .join(
        'tutor_profiles',
        'tutoring_sessions.tutor_id',
        'tutor_profiles.user_id',
      )
      .join('subjects', 'tutoring_sessions.subject_id', 'subjects.id')
      .groupBy(
        'student_sessions.id',
        'users.first_name',
        'users.last_name',
        'tutor_profiles.imageUrl',
        'tutoring_sessions.date',
        'tutoring_sessions.start_time',
        'tutoring_sessions.end_time',
        'tutoring_sessions.location',
        'tutoring_sessions.price',
        'subjects.name',
        'subjects.description',
      );

    studentSessions.forEach((session) => {
      session.date = moment(session.date).format('DD/MM/YYYY');
    });

    console.log('studentSessions: ', studentSessions);
    res.json(studentSessions);
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des sessions réservées :',
      error,
    );
    res.status(500).json({
      error: 'Erreur lors de la récupération des sessions réservées',
    });
  }
};

exports.cancelReservedSession = async (req, res, next) => {
  try {
    // Récuperatin de l'id de la session de puis le corps de la requête
    const sessionId = req.body.sessionId;
    console.log('req.body:', req.body);

    // Vérifier si la session existe dans la base de données
    const session = await knex('student_sessions')
      .where('tutoring_session_id', sessionId)
      .orWhere('id', sessionId)
      .first();

    if (!session) {
      return res.status(404).json({ error: 'session introuvable' });
    }

    // Verifie si la session est déjà annulée
    if (session.status === 'canceled') {
      return res.status(400).json({ error: 'La session est déjà annulée' });
    }

    //Metttre à jour la base de donnée pour marquer la session comme annulée :'canceled

    await knex('student_sessions')
      .where('tutoring_session_id', sessionId)
      .orWhere('id', sessionId)
      .delete();

    // réponse en cas de succès
    return res.status(200).json({ message: 'Session annulée avec succès' });
  } catch (error) {
    console.error("Erreur lors de l'annulation de la session : ", error);
  }
  return res
    .status(500)
    .json({ error: "Erreur lors de l'annulation de la sessionn" });
};

exports.getStudentReservedSessions = async (req, res, next) => {
  const { studentId } = req.params;
  console.log('studentId : ', studentId);
  try {
    const studentSessions = await knex('student_sessions')
      .select('tutoring_sessions.*')
      .join(
        'tutoring_sessions',
        'student_sessions.tutoring_session_id',
        '=',
        'tutoring_sessions.id',
      )
      .where('student_sessions.student_id', studentId);

    console.log('studentSessions : ', studentSessions);
    res.json({ sessions: studentSessions });
  } catch (err) {
    console.error('Erreur lors de la récupération de la session');
    res
      .status(500)
      .json({ error: 'Erreur lors de la récupération de la session' });
  }
};
