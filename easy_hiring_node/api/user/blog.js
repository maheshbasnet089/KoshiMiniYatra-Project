const express = require('express');
const { addBlog, getAllBlog, deleteBlog, getBlogById, editBlog } = require('../../controller/user/blog');
const router = express.Router();
const { multer, storage } = require("./../../services/multerConfig");
const catchAsync = require('../../services/catchAsync');
const upload = multer({ storage: storage });

router.route("/").post(upload.single("image"),catchAsync(addBlog)).get(catchAsync(getAllBlog))
router.route("/:id").get(catchAsync(getBlogById)).delete(catchAsync(deleteBlog))
router.route("/edit/:id").get(catchAsync(getBlogById)).put(upload.single("image"),catchAsync(editBlog))

module.exports = router ; 