exports.seed = function (knex) {
  // Supprime toutes les données de la table "comments"
  return knex('ratings_comments')
    .del()
    .then(function () {
      // Insère de nouvelles données pour les commentaires et évaluations
      return knex('ratings_comments').insert([
        {
          student_id: 1,
          tutor_id: 2,
          rating: 4,
          comment: 'Great tutor, very helpful!',
        },
        {
          student_id: 3,
          tutor_id: 3,
          rating: 5,
          comment: 'Excellent session, highly recommend!',
        },
        {
          student_id: 2,
          tutor_id: 2,
          rating: 5,
          comment: 'Excellent session, highly recommend!',
        },
        {
          student_id: 3,
          tutor_id: 3,
          rating: 5,
          comment: 'Excellent session, highly recommend!',
        },
        {
          student_id: 2,
          tutor_id: 2,
          rating: 5,
          comment: 'Excellent session, highly recommend!',
        },
        {
          student_id: 5,
          tutor_id: 5,
          rating: 5,
          comment: 'Excellent session, highly recommend!',
        },
        {
          student_id: 4,
          tutor_id: 4,
          rating: 5,
          comment: 'Excellent session, highly recommend!',
        },

        // Ajoutez d'autres
      ]);
    });
};
