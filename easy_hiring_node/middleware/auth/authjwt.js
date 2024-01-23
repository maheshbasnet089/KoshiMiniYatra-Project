const jwt = require("jsonwebtoken");
const config = require("./../../config/auth.config");
const db = require("./../../model/index");
const Logout = db.Logout;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.cookies.token;
  console.log(token);

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isLogedOut = (req, res, next) => {
  let token = req.headers["x-access-token"];

  Logout.findOne({ where: { token: token } })
    .then((result) => {
      if (!result) {
        next();
      } else {
        return res.status(400).send({
          message: "You are not logedin!!",
        });
      }
    })
    .catch((err) => {
      res.send({
        message: "Invalid Token!",
      });
      return;
    });
};

// isAdmin = (req, res, next) => {
//   Admin.findByPk(req.userId)
//     .then((user) => {
//       user
//         .getRoles()
//         .then((roles) => {
//           for (let i = 0; i < roles.length; i++) {
//             if (roles[i].name === "admin") {
//               next();
//               return;
//             }
//           }

//           res.send({
//             message: "Require Admin Role!",
//           });
//           return;
//         })
//         .catch((err) => {
//           res.send({
//             message: "Not A Admin!",
//           });
//         });
//     })
//     .catch((err) => {
//       res.send({
//         message: "Role Not Found",
//       });
//     });
// };

/* isModerator = (req, res, next) => {
  Admin.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "superAdmin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Moderator Role!",
      });
    });
  });
}; */

/* isModeratorOrAdmin = (req, res, next) => {
  Admin.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "superAdmin") {
          next();
          return;
        }
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Moderator or Admin Role!",
      });
    });
  });
}; */

const authJwt = {
  verifyToken: verifyToken,
  //   isAdmin: isAdmin,
  isLogedOut: isLogedOut,
  /*   isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin, */
};
module.exports = authJwt;
