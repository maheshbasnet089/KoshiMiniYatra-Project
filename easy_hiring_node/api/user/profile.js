const { getMe } = require("../../controller/user/profile");
const { verifyToken } = require("../../middleware/auth/authjwt");
const catchAsync = require("../../services/catchAsync");

const router = require("express").Router();

router.route("/").get(catchAsync(verifyToken), catchAsync(getMe));

module.exports = router;
