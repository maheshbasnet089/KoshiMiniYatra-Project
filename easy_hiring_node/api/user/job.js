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
const catchAsync = require("../../services/catchAsync");
const upload = multer({ storage: storage });

//File Uploading Ends

router
  .route("/")
  .post([jwtMiddleware.verifyToken], upload.single("image"), catchAsync(postJob))
  .get(catchAsync(getAllJob));
router.route("/:id").delete(catchAsync(deleteJob)).get(catchAsync(getSingelJobDetail));
router.route("/detail/:id").get(catchAsync(getSingelJob));

router.route("/address/:id").get(catchAsync(getSingelJobByAdd));
router.route("/category/:id").get(catchAsync(getSingelJobByCat));


router.route("/getJobByUser").get([jwtMiddleware.verifyToken], catchAsync(getJobByUser));
router.route("/getSingleDetail/:id").get(catchAsync(getJobDetail));
// router.post(
//   "/get-all-job",
//   [jwtMiddleware.verifyToken],
//   [jwtMiddleware.isLogedOut],
//   filehandler,
//   jobController.getAllJob
// );

module.exports = router;
