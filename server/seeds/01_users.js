/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {firstName: "Donald", lastName: "Duck", username: "donaldduck1", password: "123abc"},
    {firstName: "Daisy", lastName: "Duck", username: "daisyduck2", password: "456def"},
    {firstName: "Mickey", lastName: "Mouse", username: "mickeymouse3", password: "789ghi"}
  ]);
};
