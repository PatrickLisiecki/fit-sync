const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/auth");
const { ForbiddenError, NotFoundError } = require("../errors");
const { Show } = require("../models");

const getShow = async (id) => {
  const show = await Show.findByPk(parseInt(id, 10));
  if (!show) {
    throw new NotFoundError("show not found");
  }
  return show;
};

const authorizeEdit = (session, show) => {
  if (parseInt(session.userId, 10) !== show.UserId) {
    throw new ForbiddenError("You are not authorized to edit this show");
  }
};

const authorizeDelete = (session, show) => {
  if (parseInt(session.userId, 10) !== show.UserId) {
    throw new ForbiddenError("You are not authorized to delete this show");
  }
};

const handleErrors = (err, res) => {
  console.error(err);
  if (err.name === "SequelizeValidationError") {
    return res
      .status(422)
      .json({ errors: err.errors.map((e) => e.message).join(", ") });
  }
  res.status(500).send({ errors: err.message });
};

router.get("/", async (req, res) => {
  try {
    const whereClause = {};
    if (req.query.status) {
      whereClause.status = req.query.status;
    }
    const allShows = await req.user.getShow({ where: whereClause });

    res.status(200).json(allShows);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
