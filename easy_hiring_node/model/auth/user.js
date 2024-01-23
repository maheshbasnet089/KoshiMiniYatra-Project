module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.STRING,
    },
    rating: {
      type: Sequelize.INTEGER,
      default: 3,
    },
    phone: {
      type: Sequelize.STRING,
    },
    tempAddress: {
      type: Sequelize.STRING,
    },
    citizenShip: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM("active", "inactive"),
      defaultValue: "inactive",
    },
    image:{
      type: Sequelize.STRING,
    },
    otp: {
      type: Sequelize.STRING,
    },

    
  });

  return User;
};
