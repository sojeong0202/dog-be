const questionService = require("../services/questionService");

const getUnansweredQuestion = async (req, res) => {
  try {
    const userId = req.user._id;
    const question = await questionService.getUnansweredQuestion(userId);

    if (!question) {
      return res.status(200).json({ message: "모든 질문에 답변했습니다!" });
    }

    res.status(200).json({
      _id: question._id,
      text: question.text,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    });
  } catch (error) {
    console.error("질문 제공 실패:", error);
    res.status(500).json({ message: "질문 제공 중 예기치 않은 오류 발생" });
  }
};

module.exports = {
  getUnansweredQuestion,
};
