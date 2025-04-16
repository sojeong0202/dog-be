const passport = require("passport");

const isAuthenticated = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return next({ name: "UnauthorizedError" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = { isAuthenticated };
