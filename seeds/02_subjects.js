exports.seed = function (knex) {
    // Supprime toutes les données de la table "subjects"
    return knex('subjects').del()
      .then(function () {
        // Insère de nouvelles données pour les matières
        return knex('subjects').insert([
          { name: 'Mathematics', level: 'High School', description: 'Algebra, Calculus, Geometry' },
          { name: 'Physics', level: 'Undergraduate', description: 'Classical Mechanics, Electromagnetism' },
          { name: 'Chemicals', level: 'High School', description: 'Classical Mechanics, Electromagnetism' },
          { name: 'English', level: 'Undergraduate', description: 'Classical Mechanics, Electromagnetism' },
          { name: 'Geograpgia', level: 'High School', description: 'Classical Mechanics, Electromagnetism' },
          { name: 'Histry', level: 'Undergraduate', description: 'Classical Mechanics, Electromagnetism' },
          { name: 'Law', level: 'High School', description: 'Classical Mechanics, Electromagnetism' },

          // Ajoutez d'autres matières si nécessaire
        ]);
      });
  };
  