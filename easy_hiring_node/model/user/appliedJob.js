module.exports = (sequelize, Sequelize) => {
  const AppliedJob = sequelize.define("appliedJob", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    jobId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    coverLetter: {
      type: Sequelize.STRING,
    },
    video: {
      type: Sequelize.STRING,
    },
  });
  return AppliedJob;
};
