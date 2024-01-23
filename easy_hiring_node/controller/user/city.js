let { City, Sequelize } = require("./../../model");

exports.addCity = async (req, res, next) => {
  const imagePath = req.file.filename;
  const { name } = req.body;
  let city = await City.create({
    name,
    image: `http://localhost:3000/${imagePath}`,
  });

  console.log(city);
  if (city) {
    res.status(200).send({
      message: "Success",
    });
  } else {
    res.status(400).send({
      message: "Failed",
    });
  }
};
exports.getCity = async (req, res, next) => {
  let city = await City.findAll({
    where: {
      [Sequelize.Op.or]: [{ id: req.params.id }, { name: req.params.id }],
    },
  });
  if (city) {
    res.status(200).send({
      message: "Success",
      city,
    });
  } else {
    res.status(400).send({
      message: "Failed",
    });
  }
};

exports.getAllCity = async (req, res, next) => {
  let city = await City.findAll();

  if (city) {
    res.status(200).send({
      message: "Success",
      city,
    });
  } else {
    res.status(400).send({
      message: "Failed",
    });
  }
};

exports.editCity = async (req, res, next) => {
  let city = await City.update(
    { ...req.body },
    { where: { id: req.params.id } }
  );

  if (city) {
    res.status(200).send({
      message: "Success",
    });
  } else {
    res.status(400).send({
      message: "Failed",
    });
  }
};

exports.deleteCity = async (req, res) => {
  let city = await City.destroy({
    where: { id: req.params.id },
  });

  if (city) {
    res.status(200).send({
      message: "Success",
    });
  } else {
    res.status(400).send({
      message: "Failed",
    });
  }
};
