const { sendEmail } = require("../utils/mailUtil");

const sendDailyQuestionEmail = async (user) => {
  const html = `
  <!DOCTYPE html>
  <html lang="ko">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>두둥멍 질문 알림 메일</title>
    </head>
    <body style="margin: 0; padding: 0;">
      <div style="background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%); padding: 20px 0;">
        <div style="max-width: 480px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 6px 20px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%); padding: 20px; text-align: center; color: white;">
            <div style="font-size: 20px; margin-bottom: 6px;">🐾 🐾 🐾</div>
            <h1 style="margin: 0; font-size: 22px; font-weight: bold; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);">두둥멍 질문 알림 메일</h1>
            <div style="font-size: 20px; margin-top: 6px;">🐾 🐾 🐾</div>
          </div>

          <div style="padding: 30px 20px; text-align: center;">
            <p style="font-size: 16px; color: #2d3436;">
              🐕 안녕하세요! 두둥멍 질문 알림 메일입니다. 🐕
            </p>

            <p style="font-size: 14px; color: #636e72;">
              오늘도 우리 강아지와 함께할 특별한 질문이 도착했어요! 🎉
            </p>

            <div style="margin: 24px 0;">
              <a href="https://www.dudungmung.site" style="display: inline-block; background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%); color: white; text-decoration: none; padding: 12px 24px; border-radius: 20px; font-weight: bold; font-size: 14px; box-shadow: 0 4px 12px rgba(253, 121, 168, 0.4);">
                🐾 질문 답하러 가기 🐾
              </a>
            </div>

            <p style="font-size: 12px; color: #636e72;">
              강아지와의 소중한 순간들을 기록해보세요! ✨
            </p>
          </div>

          <div style="background-color: #2d3436; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0 0 8px 0; font-size: 13px;">
              🏠 두둥멍 홈페이지: <a href="https://www.dudungmung.site" style="color: #fdcb6e; text-decoration: none; font-weight: bold;">https://www.dudungmung.site</a>
            </p>
            <p style="font-size: 11px; opacity: 0.8; margin-top: 10px;">
              매일매일 강아지와 함께하는 특별한 이야기 🐕💕
            </p>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;

  return sendEmail({
    to: user.email,
    subject: "오늘의 질문이 도착했어요!",
    html,
  });
};

module.exports = { sendDailyQuestionEmail };
