const router = require('express').Router();

const ItemRouter = require("./ItemRouter");
const UserRouter = require("./UserRouter");

router.use(UserRouter);
router.use(ItemRouter);

module.exports = router;
