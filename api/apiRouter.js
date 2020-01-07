const router = require("express").Router();

const authRouter = require("./auth/authRouter");
const restaurantRouter = require("./restaurants/restaurantRouter");

router.use("/auth", authRouter);
router.use("/restaurants", restaurantRouter);

module.exports = router;
