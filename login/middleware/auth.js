const auth_session = (req, res, next) => {
  console.log(`Auth middleware before route: ${req.url}`);
  if (!req.session.email) res.redirect("/login.html");
  else next();
};

const jwt = require("jsonwebtoken");
const auth_jwt = (req, res, next) => {
  console.log(`JWT middleware before route: ${req.url}`);

  const token = req.header("JWT");
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log(token, decoded);
    next();
  } catch (e) {
    res.status(401);
    res.send(e);
  }
};

module.exports = { auth_session, auth_jwt };
