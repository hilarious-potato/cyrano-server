const { Schema, model } = require("mongoose");

const tresorSchema = new Schema(
  {
    title: { type: String, required: true },
    messages: String,
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
