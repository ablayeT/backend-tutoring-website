exports.up = function (knex) {
  return knex.schema.table('student_sessions', function (table) {
    // Ajoutez la colonne 'price'
    table.decimal('price', 10, 2).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.table('student_sessions', function (table) {
    //  code pour annuler la migration si necessaire
    table.dropColumn('price');
  });
};
