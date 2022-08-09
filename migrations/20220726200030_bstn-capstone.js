exports.up = function(knex) {
    return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').notNullable().unique();
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
    })
    .createTable('categories', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description').notNullable();
    })
    .createTable('posts', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('text', 'longtext');
        table.bigint('date').notNullable();
        table.integer('likes').defaultTo(0);
        table.integer('category_id').notNullable().references('id');
        table.integer('user_id').notNullable().references('id');
    })
    .createTable('comments', (table) => {
        table.increments('id').primary();
        table.text('text', 'longtext').notNullable();
        table.bigint('date').notNullable();
        table.integer('likes').defaultTo(0);
        table.integer('post_id').notNullable().references('id');
        table.integer('user_id').notNullable().references('id');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users').dropTable('categories').dropTable('posts').dropTable('comments');
};
