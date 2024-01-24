const express = require("express");
const router = express.Router();

const { multer, storage } = require("./../../services/multerConfig");
const upload = multer({ storage: storage });

//calling controller
const categoryController = require("./../../controller/user/category");
const catchAsync = require("../../services/catchAsync");

router.post("/add-category", upload.single("image"),catchAsync( categoryController.addCategory));
router.post("/edit-category/:id", catchAsync( categoryController.postEditCategory));
router.get("/get-all-category/:id", catchAsync(categoryController.getOneCategory));
router.get("/get-all-category", catchAsync(categoryController.getAllCategory));
router.get("/edit-category/:id", catchAsync(categoryController.addCategory));
router.delete("/delete-category/:id", catchAsync(categoryController.deleteCategory));

module.exports = router;
