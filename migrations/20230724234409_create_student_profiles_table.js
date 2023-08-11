/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// knex migrate:make create_student_profiles_table
exports.up = function (knex) {
  return knex.schema.createTable('student_profiles', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().unique().references('id').inTable('users');
    table.string('imageUrl', 255);
    table.text('skills');
    table.text('experience');
    table.integer('grade_level');
    table.string('major', 255);
    table.string('university', 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('student_profiles');
};

  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
