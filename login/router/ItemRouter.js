const router = require("express").Router();
const { auth_session, auth_jwt } = require("../middleware/auth");

// router.get("/item", auth_session, (req, res) => {
// router.get("/item", auth_jwt, (req, res) => {
router.get("/item", (req, res) => {
  res.status(200).send(
    `<html>
      <body>
        <h2>Index Page</h2>
        <hr/>
        <h3>Welcome!</h3>
        <h3>You have successfully logged in. Here's some confidential information.</h3>
      </body>
    </html>`
  );
});
module.exports = router;
