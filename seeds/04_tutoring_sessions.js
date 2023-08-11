exports.seed = function (knex) {
    // Supprime toutes les données de la table "tutoring_sessions"
    return knex('tutoring_sessions').del()
      .then(function () {
        // Insère de nouvelles données pour les sessions de tutorat
        return knex('tutoring_sessions').insert([
          { student_id: 1, tutor_id: 2, subject_id: 1, date: '2023-07-27', start_time: '10:00:00', end_time: '12:00:00', location: 'Online', price: 25.00, status: 'Confirmed' },
          { student_id: 3, tutor_id: 2, subject_id: 2, date: '2023-07-28', start_time: '15:00:00', end_time: '17:00:00', location: 'In-Person', price: 30.00, status: 'Pending' },
          { student_id: 2, tutor_id: 3, subject_id: 3, date: '2023-07-28', start_time: '15:00:00', end_time: '17:00:00', location: 'In-Person', price: 30.00, status: 'Confirmed' },
          { student_id: 3, tutor_id: 2, subject_id: 4, date: '2023-07-28', start_time: '15:00:00', end_time: '17:00:00', location: 'In-Person', price: 30.00, status: 'Pending' },
          { student_id: 4, tutor_id: 4, subject_id: 5, date: '2023-07-28', start_time: '15:00:00', end_time: '17:00:00', location: 'In-Person', price: 30.00, status: 'Confirmed' },
          { student_id: 3, tutor_id: 3, subject_id: 6, date: '2023-07-28', start_time: '15:00:00', end_time: '17:00:00', location: 'In-Person', price: 30.00, status: 'Pending' },
          { student_id: 6, tutor_id: 6, subject_id: 7, date: '2023-07-28', start_time: '15:00:00', end_time: '17:00:00', location: 'In-Person', price: 30.00, status: 'Confirmed' },

          // Ajoutez d'autres sessions de tutorat si nécessaire
        ]);
      });
  };
  