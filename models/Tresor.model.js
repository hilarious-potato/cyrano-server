const { Schema, model } = require("mongoose");

const tresorSchema = new Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    messages: String,
    salt: { type: String, required: [true, "Salt is required"] },
  },
  {
    timestamps: true,
  }
);

//  frontend messages = tresorArray = [{
//   id: MongosObjectId
//   alias: String
// }]

const Tresor = model("Tresor", tresorSchema);

module.exports = Tresor;
