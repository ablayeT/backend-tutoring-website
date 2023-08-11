exports.seed = function(knex) {
    // Supprimer toutes les données existantes de la table
    return knex('contacts').del()
      .then(function () {
        // Insérer de nouvelles données dans la table
        return knex('contacts').insert([
          { name: 'John Doe', email: 'john@example.com', message: 'Bonjour, je suis intéressé par vos services de tutorat.' },
          { name: 'Jane Smith', email: 'jane@example.com', message: 'J"aimerais en savoir plus sur vos tarifs.' },
          { name: 'Alan mark', email: 'alan@example.com', message: 'J"aimerais en savoir plus sur vos matières.' },
          { name: 'Marta sanders', email: 'marta@example.com', message: 'J"aimerais en savoir plus sur vos horaires.' },
          { name: 'Aly khan', email: 'aly@example.com', message: 'J"aimerais vous rencontrer en presonne pour en savoir plus.' },
        ]);
      });
  };
  