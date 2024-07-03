/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("pricing_types").del();

  // Inserts Seed entries to table
  await knex("pricing_types").insert([
    { pricing_id: 1, name: "Variable-based" },
    { pricing_id: 2, name: "Fixed Pricing" },
    { pricing_id: 3, name: "Test Pricing" },
  ]);
};
