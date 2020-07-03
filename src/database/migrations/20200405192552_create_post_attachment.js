exports.up = function (knex) {
  return knex.schema.createTable('post_attachment', function (table) {
    table
      .timestamp('created_at', { useTz: false })
      .defaultTo(knex.fn.now())
      .notNullable();
    table
      .timestamp('updated_at', { useTz: false })
      .defaultTo(knex.fn.now())
      .notNullable();

    table.integer('post_id').notNullable().primary();
    table.integer('attachment_id').notNullable().primary();
    table.integer('user_id').notNullable();

    table.foreign('post_id').references('id').inTable('posts');
    table.foreign('attachment_id').references('id').inTable('attachments');
    table.foreign('user_id').references('id').inTable('users');

    table.primary(['post_id', 'attachment_id']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('post_attachment');
};
