const express = require("express");

const {
  postJob,
  getAllJob,
  deleteJob,
  getSingelJob,
  getSingelJobDetail,
  getJobByUser,
  getJobDetail,
  getSingelJobByAdd,
  getSingelJobByCat,
} = require("../../controller/user/job");
const { verifyToken } = require("./../../middleware/auth/authjwt");
const router = express.Router();

//middleware call
const jwtMiddleware = require("./../../middleware/auth/authjwt");

//Controller calling

const { multer, storage } = require("./../../services/multerConfig");
const upload = multer({ storage: storage });

//File Uploading Ends

router
  .route("/")
  .post([jwtMiddleware.verifyToken], upload.single("image"), postJob)
  .get(getAllJob);
router.route("/:id").delete(deleteJob).get(getSingelJobDetail);
router.route("/detail/:id").get(getSingelJob);

router.route("/address/:id").get(getSingelJobByAdd);
router.route("/category/:id").get(getSingelJobByCat);


router.route("/getJobByUser").get([jwtMiddleware.verifyToken], getJobByUser);
router.route("/getSingleDetail/:id").get(getJobDetail);
// router.post(
//   "/get-all-job",
//   [jwtMiddleware.verifyToken],
//   [jwtMiddleware.isLogedOut],
//   filehandler,
//   jobController.getAllJob
// );

module.exports = router;
