const express = require("express");
const router = express.Router();
const { multer, storage } = require("./../../services/multerConfig");
const upload = multer({ storage: storage });

const {
  getAllCity,
  addCity,
  deleteCity,
  getCity,
} = require("../../controller/user/city");
const authJwt = require("../../middleware/auth/authjwt");
const catchAsync = require("../../services/catchAsync");

router.route("/").get(catchAsync(getAllCity)).post(upload.single("image"), catchAsync(addCity));

router.route("/:id").delete(catchAsync(deleteCity)).get(catchAsync(getCity));

module.exports = router;
