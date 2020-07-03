exports.up = function (knex) {
  return knex.schema.createTable('posts', function (table) {
    table.increments('id');
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('author');
    table.string('content').notNullable();
    table.string('place');
    table.string('youtube_embedded');
    table.string('type').notNullable();
    table.timestamp('publish_date', { useTz: false }).notNullable();
    table
      .timestamp('created_at', { useTz: false })
      .defaultTo(knex.fn.now())
      .notNullable();
    table
      .timestamp('updated_at', { useTz: false })
      .defaultTo(knex.fn.now())
      .notNullable();

    table.integer('template_id').notNullable();
    table.integer('attachment_id');
    table.integer('user_id').notNullable();

    table.foreign('template_id').references('id').inTable('templates');
    table.foreign('attachment_id').references('id').inTable('attachments');
    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('posts');
};
