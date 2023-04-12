const { Schema, model } = require("mongoose");
const { randomUUID } = require("crypto");

const messageSchema = new Schema(
  {
    content: String,
    editId: {
      type: "UUID",
      default: () => randomUUID(),
    },
    expireDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Message = model("Message", messageSchema);

module.exports = Message;
