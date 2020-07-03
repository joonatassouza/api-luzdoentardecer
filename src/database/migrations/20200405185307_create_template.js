exports.up = function (knex) {
  return knex.schema.createTable('templates', function (table) {
    table.increments('id');
    table.string('name').notNullable();
    table.string('description');
    table
      .timestamp('created_at', { useTz: false })
      .defaultTo(knex.fn.now())
      .notNullable();
    table
      .timestamp('updated_at', { useTz: false })
      .defaultTo(knex.fn.now())
      .notNullable();

    table.integer('user_id').notNullable();

    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('templates');
};
