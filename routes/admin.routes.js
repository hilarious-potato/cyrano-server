const express = require("express");
const router = express.Router();
const { Types } = require("mongoose");
const User = require("../models/User.model");

// GET list of all users
router.get("/users/", (req, res, next) => {
  User.find()
    .populate("tresors")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => res.status(404).json(err));
});

// GET single user and populate tresors
router.get("/users/:userId", (req, res, next) => {
  const { userId } = req.params;

  if (!Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Please provide a valid ID!" });
  } else {
    User.findById(userId)
      .then((response) => {
        const { _id, email, name } = response;
        res.status(200).json({ _id, email, name });
      })
      .catch((err) => res.status(404).response(err));
  }
});

// PUT update users role by admins

router.put("/users/:userId", (req, res, next) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Please provide a valid ID!" });
  } else {
    User.findByIdAndUpdate(userId, { role }, { new: true })
      .populate("tresors")
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => res.status(404).response(err));
  }
});

// DELETE user first delete all tresors

router.delete("/users/:userId", (req, res, next) => {
  const { userId } = req.params;
  if (!Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Please provide a valid ID!" });
  } else {
    User.findById(userId)
      .then((user) => {
        return Tresor.deleteMany({
          _id: {
            $in: user.tresors,
          },
        });
      })
      .then((response) => {
        console.log("response: ", response);
        return User.findByIdAndDelete(userId);
      })
      .then((response) => res.status(200).json(response))
      .catch((err) => res.status(400).json(err));
  }
});

module.exports = router;
