const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // user 연결
    name: { type: String, required: true },
    birthday: { type: Date, required: true },
    firstMetAt: { type: Date, required: true }, // 처음 만난 날
    photo: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

// 가상 필드
// 생일 기준 나이 계산
dogSchema.virtual("calculatedAge").get(function () {
  if (!this.birthday) return null;

  const today = new Date();
  const birth = new Date(this.birthday);

  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
});

// 함께한 기간
dogSchema.virtual("togetherFor").get(function () {
  if (!this.firstMetAt) return null;

  const today = new Date();
  const firstMet = new Date(this.firstMetAt);

  const diffTime = today - firstMet;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
});

module.exports = mongoose.models.Dog || mongoose.model("Dog", dogSchema);
