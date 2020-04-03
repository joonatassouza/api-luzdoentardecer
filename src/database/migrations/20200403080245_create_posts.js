exports.up = function (knex) {
  return knex.schema.createTable('posts', function (table) {
    table.increments('id');
    table.integer('wordpress_id');
    table.string('wordpress_description');
    table.string('wordpress_content');

    table.timestamp('publish_date', { useTz: false }).notNullable();
    table.string('title').notNullable();
    table.string('description');
    table.string('subtitle');
    table.string('content').notNullable();
    table.string('footer');
    table.string('type').notNullable();
    table.string('references');
    table.string('author').notNullable();
    table
      .timestamp('created_at', { useTz: true })
      .defaultTo(knex.fn.now())
      .notNullable();
    table
      .timestamp('updated_at', { useTz: true })
      .defaultTo(knex.fn.now())
      .notNullable();
    table.integer('category_id');
    table.integer('user_id');
    table.foreign('category_id').references('id').inTable('categories');
    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('posts');
};
