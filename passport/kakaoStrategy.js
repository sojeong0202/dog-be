const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: "/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile._json.kakao_account.email;
          const nickName = profile.displayName;

          let user = await User.findOne({ email });

          if (!user) {
            user = new User({ email, nickName });
            await user.save();
          }

          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });

          return done(null, token);
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
