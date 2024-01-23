const { getMe } = require("../../controller/user/profile");
const { verifyToken } = require("../../middleware/auth/authjwt");

const router = require("express").Router();

router.route("/").get(verifyToken, getMe);

module.exports = router;
