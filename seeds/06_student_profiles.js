exports.seed = function (knex) {
  // Supprime toutes les données de la table "student_profiles"
  return knex('student_profiles')
    .del()
    .then(function () {
      // Insère de nouvelles données pour les profils d'étudiants
      return knex('student_profiles').insert([
        {
          user_id: 1,
          imageUrl: 'student1.jpg',
          skills: 'Time Management, Communication',
          experience: 'Tutored high school students in math',
          grade_level: 11,
          major: 'Science',
          university: 'High School',
        },
        {
          user_id: 2,
          imageUrl: 'student2.jpg',
          skills: 'Critical Thinking, Problem Solving',
          experience: 'Peer tutor for college computer science course',
          grade_level: 12,
          major: 'Computer Science',
          university: 'College',
        },
        {
          user_id: 3,
          imageUrl: 'student3.jpg',
          skills: 'Time Management, Communication',
          experience: 'Peer tutor for college english',
          grade_level: 12,
          major: 'Computer Science',
          university: 'College',
        },
        {
          user_id: 4,
          imageUrl: 'student4.jpg',
          skills: 'Critical Thinking, Problem Solving',
          experience: 'Peer tutor for college  law',
          grade_level: 13,
          major: 'Computer Science',
          university: 'College',
        },
        {
          user_id: 5,
          imageUrl: 'student5.jpg',
          skills: 'Time Management, Communication',
          experience: 'Peer tutor for college geographia',
          grade_level: 10,
          major: 'Computer Science',
          university: 'College',
        },
        {
          user_id: 6,
          imageUrl: 'student6.jpg',
          skills: 'Critical Thinking, Problem Solving',
          experience: 'Peer tutor for college histry',
          grade_level: 12,
          major: 'Computer Science',
          university: 'College',
        },
        {
          user_id: 7,
          imageUrl: 'student7.jpg',
          skills: 'Time Management, Communication',
          experience: 'Peer tutor for college chinese',
          grade_level: 9,
          major: 'Computer Science',
          university: 'College',
        },

        // Ajoutez d'autres profils d'étudiants si nécessaire
      ]);
    });
};
