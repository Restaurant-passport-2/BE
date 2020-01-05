const router = require("express").Router();

const authRouter = require("./auth/authRouter");

router.use("/auth", authRouter);

module.exports = router;
