const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
    questionText: { type: String, required: true },
    answerText: {
      type: String,
      required: function () {
        return !this.isDraft; // isDraft가 false일 때만 필수
      },
    },
    photoIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "AnswerPhoto" }],
    isDraft: { type: Boolean, default: true },
    dateKey: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
  }
);

answerSchema.index({ userId: 1, dateKey: 1 }, { unique: true });

module.exports = mongoose.model("Answer", answerSchema);
