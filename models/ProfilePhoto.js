const mongoose = require("mongoose");

const profilePhotoSchema = new mongoose.Schema(
  {
    objectName: { type: String },
    uri: { type: String, required: true },
    parExpiresAt: { type: Date },
    source: {
      type: String,
      enum: ["kakao", "internal"],
      default: "internal",
    },
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

module.exports = mongoose.model("ProfilePhoto", profilePhotoSchema);
