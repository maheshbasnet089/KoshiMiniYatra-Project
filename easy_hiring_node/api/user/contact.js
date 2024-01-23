const express = require("express");
const router = express.Router();

//calling controller
const contactController = require("./../../controller/user/contact");

router.post("/add-contact",contactController.addContact);
router.get("/get-all-contact", contactController.getAllContact);

module.exports = router;
