const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

router.post("/user/signin", async (req, resp) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (! await bcrypt.compare(password, user.password))
      throw new Error("Email or password is wrong!");


    // req.session.email = email; // store unique identifier (like userID) in session
    // send the session cookie back to client in response header, so it can send it on future requests


    // const signed_jwt = jwt.sign(req.body, process.env.JWT_KEY);
    // res.setHeader("JWT", signed_jwt);

    resp.status(200).send({ redirect: "/item" });
  } catch (e) {
    // 401: Unauthorized
    console.log(e);
    resp.status(401).send({ errorMsg: e.message, redirect: "/login.html" });
  }
});


router.post("/user/signup", async (req, resp) => {
  try {
    // console.log(req.body);
    req.body.password = await bcrypt.hash(req.body.password, Number(process.env.SALT));
    await User.create(req.body);

    // 201: Successful & Resource Created
    resp.status(201).send('Successfully registered.');
  } catch (e) {
    // 400: Bad Request
    console.log(e);
    resp.status(400).send(e);
  }
});

module.exports = router;
