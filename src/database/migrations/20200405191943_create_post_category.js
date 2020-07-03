exports.up = function (knex) {
  return knex.schema.createTable('post_category', function (table) {
    table
      .timestamp('created_at', { useTz: false })
      .defaultTo(knex.fn.now())
      .notNullable();
    table
      .timestamp('updated_at', { useTz: false })
      .defaultTo(knex.fn.now())
      .notNullable();

    table.integer('post_id').notNullable().primary();
    table.integer('category_id').notNullable().primary();
    table.integer('user_id').notNullable();

    table.foreign('post_id').references('id').inTable('posts');
    table.foreign('category_id').references('id').inTable('categories');
    table.foreign('user_id').references('id').inTable('users');

    table.primary(['post_id', 'category_id']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('post_category');
};
