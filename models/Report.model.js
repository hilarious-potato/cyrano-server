const { Schema, model } = require("mongoose");

const reportSchema = new Schema(
  {
    messageId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Message",
    },
    reportDescription: {
      type: String,
      default: "Reported abusive content",
    },
    isOpen: {
      type: Boolean,
      required: true,
      default: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Report = model("Report", reportSchema);

module.exports = Report;
