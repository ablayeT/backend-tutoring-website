exports.seed = function (knex) {
    // Supprime toutes les données de la table "tutor_profiles"
    return knex('tutor_profiles').del()
      .then(function () {
        // Insère de nouvelles données pour les profils de tuteurs
        return knex('tutor_profiles').insert([
          { user_id: 1,imageUrl: 'tutor1.jpg', skills: 'Mathematics,Physics', experience: '5 years of tutoring experience', hourly_rate: 30.00, availability: 'Weekdays, Online' },
          { user_id: 2,imageUrl: 'tutor2.jpg', skills: 'Chemistry,Biology', experience: 'Teaching assistant for college biology courses', hourly_rate: 35.00, availability: 'Weekends,In-Person' },
          { user_id: 3,imageUrl: 'tutor3.jpg', skills: 'Histry,Geographie', experience: 'Teaching assistant for college biology courses', hourly_rate: 35.00, availability: 'Weekends,In-Person' },
          { user_id: 4,imageUrl: 'tutor4.jpg', skills: 'English,Chinese', experience: 'Teaching assistant for college biology courses', hourly_rate: 35.00, availability: 'Weekends,In-Person' },
          { user_id: 5,imageUrl: 'tutor5.jpg', skills: 'Chemistry,Biology', experience: 'Teaching assistant for college biology courses', hourly_rate: 35.00, availability: 'Weekends,In-Person' },
          { user_id: 6,imageUrl: 'tutor6.jpg', skills: 'Histry,Geographie', experience: 'Teaching assistant for college biology courses', hourly_rate: 35.00, availability: 'Weekends,In-Person' },
          { user_id: 7,imageUrl: 'tutor7.jpg', skills: 'Chemistry,Biology', experience: 'Teaching assistant for college biology courses', hourly_rate: 35.00, availability: 'Weekends,In-Person' },

          // Ajoutez d'autres profils de tuteurs si nécessaire
        ]);
      });
  };
  