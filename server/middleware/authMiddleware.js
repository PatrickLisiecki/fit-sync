// authMiddleware.js

const User = require("../models/User");

const authenticateUser = async (req, res, next) => {
  try {
    const { userId } = req.session;
    if (userId) {
      const user = await User.findByPk(userId);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401).json({ message: "Invalid session" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { authenticateUser };
