const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // user 연결
    name: { type: String, required: true },
    age: { type: Number },
    firstMetAt: { type: Date },
    photo: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.models.Dog || mongoose.model("Dog", dogSchema);
