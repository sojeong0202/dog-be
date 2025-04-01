const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const passport = require("passport");
const User = require("../models/User");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization: Bearer <token>
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = () => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.userId);
        if (!user) return done(null, false);
        return done(null, user); // req.user에 들어감
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
