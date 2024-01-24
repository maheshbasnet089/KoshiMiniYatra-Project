const express = require('express')
const router = express.Router()

const multer = require('multer')

const app = express()

//middleware call
const jwtMiddleware = require('./../../middleware/auth/authjwt')

//Controller Callinh
const profileController = require('./../../controller/user/profile')

const authController = require("../../controller/auth/auth");
const catchAsync = require('../../services/catchAsync')


// File Uploading with multer
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
      );
    },
  });
  
  const fileFilter = (req, file, cb) => {
    console.log(req.body);
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" 
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  let filehandler = app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
  );
  //File Uploading Ends

router.get('/profile', [jwtMiddleware.verifyToken], [jwtMiddleware.isLogedOut], catchAsync(profileController.getProfile))
router.post('/profile', [jwtMiddleware.verifyToken], [jwtMiddleware.isLogedOut], catchAsync(filehandler), catchAsync(profileController.postProfile))

router.post("/forgotpassword",catchAsync(authController.forgotPassword))
router.post("/resetpassword",catchAsync(authController.resetPassword))


module.exports = router