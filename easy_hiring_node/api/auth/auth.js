const express = require("express");
const router = express.Router();

//User controler calling for register
const authController = require("../../controller/auth/auth");
const { multer, storage } = require("./../../services/multerConfig");
const upload = multer({ storage: storage });

router.post(
  "/register",
  upload.fields([{ name: "image" }, { name: "citizenship" }]),
  authController.register
);
router.post("/login", authController.login);
router.get("/getEmails", authController.getEmailOfUser);
router.post("/sendEmailToUsers", authController.sendEmailToUsers);
router.post("/logOut", authController.logout);
router.get("/getUsers", authController.getAllUsers);
router.delete("/users/:id", authController.deleteUser);
router.patch("/updatePassword", upload.single("image"),authController.updatePassword);
router.get("/waitingList", authController.getWaitingUsers);
router.post("/waitingList/:id", authController.acceptUser);
router.delete("/user/:id", authController.deleteUser);
router.post("/salary", authController.createSalary);
router.get("/salary", authController.getSalary);
router.delete("/salary/:id", authController.deleteSalary);

router.post("/updateRating/:id",authController.updateUserRating)
// router.post("/salary",authControll)

module.exports = router;
