exports.up = function (knex) {
  return knex.schema.table('student_sessions', function (table) {
    // Ajoutez la colonne 'end_time'
    table.time('end_time').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.table('student_sessions', function (table) {
    // code pour annuler la migration si necessaire
    table.dropColumn('end_time');
  });
};
