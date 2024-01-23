const express = require('express');
const { addBlog, getAllBlog, deleteBlog, getBlogById } = require('../../controller/user/blog');
const router = express.Router();
const { multer, storage } = require("./../../services/multerConfig");
const upload = multer({ storage: storage });

router.route("/").post(upload.single("image"),addBlog).get(getAllBlog)
router.route("/:id").get(getBlogById).delete(deleteBlog)

module.exports = router ; 