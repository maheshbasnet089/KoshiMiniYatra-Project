let { Category, Sequelize } = require("./../../model");

exports.addCategory = async (req, res, next) => {
  // console.log(req.body);
  const name = req.body.name;
  const imagePath = req.file.filename;

  if (!name)
    return res.status(400).send({
      message: "Name is required",
    });
  let category = await Category.create({
    name,
    image: `http://localhost:3000/${imagePath}`,
  });
  if (category) {
    res.status(200).send({
      message: "Success",
    });
  } else {
    res.status(400).send({
      message: "Failed",
    });
  }
};

exports.getAllCategory = async (req, res, next) => {
  let category = await Category.findAll();
  if (category) {
    res.status(200).send({
      message: "Success",
      category,
    });
  } else {
    res.status(400).send({
      message: "Failed",
    });
  }
};

exports.postEditCategory = async (req, res, next) => {
  let category = await Category.update(
    { ...req.body },
    { where: { id: req.params.id } }
  );
  if (category) {
    res.status(200).send({
      message: "Success",
    });
  } else {
    res.status(400).send({
      message: "Failed",
    });
  }
};
exports.getOneCategory = async (req, res, next) => {
  let category = await Category.findAll({
    where: {
      [Sequelize.Op.or]: [{ id: req.params.id }, { name: req.params.id }],
    },
  });
  if (category) {
    res.status(200).send({
      message: "Success",
      category,
    });
  } else {
    res.status(400).send({
      message: "Failed",
    });
  }
};

exports.deleteCategory = async (req, res) => {
  console.log("hello");
  let category = await Category.destroy({
    where: { id: req.params.id },
  });

  if (category) {
    res.status(200).send({
      message: "Success",
    });
  } else {
    res.status(400).send({
      message: "Failed",
    });
  }
};
