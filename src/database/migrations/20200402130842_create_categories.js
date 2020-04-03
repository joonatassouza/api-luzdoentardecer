exports.up = function (knex) {
  return knex.schema.createTable('categories', function (table) {
    table.increments('id');
    table.integer('wordpress_id');
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.string('tag').notNullable();
    table
      .timestamp('created_at', { useTz: true })
      .defaultTo(knex.fn.now())
      .notNullable();
    table
      .timestamp('updated_at', { useTz: true })
      .defaultTo(knex.fn.now())
      .notNullable();

    table.integer('parent_id');
    table.foreign('parent_id').references('id').inTable('categories');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('categories');
};
