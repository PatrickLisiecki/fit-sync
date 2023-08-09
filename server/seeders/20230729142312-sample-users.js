"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sampleUsers = [
      {
        username: "john",
        email: "john@example.com",
        password: await bcrypt.hash("testpassword", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "jane",
        email: "jane@example.com",
        password: await bcrypt.hash("password456", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("users", sampleUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
