/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("orders", (table) => {
    table.increments("order_id").primary();
    table.integer("pricing_id").unsigned(); // Define pricing_id as an integer
    table
      .foreign("pricing_id")
      .references("pricing_types.pricing_id")
      .onDelete("cascade");
    table.varchar("description").notNullable();
    table.timestamps(true, true); // Shorthand for created_at and updated_at timestamps
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("orders");
};
