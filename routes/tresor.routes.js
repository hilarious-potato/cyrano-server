const express = require("express");
const { Types } = require("mongoose");
const router = express.Router();
const Tresor = require("../models/Tresor.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");

// create

router.post("/", isAuthenticated, (req, res, next) => {
  const { title, messages } = req.body;
  const data = { title, messages };
  let tresor = null;
  //   console.log("data: ", data);
  if (!(typeof data.title === "string" && data.title.length > 0)) {
    res.status(400).json({ message: "Please provide a Tresor name" });
  } else if (!(typeof data.messages === "string")) {
    res
      .status(400)
      .json({ message: "Please provide a Tresor messages string" });
  } else {
    Tresor.create(data)
      .then((response) => {
        //   console.log("response: ", response);
        tresor = response;
        return User.findByIdAndUpdate(
          req.payload._id,
          {
            $push: { tresors: response._id },
          },
          { new: true }
        );
      })
      .then((response) => {
        res.json({
          message: `tresor created successfully for ${response.name}`,
          tresor,
        });
      })
      .catch((err) => {
        //   console.log("err: ", err);
        res.status(500).json(err);
        next(err);
      });
  }
});

router.get("/:tresorId", isAuthenticated, (req, res, next) => {
  const { tresorId } = req.params;

  if (!Types.ObjectId.isValid(tresorId)) {
    res.status(400).json({ message: "Please provide a valid ID!" });
  } else {
    Tresor.findById(tresorId)
      .then((response) => {
        // console.log("response: ", response);
        if (response) {
          res.status(200).json(response);
        } else {
          res.status(404).json({
            message: `Tresor with ID: ${tresorId} was not found on server`,
          });
        }
      })
      .catch((err) => {
        // console.log("err: ", err);
        res.status(404).json(err);
      });
  }
});

// update

router.put("/:tresorId", isAuthenticated, (req, res, next) => {
  const { tresorId } = req.params;
  const { title, messages } = req.body;
  const data = { title, messages };
  Tresor.findByIdAndUpdate(tresorId, data, { new: true })
    .then((response) => {
      //   console.log("response: ", response);
      res.status(200).json(response);
    })
    .catch((err) => {
      //   console.log("err: ", err);
      res.status(500).json(err);
      next(err);
    });
});
// delete

router.delete("/:tresorId", isAuthenticated, (req, res, next) => {
  const { tresorId } = req.params;
  User.findByIdAndUpdate(
    req.payload._id,
    { $pull: { tresors: tresorId } },
    { new: true }
  )
    .then((response) => {
      user = response;
      return Tresor.findByIdAndDelete(tresorId);
    })
    .then((response) => {
      res.status(200).json({
        message: `deleted Tresor "${response.title}" with id: ${response.id}`,
      });
    })
    .catch((err) => next(err));
});

module.exports = router;
