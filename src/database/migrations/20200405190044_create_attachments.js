exports.up = function (knex) {
  return knex.schema.createTable('attachments', function (table) {
    table.increments('id');
    table.string('url').notNullable();
    table.string('type').notNullable();
    table.string('extension').notNullable();
    table.string('thumbnail');
    table
      .timestamp('created_at', { useTz: false })
      .defaultTo(knex.fn.now())
      .notNullable();
    table
      .timestamp('updated_at', { useTz: false })
      .defaultTo(knex.fn.now())
      .notNullable();

    table.integer('post_id');
    table.integer('user_id').notNullable();

    table.foreign('post_id').references('id').inTable('posts');
    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('attachments');
};
