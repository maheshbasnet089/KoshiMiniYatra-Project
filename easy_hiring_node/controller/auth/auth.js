const db = require("../../model/index");
const User = db.Users;
const Logout = db.Logout;
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authConfig = require("./../../config/auth.config");
const sendTextEmail = require("../../services/sendTextMessage");
const { Salary, Users } = require("../../model/index");
const sendEmail = require("../../services/sendEmail");

exports.register = async (req, res, next) => {
  if (!req.body.role) req.body.role = "user";
  const name = req.body.name || "John ";
  console.log(req.files.image);
  console.log(req.files.citizenship);
  const imagePath = req.files.image[0].filename;
  const citizenShipPath = req.files.citizenship[0].filename;

  // Validate request
  if (
    !req.body.name &&
    !req.body.email &&
    !req.body.password &&
    !req.body.role
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const existingUser = await User.findOne({
    where: { email: req.body.email },
  });
  if (existingUser) {
    res.status(409).send({
      message: "User with this email already exists",
    });
    return;
  }
  //Creating data to database
  User.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      name,
      email: req.body.email,
      role: req.body.role,
      password: bcrypt.hashSync(req.body.password, 8),
      image: `http://localhost:3000/${imagePath}`,
      citizenShip: `http://localhost:3000/${citizenShipPath}`,
      location: req.body.location,
      rating: 3,
      phone: req.body.phone,
      tempAddress: req.body.tempAddress,
    },
  })
    .then((result) => {
      res.status(200).send({
        result,
        message: "success",
      });
    })
    .catch((err) => {
      res.status(400).send({
        err,
        message: "failed",
      });
    });
};

exports.login = async (req, res, next) => {
  //validating the data
  if (!req.body.email && !req.body.password) {
    res.status(400).send({
      message: "Please Check the input field",
    });
    return;
  }
  //finding the user
  let login = await User.findOne({ where: { email: req.body.email } });

  //Checking the user
  if (!login) {
    return res.status(200).send({
      message: "Invalid login Credential id",
    });
  }

  //password checking
  if (bcrypt.compareSync(req.body.password, login.password)) {
    //Setting up sucurity Token
    var token = jwt.sign({ id: login.id }, authConfig.secret, {
      expiresIn: 86400, // 24 hours
    });

    let newData = {
      id: login.id,
      name: login.name,
      role: login.role,
      email: login.email,
      token,
    };
    res.cookie("token", token);
    res.status(200).send({
      message: "success",
      newData,
    });
  } else {
    res.status(200).send({
      message: "Invalid login Credential password",
    });
  }
};

exports.logout = async (req, res) => {
  //   let token = req.headers["x-access-token"];
  //   let logout = await Logout.create({ token });
  res.clearCookie("token");
  res.status(200).send({
    status: 200,
    message: "success",
  });
};

exports.getEmailOfUser = async (req, res, next) => {
  try {
    let emails = await User.findAll({ attributes: ["email"] });
    res.status(200).send({
      message: "success",
      emails,
    });
  } catch (error) {
    res.status(400).send({
      message: "failed",
      error,
    });
  }
};

exports.sendEmailToUsers = async (req, res, next) => {
  const message = req.body.message;
  let emails = await User.findAll({ attributes: ["email"] });

  try {
    for (var i = 0; i < emails.length; i++) {
      await sendTextEmail({ email: emails[i].email, message });
    }
    res.status(200).json({
      message: "Message sent sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Message not sent",
      error: error.message,
    });
  }
};

exports.getAllUsers = async (req, res, next) => {
  const users = await User.findAll();
  res.status(200).send({
    message: "success",
    users,
  });
};

exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.destroy({ where: { id } });
  res.status(200).send({
    message: "success",
    user,
  });
};

exports.updatePassword = async (req, res, next) => {
  const id = req.params.id;
  const email = req.body.email
  const name = req.body.name
  let password;
  if (req.body.password !== "") {
    password = bcrypt.hashSync(req.body.password, 8);

  }
  const imagePath = req.file.filename;
  const user = await User.update({
    name,
    password,
    image: `http://localhost:3000/${imagePath}`,
  }, { where: { email } });
  res.status(200).send({
    message: "success",
    user,
  });
};

exports.getWaitingUsers = async (req, res, next) => {
  const users = await User.findAll({ where: { status: "inactive" } });
  res.status(200).send({
    message: "success",
    users,
  });
};

exports.acceptUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.update({ status: "active" }, { where: { id } });
  res.status(200).send({
    message: "success",
    user,
  });
};

exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.destroy({ where: { id } });
  res.status(200).send({
    message: "success",
    user,
  });
};

exports.createSalary = async (req, res, next) => {
  const salary = await Salary.create(req.body);
  res.status(200).send({
    message: "success",
    salary,
  });
};

exports.getSalary = async (req, res, next) => {
  const salary = await Salary.findAll();
  res.status(200).send({
    message: "success",
    salary,
  });
};

exports.deleteSalary = async (req, res, next) => {
  const id = req.params.id;
  const salary = await Salary.destroy({ where: { id } });
  res.status(200).send({
    message: "success",
    salary,
  });
};

exports.updateUserRating = async (req, res) => {
  const user = await Users.findByPk(req.params.id);
  const rating = user.rating;
  const newRating = (rating + req.body.rating) / 2;
  const updatedUser = await Users.update(
    { rating: newRating },
    { where: { id: req.params.id } }
  );
  res.status(200).send({
    message: "success",
    updatedUser,
  });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const otp = Math.floor(100000 + Math.random() * 900000);
  console.log(otp)
  const findUser = await User.findOne({ where: { email: email } });
  if (!findUser) {
    return res.json({ status: 404, message: "User not found" });
  }
  findUser.otp = otp;
  await findUser.save();
  // save otp in database
  try {
    await sendEmail({ email, subject: "Reset Password", otp: otp });
    res.status(200).send({
      status: 200,
      message: "Otp sent to your email",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {

  try {
    const { otp, password, email } = req.body;
    const findUser = await User.findOne({ where: { email: email } });
    if (!findUser) {
      return res.json({ status: 404, message: "User not found" });
    }
    if (findUser.otp != otp) {
      return res.json({ status: 404, message: "Invalid Otp" });
    }
    findUser.password = bcrypt.hashSync(password, 8);
    await findUser.save();
    res.json({
      status: 200,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.json({
      status: 400,
      message: "Error",
    });
  }

};


