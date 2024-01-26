const {
  createAppliedJob,
  getAppliedJobs,
} = require("../../controller/user/appliedJob");
const { verifyToken } = require("../../middleware/auth/authjwt");
const catchAsync = require("../../services/catchAsync");

const router = require("express").Router();
const { multer, storage } = require("./../../services/multerConfig");
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
}).fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

router
  .route("/")
  .post(catchAsync(verifyToken), upload, catchAsync( createAppliedJob))
  .get(catchAsync(verifyToken), catchAsync(getAppliedJobs));

module.exports = router;
