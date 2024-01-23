module.exports = (sequelize, Sequelize) => {
  const Salary = sequelize.define("salary", {
    name: {
      type: Sequelize.STRING,
    },
  });
  return Salary;
};
