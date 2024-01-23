module.exports = (sequelize, Sequelize) => {
  const Blog = sequelize.define("blog", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },

    category: {
      type: Sequelize.STRING,
    },

    date: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
  });
  return Blog;
};
