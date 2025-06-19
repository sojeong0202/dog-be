const cron = require("node-cron");
const { sendDailyEmailsToAllUsers } = require("../services/mailBatchService");

cron.schedule("0 9 * * *", async () => {
  console.log("[CRON] 질문 이메일 자동 발송 시작");
  await sendDailyEmailsToAllUsers();
});
