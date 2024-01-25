const {
  Job,
  Category,
  Users,
  City,
  Sequelize,
  Salary,
} = require("../../model");

exports.postJob = async(req, res, next) => {
  const { title, description, pricing, type, level, location, lastDate } =
    req.body;

  console.log(req.body)
  if (
    !title ||
    !description ||
    !type ||
    !level ||
    !location ||
    !lastDate ||
    !req.file
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const imagePath = req.file.filename;

  const newJob = {
    title: req.body.title,
    description: req.body.description,
    pricing: req.body.pricing,
    type: req.body.type,
    level: req.body.level,
    location: req.body.location,
    lastDate: req.body.lastDate,
    image: `http://localhost:3000/${imagePath}`,
    userId: req.userId,
    cityId: req.body.location,
    categoryId: req.body.categoryId,
    salaryId: req.body.salaryId,
  };

  Job.create(newJob)
    .then((result) => {
      res.status(200).send({
        message: "Success",
        result,
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: "Failed",
        err,
      });
    });
};

exports.getAllJob = async(req, res, next) => {
  Job.findAll({
    include: [
      {
        model: Users,
      },
      {
        model: Category,
      },
      {
        model: City,
      },
      {
        model: Salary,
      },
    ],
  })
    .then((result) => {
      res.status(200).send({
        message: "Success",
        result,
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: "Failed",
        err,
      });
    });
};
exports.getSingelJob = (req, res, next) => {
  Job.findAll({
    where: {
      [Sequelize.Op.or]: [
        { cityId: req.params.id },
        { categoryId: req.params.id },
      ],
    },
    include: [
      {
        model: Users,
      },
      {
        model: Category,
      },
      {
        model: City,
      },
      {
        model: Salary,
      },
    ],
  })
    .then((result) => {
      res.status(200).send({
        message: "Success",
        result,
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: "Failed",
        err,
      });
    });
};
exports.getSingelJobDetail = async(req, res, next) => {
  console.log("sdfsdfdf", req.query.salaryId);
  Job.findAll({
    where: {
      [Sequelize.Op.or]: [
        { salaryId: req.query.salaryId || "" },
        { title: req.params.id },
      ],
    },
    include: [
      {
        model: Users,
      },
      {
        model: Category,
      },
      {
        model: Users,
      },
      {
        model: Salary,
      },
    ],
  })
    .then((result) => {
      console.log(result);
      res.status(200).send({
        message: "Success",
        result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({
        message: "Failed",
        err,
      });
    });
};

exports.getSingelJobByAdd = async(req, res, next) => {
  console.log('check');
  Job.findAll({
    where: {
      location: req.params.id
    },
    include: [
      {
        model: Users,
      },
      {
        model: Category,
      },
      {
        model: Users,
      },
    ],
  })
    .then((result) => {
      console.log(result);
      res.status(200).send({
        message: "Success",
        result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({
        message: "Failed",
        err,
      });
    });
};
//Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
exports.getSingelJobByCat= async(req, res, next) => {
  console.log('check');
  Job.findAll({
    where: {
      categoryId: req.params.id
    },
    include: [
      {
        model: Users,
      },
      {
        model: Category,
      },
      {
        model: Salary,
      },
    ],
  })
    .then((result) => {
      console.log(result);
      res.status(200).send({
        message: "Success",
        result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({
        message: "Failed",
        err,
      });
    });
};

exports.deleteJob = async (req, res) => {
  let job = await Job.destroy({
    where: { id: req.params.id },
  });

  if (job) {
    res.status(200).send({
      message: "Success",
    });
  } else {
    res.status(400).send({
      message: "Failed",
    });
  }
};

exports.getJobByUser = async(req, res, next) => {
  console.log("eee");
  Job.findAll({
    where: { userId: req.userId },
    include: [
      {
        model: Users,
      },
      {
        model: Category,
      },
      {
        model: City,
      },
    ],
  })
    .then((result) => {
      res.status(200).send({
        message: "hello",
        result,
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: "Failed",
        err,
      });
    });
};

exports.getJobDetail = async(req, res, next) => {
  console.log('fd');
  Job.findAll({
    where: { id: req.params.id },
    include: [
      {
        model: Users,
      },
      {
        model: Category,
      },
      {
        model: City,
      },
      {
        model: Salary,
      },
    ],
  })
    .then((result) => {
      res.status(200).send({
        message: "hello",
        result,
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: "Failed",
        err,
      });
    });
};
