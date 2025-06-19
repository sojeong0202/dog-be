const userRepository = require("../repositories/userRepository");
const answerService = require("./answerService");
const { sendDailyQuestionEmail } = require("./mailService");

const sendDailyEmailsToAllUsers = async () => {
  const users = await userRepository.getAllUsers();

  for (const user of users) {
    await sendDailyQuestionEmail(user);
  }

  console.log("모든 사용자에게 이메일 발송 완료");
};

module.exports = { sendDailyEmailsToAllUsers };
