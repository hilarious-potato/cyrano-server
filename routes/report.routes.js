const express = require("express");
const router = express.Router();
const Report = require("../models/Report.model");
const { Types } = require("mongoose");
const Message = require("../models/Message.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const isAdmin = require("../middleware/isAdmin");

//Read
router.get("/", isAuthenticated, isAdmin, (req, res, next) => {
  const fetchAllReports = async () => {
    try {
      const reports = await Report.find({});
      res.json(reports);
    } catch (error) {
      next(error);
    }
  };

  fetchAllReports();
});

router.get("/:reportId", isAuthenticated, isAdmin, (req, res, next) => {
  const { reportId } = req.params;
  if (!Types.ObjectId.isValid(reportId)) {
    res.status(400).json({ message: "Provide a valid Report Id" });
  } else {
    const fetchReport = async () => {
      try {
        const report = await Report.findById(reportId);
        res.json(report);
      } catch (error) {
        next(error);
      }
    };
    fetchReport();
  }
});
//Create

router.post("/", (req, res, next) => {
  const { messageId, messagePassword: password, reportDescription } = req.body;
  const data = { messageId, password, reportDescription };
  if (!Types.ObjectId.isValid(messageId)) {
    res.status(400).json({ message: "Please provide a valid message ID" });
  } else if (!(typeof data.password === "string" && data.password.length > 0)) {
    res.status(400).json({ message: "Please provide a messagePassword" });
  } else {
    const createReport = async () => {
      try {
        const reportedMessage = await Message.findById(data.messageId);
        if (!reportedMessage) {
          res
            .status(401)
            .json({ message: "reported message not found on server" });
        } else {
          const newReport = await Report.create(data);
          res.json(newReport);
        }
      } catch (error) {
        next(error);
      }
    };

    createReport();
  }
});

//edit
router.put("/:reportId", isAuthenticated, isAdmin, (req, res, next) => {
  const { reportId } = req.params;
  const { isOpen } = req.body;
  const data = { isOpen };
  if (!Types.ObjectId.isValid(reportId)) {
    res.status(400).json({ message: "Provide a valid Report Id" });
  } else if (!(typeof data.isOpen === "boolean")) {
    res
      .status(400)
      .json({ message: "Only a boolean value is allowed for isOpen property" });
  } else {
    const updateReport = async () => {
      try {
        const report = await Report.findById(reportId);
        if (!report) {
          res.status(404).json("message: This Report was not found on server");
        } else {
          const updatedReport = await Report.findByIdAndUpdate(reportId, data, {
            new: true,
          });
          res.json(updatedReport);
        }
      } catch (error) {
        next(error);
      }
    };
    updateReport();
  }
});

module.exports = router;
