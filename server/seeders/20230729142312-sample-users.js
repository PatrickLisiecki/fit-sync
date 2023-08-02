"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Sample user data
    const sampleUsers = [
      {
        username: "john",
        email: "john@example.com",
        password: await bcrypt.hash("testpassword", 10), // Hash the password
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "jane",
        email: "jane@example.com",
        password: await bcrypt.hash("password456", 10), // Hash the password
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more sample users as needed
    ];

    // Insert the data into the 'users' table
    await queryInterface.bulkInsert("users", sampleUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted data
    await queryInterface.bulkDelete("users", null, {});
  },
};
