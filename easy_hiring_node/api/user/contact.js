const express = require("express");
const router = express.Router();

//calling controller
const contactController = require("./../../controller/user/contact");
const catchAsync = require("../../services/catchAsync");

router.post("/add-contact",catchAsync(contactController.addContact));
router.get("/get-all-contact", catchAsync(contactController.getAllContact));

module.exports = router;
