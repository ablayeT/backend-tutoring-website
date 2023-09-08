exports.up = function (knex) {
  return knex.schema.table('student_sessions', function (table) {
    // Ajoutez la colonne 'start_time'
    table.time('start_time').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.table('student_sessions', function (table) {
    //  code pour annuler la migration si necessaire
    table.dropColumn('start_time');
  });
};
