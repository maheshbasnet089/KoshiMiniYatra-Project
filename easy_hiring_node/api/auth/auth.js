const express = require("express");
const router = express.Router();

//User controler calling for register
const authController = require("../../controller/auth/auth");
const { multer, storage } = require("./../../services/multerConfig");
const catchAsync = require("../../services/catchAsync");
const upload = multer({ storage: storage });

router.post(
  "/register",
  upload.fields([{ name: "image" }, { name: "citizenship" }]),
  catchAsync(authController.register)
);
router.post("/login", catchAsync(authController.login));
router.get("/getEmails", catchAsync(authController.getEmailOfUser));
router.post("/sendEmailToUsers", catchAsync(authController.sendEmailToUsers));
router.post("/logOut", catchAsync(authController.logout));
router.get("/getUsers", catchAsync(authController.getAllUsers));
router.delete("/users/:id", catchAsync(authController.deleteUser));
router.patch("/updatePassword", upload.single("image"),catchAsync(authController.updatePassword));
router.get("/waitingList", catchAsync(authController.getWaitingUsers));
router.post("/waitingList/:id", catchAsync(authController.acceptUser));
router.delete("/user/:id", catchAsync(authController.deleteUser));
router.post("/salary", catchAsync(authController.createSalary));
router.get("/salary", catchAsync(authController.getSalary));
router.delete("/salary/:id", catchAsync(authController.deleteSalary));

router.post("/updateRating/:id",catchAsync(authController.updateUserRating))
// router.post("/salary",authControll)

module.exports = router;
