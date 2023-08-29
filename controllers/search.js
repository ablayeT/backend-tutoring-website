const knex = require('knex')(require('../knexfile')['development']);

// Rechercher des tuteurs en fonction des critères tels que la matière, le niveau d'enseignement, etc.  
exports.searchTutors = async (req, res) => {
  const { skills, experience, hourly_rate, availability } = req.query;

  try {
    // console.log('Skills:', skills);
    // console.log('Experience:', experience);
    // console.log('Hourly Rate:', hourly_rate);
    // console.log('Availability:', availability);

    // créer une requête de base pour récupérer les tuteurs
    let tutorsQuery = knex('users')
      .join('tutor_profiles', 'users.id', '=', 'tutor_profiles.user_id')
      .select('users.id', 'users.full_name', 'users.email', 'tutor_profiles.imageUrl', 'tutor_profiles.skills', 'tutor_profiles.experience', 'tutor_profiles.hourly_rate', 'tutor_profiles.availability');

    // filtrer les tuteurs en fonction des critères 
    // console.log(req.query); 
    if (skills) {
      tutorsQuery = tutorsQuery.where('tutor_profiles.skills', 'like', `%${skills}%`);
    }
    if (experience) {
      tutorsQuery = tutorsQuery.where('tutor_profiles.experience', 'like', `%${experience}%`);
    }
    if (hourly_rate) {
      tutorsQuery = tutorsQuery.where('tutor_profiles.hourly_rate', '<=', hourly_rate);
    }
    if (availability) {
      tutorsQuery = tutorsQuery.where('tutor_profiles.availability', 'like', `%${availability}%`);
    }

    // Exécuter la requête pour récupérer les tuteurs filtrés. 
    const tutors = await tutorsQuery;
    // console.log('Tutors:', tutors); // Vérifiez les résultats de la recherche des tuteurs

    res.json(tutors);
  } catch (error) {
    // console.error(error); // Affichez l'erreur exacte pour le débogage
    return res.status(500).json({ error: 'Erreur lors de la recherche des tuteurs' });
  }
}

  
  
  // Rechercher des étudiants en fonction des critères tels que les compétences, l'expérience, le niveau de grade et l'université
  exports.searchStudents = async (req, res, next) => {
    const { skills, experience, grade_level,major, university } = req.query;
  
    try {
      // Créer une requête de base pour récupérer les étudiants
      let studentsQuery = knex('users')
        .join('student_profiles', 'users.id', '=', 'student_profiles.user_id')
        .select('users.id', 'users.full_name', 'users.email', 'student_profiles.imageUrl', 'student_profiles.skills', 'student_profiles.experience', 'student_profiles.grade_level', 'student_profiles.major', 'student_profiles.university');
  
      // Filtrer les étudiants en fonction des critères
      if (skills) {
        studentsQuery = studentsQuery.where('student_profiles.skills', 'like', `%${skills}%`);
      }
  
      if (experience) {
        studentsQuery = studentsQuery.where('student_profiles.experience', 'like', `%${experience}%`);
      }
  
      if (grade_level) {
        studentsQuery = studentsQuery.where('student_profiles.grade_level', '=', grade_level);
      }
      if (major) {
        studentsQuery = studentsQuery.where('student_profiles.major', '=', major);
      }
  
      if (university) {
        studentsQuery = studentsQuery.where('student_profiles.university', 'like', `%${university}%`);
      }
  
      // Exécuter la requête pour récupérer les étudiants filtrés
      const students = await studentsQuery;
  
      return res.json(students);
    } catch (error) {
      return res.status(500).json({ error: 'Une erreur est survenue lors de la recherche des étudiants' });
    }
  };
  
  