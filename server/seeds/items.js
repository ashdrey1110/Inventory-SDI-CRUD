/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {userId: 1, itemName: 'Pickles', description: "Individually bagged pickles", quantity: 200},
    {userId: 3, itemName: 'Pretzels', description: "Large twisted salted pretzel", quantity: 500},
    {userId: 2, itemName: 'Mickey Ice Cream Bar', description: "Individually packaged Mickey-shaped chocolate-covered vanilla ice cream on a stick", quantity: 200},
    {userId: 3, itemName: 'Dole Whip', description: "Dole brand soft serve - pineapple flavor", quantity: 250},
    {userId: 3, itemName: 'Popcorn', description: "Large bag of popcorn kernels for popping", quantity: 80},
    {userId: 2, itemName: 'Turkey Leg', description: "Individually packaged large turkey legs", quantity: 160}
  ]);
};
