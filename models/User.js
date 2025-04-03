const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    kakaoId: { type: String, required: true, unique: true }, // 카카오 고유 ID
    email: { type: String },
    nickName: { type: String, required: true },
    profileImage: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false } //__v 제거
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
