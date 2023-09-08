exports.seed = function (knex) {
  // Supprime toutes les données de la table "users"
  return knex('users')
    .del()
    .then(function () {
      // Insère de nouvelles données pour les utilisateurs
      return knex('users').insert([
        {
          full_name: 'John Doe',
          email: 'john@example.com',
          password: 'hashed_password',
          user_type: 'Student',
          activated: true,
        },
        {
          full_name: 'Jane Smith',
          email: 'jane@example.com1',
          password: 'hashed_password1',
          user_type: 'Tutor',
          activated: true,
        },
        {
          full_name: 'Morgan Pam',
          email: 'jane@example.com2',
          password: 'hashed_password2',
          user_type: 'Student',
          activated: true,
        },
        {
          full_name: 'Elodie Mothes',
          email: 'jane@example.com3',
          password: 'hashed_password3',
          user_type: 'Tutor',
          activated: true,
        },
        {
          full_name: 'Amandine Legrand',
          email: 'jane@example.com4',
          password: 'hashed_password4',
          user_type: 'Student',
          activated: true,
        },
        {
          full_name: 'Marc  Lefou',
          email: 'jane@example.com5',
          password: 'hashed_password5',
          user_type: 'Tutor',
          activated: true,
        },
        {
          full_name: 'Abdou Toure',
          email: 'jane@example.com6',
          password: 'hashed_password6',
          user_type: 'Student',
          activated: true,
        },

        // Ajoutez d'autres données d'utilisateurs si nécessaire
      ]);
    });
};
