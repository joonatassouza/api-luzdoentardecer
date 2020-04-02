exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id');
    table.string('firstname').notNullable();
    table.string('lastname').notNullable();
    table.string('email').notNullable();
    table.date('birthday').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
    table.string('country').notNullable();
    table.string('street').notNullable();
    table.string('neighborhood').notNullable();
    table.integer('number').notNullable();
    table.string('reference').notNullable();
    table.string('zipcode', 11).notNullable();
    table.string('complement').notNullable();
    table.string('password_hash').notNullable();

    table
      .timestamp('last_login', { useTz: true })
      .defaultTo(knex.fn.now())
      .notNullable();
    table
      .timestamp('created_at', { useTz: true })
      .defaultTo(knex.fn.now())
      .notNullable();
    table
      .timestamp('updated_at', { useTz: true })
      .defaultTo(knex.fn.now())
      .notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
