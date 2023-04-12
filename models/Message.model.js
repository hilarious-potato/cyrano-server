const { Schema, model } = require("mongoose");
const { randomUUID } = require("crypto");

const messageSchema = new Schema(
  {
    encryptedContent: {
      type: String,
      required: true,
    },
    editId: {
      type: String,
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
