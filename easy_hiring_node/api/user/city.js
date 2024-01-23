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

router.route("/").get(getAllCity).post(upload.single("image"), addCity);

router.route("/:id").delete(deleteCity).get(getCity);

module.exports = router;
