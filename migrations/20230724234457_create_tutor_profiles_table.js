/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// knex migrate:make create_student_profiles_table
exports.up = function (knex) {
    return knex.schema.createTable('tutor_profiles', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().unique().references('id').inTable('users');
      table.string('imageUrl', 255);
      table.text('skills');
      table.text('experience');
      table.decimal('hourly_rate', 10, 2);
      table.text('availability');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('tutor_profiles');
  };
  
  
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

