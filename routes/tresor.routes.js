const express = require("express");
const { Types } = require("mongoose");
const router = express.Router();
const Tresor = require("../models/Tresor.model");

// create

router.post("/", (req, res, next) => {
  const data = ({ title, messages } = req.body);
  //   console.log("data: ", data);

  Tresor.create(data)
    .then((response) => {
      //   console.log("response: ", response);
      res.status(201).json(response);
    })
    .catch((err) => {
      //   console.log("err: ", err);
      res.status(500).json(err);
      next(err);
    });
});

// read

router.get("/:tresorId", (req, res, next) => {
  const { tresorId } = req.params;

  if (!Types.ObjectId.isValid(tresorId)) {
    res.status(400).json({ message: "Please provide a valid ID!" });
  } else {
    Tresor.findById(tresorId)
      .then((response) => {
        // console.log("response: ", response);
        res.status(200).json(response);
      })
      .catch((err) => {
        // console.log("err: ", err);
        res.status(404).json(err);
      });
  }
});

// update

router.put("/:tresorId", (req, res, next) => {
  const { tresorId } = req.params;
  const data = ({ title, messages } = req.body);
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

router.delete("/:tresorId", (req, res, next) => {
  const { tresorId } = req.params;

  Tresor.findByIdAndDelete(tresorId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => res.status(500).json(response));
});

module.exports = router;
