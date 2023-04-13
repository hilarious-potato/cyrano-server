const express = require("express");
const router = express.Router();
const { Types } = require("mongoose");
const Message = require("../models/Message.model");

// create
router.post("/", (req, res, next) => {
  const { encryptedContent } = req.body;

  // console.log(encryptedContent);
  Message.create({ encryptedContent })
    .then((response) => {
      //   console.log(response);
      res.status(201).json(response);
    })
    .catch((err) => {
      //   console.log(err);
      res.status(400).json(err);
      next(err);
    });
});

// read
router.get("/:messageId", (req, res, next) => {
  const { messageId } = req.params;

  if (!Types.ObjectId.isValid(messageId)) {
    res.status(400).json({ message: "Please provide a valid ID!" });
  } else {
    Message.findById(messageId)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        next(err);
      });
  }
});

// update
router.put("/:editId", (req, res, next) => {
  const { editId } = req.params;
  const { encryptedContent, expireDate } = req.body;
  Message.findOneAndUpdate(
    { editId },
    { encryptedContent, expireDate },
    { new: true }
  )
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      next(err);
    });
});

// delete
router.delete("/:editId", (req, res, next) => {
  const { editId } = req.params;

  Message.findOneAndDelete({ editId })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
