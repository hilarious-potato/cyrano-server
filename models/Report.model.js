const { Schema, model } = require("mongoose");

const reportSchema = new Schema({
  messageId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Message",
  },
  isOpen: {
    type: Boolean,
    required: true,
    default: true,
  },
  password: String,
});

const Report = model("Report", reportSchema);

module.exports = Report;
