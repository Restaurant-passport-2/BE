const router = require("express").Router();

const authRouter = require("./auth/authRouter");
const passportRouter = require("./passport/passportRouter");
const restaurantRouter = require("./restaurants/restaurantRouter");

router.use("/auth", authRouter);
router.use("/passport", passportRouter);
router.use("/restaurants", restaurantRouter);

module.exports = router;
