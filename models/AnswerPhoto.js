const mongoose = require("mongoose");

const answerPhotoSchema = new mongoose.Schema(
  {
    objectName: { type: String, required: true },
    uri: { type: String, required: true },
    parExpiresAt: { type: Date, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

module.exports = mongoose.model("AnswerPhoto", answerPhotoSchema);
