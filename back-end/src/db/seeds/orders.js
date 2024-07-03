/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("orders").del();

  // Inserts seed entries to table
  await knex("orders").insert([
    { order_id: 1, pricing_id: "1", description: "+ PhP 0.2/kWh Admin Fee" },
    { order_id: 2, pricing_id: "2", description: "PhP 5.70/kWh" },
  ]);
};
