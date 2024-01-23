const sendTextEmail = require("../../services/sendTextMessage");
let { AppliedJob, Job, Users } = require("./../../model");

exports.createAppliedJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;
    const imagePath = req.files.image[0].filename || null;
    console.log(req.files);
    let videoPath = null;
    if (req.files.video) videoPath = req.files.video[0].filename;

    const userIdFromJobTable = await Job.findOne({
      where: {
        id: jobId,
      },
    });
    console.log("userId", userIdFromJobTable.userId);
    const user = await Users.findOne({
      where: {
        id: userIdFromJobTable.userId,
      },
    });
    console.log("user", user.email);

    const userId = req.userId;
    const appliedJob = await AppliedJob.create({
      jobId,
      userId,
      image: `http://localhost:3000/${imagePath}`,
      coverLetter,
      video: `http://localhost:3000/${videoPath}`,
    });

    const message = `You have a new application ${coverLetter} http://localhost:3000/${imagePath} http://localhost:3000/${videoPath} `;
    try {
      // sendTextMessage(user.email, "You have a new application");
      await sendTextEmail({ email: user.email, message });
      console.log("message sent sucessfully");
    } catch (error) {
      console.log(error);
    }
    res.status(201).json({
      status: "success",
      appliedJob,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getAppliedJobs = async (req, res) => {
  const appliedJobs = await AppliedJob.findAll({
    where: {
      userId: req.userId,
    },
    include: [
      {
        model: Job,
      },
    ],
  });
  const createdJobs = await Job.findAll({
    where: {
      userId: req.userId,
    },
    include: [
      {
        model: Users,
      },
    ],
  });
  res.status(200).json({
    status: "success",
    appliedJobs,
    createdJobs,
  });
};
