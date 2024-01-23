const db = require("./../../model/index");
const Profile = db.Profile;
const Users = db.Users;

//Dispalying Profile Information
exports.getProfile = async (req, res, next) => {
  let profile = await Profile.findOne({
    where: {
      userId: req.userId,
    },
    include: Users,
  });

  res.status(200).send({
    profile,
  });
};
exports.getMe = async (req, res, next) => {
  let user = await Users.findOne({
    where: {
      id: req.userId,
    },
  });

  res.status(200).send({
    user,
  });
};

//Adding Profile
exports.postProfile = async (req, res, next) => {
  if (!req.file) {
    res.status(400).send({
      message: "No file was Uploaded",
    });
    return;
  }

  let data = {
    userId: req.userId,
    image: req.file.filename,
  };

  let profile = await Profile.create(data);
  res.status(200).send({
    profile,
  });
};


// updating image
