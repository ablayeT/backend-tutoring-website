const knex = require('knex')(require('../knexfile')['development']);

// Rechercher des tuteurs en fonction des critères tels que la matière, le niveau d'enseignement, etc.
exports.searchTutors = async (req, res) => {
  const { skills, experience, hourly_rate, availability } = req.query;

  try {
    // créer une requête de base pour récupérer les tuteurs
    let tutorsQuery = knex('users')
      .join('tutor_profiles', 'users.id', '=', 'tutor_profiles.user_id')
      .select(
        'users.id',
        'users.full_name',
        'users.email',
        'tutor_profiles.imageUrl',
        'tutor_profiles.skills',
        'tutor_profiles.experience',
        'tutor_profiles.hourly_rate',
        'tutor_profiles.availability',
      );

    // filtrer les tuteurs en fonction des critères

    if (skills) {
      tutorsQuery = tutorsQuery.where(
        'tutor_profiles.skills',
        'like',
        `%${skills}%`,
      );
    }
    if (experience) {
      tutorsQuery = tutorsQuery.where(
        'tutor_profiles.experience',
        'like',
        `%${experience}%`,
      );
    }
    if (hourly_rate) {
      tutorsQuery = tutorsQuery.where(
        'tutor_profiles.hourly_rate',
        '<=',
        hourly_rate,
      );
    }
    if (availability) {
      tutorsQuery = tutorsQuery.where(
        'tutor_profiles.availability',
        'like',
        `%${availability}%`,
      );
    }

    // Exécuter la requête pour récupérer les tuteurs filtrés.
    const tutors = await tutorsQuery;

    res.json(tutors);
  } catch (error) {
    // console.error(error); // Affichez l'erreur exacte pour le débogage
    return res
      .status(500)
      .json({ error: 'Erreur lors de la recherche des tuteurs' });
  }
};

// Rechercher des étudiants en fonction des critères tels que les compétences, l'expérience, le niveau de grade et l'université
exports.searchStudents = async (req, res, next) => {
  const { skills, experience, grade_level, major, university } = req.query;

  try {
    // Créer une requête de base pour récupérer les étudiants
    let studentsQuery = knex('users')
      .join('student_profiles', 'users.id', '=', 'student_profiles.user_id')
      .select(
        'users.id',
        'users.full_name',
        'users.email',
        'student_profiles.imageUrl',
        'student_profiles.skills',
        'student_profiles.experience',
        'student_profiles.grade_level',
        'student_profiles.major',
        'student_profiles.university',
      );

    // Filtrer les étudiants en fonction des critères
    if (skills) {
      studentsQuery = studentsQuery.where(
        'student_profiles.skills',
        'like',
        `%${skills}%`,
      );
    }

    if (experience) {
      studentsQuery = studentsQuery.where(
        'student_profiles.experience',
        'like',
        `%${experience}%`,
      );
    }

    if (grade_level) {
      studentsQuery = studentsQuery.where(
        'student_profiles.grade_level',
        '=',
        grade_level,
      );
    }
    if (major) {
      studentsQuery = studentsQuery.where('student_profiles.major', '=', major);
    }

    if (university) {
      studentsQuery = studentsQuery.where(
        'student_profiles.university',
        'like',
        `%${university}%`,
      );
    }

    // Exécuter la requête pour récupérer les étudiants filtrés
    const students = await studentsQuery;

    return res.json(students);
  } catch (error) {
    return res.status(500).json({
      error: 'Une erreur est survenue lors de la recherche des étudiants',
    });
  }
};

exports.searchSessions = async (req, res) => {
  const { query } = req.query;
  console.log('query in searchSessions:', query);

  try {
    let knexQuery = await knex('tutoring_sessions')
      .select(
        'tutoring_sessions.id',
        'tutoring_sessions.date',
        'tutoring_sessions.start_time',
        'tutoring_sessions.end_time',
        'tutoring_sessions.location',
        'tutoring_sessions.price',
        'tutoring_sessions.status',
        'subjects.name as subject_name',
        'tutor_profiles.imageUrl as tutor_image',
        'users.first_name as tutor_first_name',
        'users.last_name as tutor_last_name',
      )
      .from('tutoring_sessions')
      .leftJoin('subjects', 'tutoring_sessions.subject_id', '=', 'subjects.id')
      .leftJoin(
        'tutor_profiles',
        'tutoring_sessions.tutor_id',
        '=',
        'tutor_profiles.user_id',
      )
      .leftJoin('users', 'tutor_profiles.user_id', '=', 'users.id');

    console.log('knexQuery après les jointures :', knexQuery.toString());

    if (query) {
      knexQuery = knexQuery
        .where('tutoring_sessions.location', 'like', `%${query}%`)
        .orWhere('subjects.name', 'like', `%${query}%`)
        .orWhere('users.first_name', 'like', `%${query}%`)
        .orWhere('users.last_name', 'like', `%${query}%`);
    }

    console.log(
      'knexQuery avant l’exécution de la requête :',
      knexQuery.toString(),
    );
    const sessions = await knexQuery;
    console.log('sessions :', sessions);

    res.json({ sessions });
  } catch (error) {
    console.log('Erreur lors de la rechercheee :', error);
    res.status(500).json({ error: 'Erreur lors de la recherche.' });
  }
};
