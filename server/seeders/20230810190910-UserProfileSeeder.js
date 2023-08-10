"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("user_profiles", [
      {
        userId: 1,
        age: 26,
        height: 175,
        weight: 70,
        gender: "Male",
        state: "California",
        displayName: "JohnDoe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        age: 24,
        height: 34,
        weight: 180,
        gender: "Female",
        state: "California",
        displayName: "Reyna",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more data entries as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user_profiles", null, {});
  },
};
