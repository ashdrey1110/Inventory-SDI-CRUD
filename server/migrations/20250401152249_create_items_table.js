/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('items', table => {
    table.increments('id').primary();
    table.integer('userId');
    table.foreign('userId').references("users.id");
    table.string('itemName', 250);
    table.string('description', 1000);
    table.integer('quantity');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .alterTable('items', (table) => {
        table.dropForeign('userId');
    })
    .then(function () {
        return knex.schema.dropTableIfExists('items');
    })
};
