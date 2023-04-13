const express = require("express");
const { Types } = require("mongoose");
const router = express.Router();
const Message = require("../models/Message.model");

// create
router.post("/", (req, res, next) => {
  const data = ({ encryptedContent } = req.body);

  // console.log(encryptedContent);
  Message.create(data)
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
        //   console.log("editId: ", response.editId.toString());
        //   console.log("response: ", response);
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(400).json(err);
        next(err);
      });
  }
});

// update
router.put("/:editId", (req, res, next) => {
  const { editId } = req.params;
  const data = ({ encryptedContent, expireDate } = req.body);
  Message.findOneAndUpdate({ editId }, data, { new: true })
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
router.delete("/:editId", (req, res, next) => {
  const { editId } = req.params;

  Message.findOneAndDelete({ editId })
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

module.exports = router;
