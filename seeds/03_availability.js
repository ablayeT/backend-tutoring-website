exports.seed = function (knex) {
  // Supprime toutes les données de la table "availability"
  return knex('availability')
    .del()
    .then(function () {
      // Insère de nouvelles données pour les disponibilités des tuteurs
      return knex('availability').insert([
        {
          tutor_id: 2,
          date: '2023-07-25',
          start_time: '09:00:00',
          end_time: '12:00:00',
          location: 'Online',
        },
        {
          tutor_id: 2,
          date: '2023-07-26',
          start_time: '14:00:00',
          end_time: '16:00:00',
          location: 'In-Person',
        },
        {
          tutor_id: 3,
          date: '2023-07-26',
          start_time: '14:00:00',
          end_time: '16:00:00',
          location: 'School',
        },
        {
          tutor_id: 2,
          date: '2023-07-26',
          start_time: '14:00:00',
          end_time: '16:00:00',
          location: 'Office',
        },
        {
          tutor_id: 5,
          date: '2023-07-26',
          start_time: '14:00:00',
          end_time: '16:00:00',
          location: 'online',
        },
        {
          tutor_id: 2,
          date: '2023-07-26',
          start_time: '14:00:00',
          end_time: '16:00:00',
          location: 'In-Person',
        },
        {
          tutor_id: 7,
          date: '2023-07-26',
          start_time: '14:00:00',
          end_time: '16:00:00',
          location: 'Online',
        },

        // Ajoutez d'autres disponibilités des tuteurs si nécessaire
      ]);
    });
};
