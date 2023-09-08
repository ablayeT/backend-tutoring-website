exports.up = function (knex) {
  return knex.schema.createTable('subjects', function (table) {
    table.increments('id').primary();
    table.string('name', 255).notNullable().unique();
    table.enu('level', ['High School', 'Undergraduate', 'Graduate', 'Other']);
    table.string('description', 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('subjects');
};
