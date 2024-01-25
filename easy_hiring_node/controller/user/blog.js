let { Blog } = require("./../../model");
const fs = require('fs');

exports.addBlog = async (req, res) => {
  const { title, content, description, category, date } = req.body;
  const imagePath = req.file.filename;

  if (!title || !description || !category || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const blog = await Blog.create({
      title,
      content,
      description,
      category,
      date,
      image: `http://localhost:3000/${imagePath}`,
    });
    res.status(200).json({ message: req.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
exports.getAllBlog = async (req, res) => {
  try {
    const blog = await Blog.findAll();
    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
exports.getBlogById = async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) {
    return res.status(400).json({ message: "Blog not found" });
  }
  res.status(200).json({ blog });
};

exports.deleteBlog = async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) {
    return res.status(400).json({ message: "Blog not found" });
  }
  await blog.destroy();
  res.status(200).json({ message: "Blog deleted successfully" });
};

// edit blogsssssssss

exports.editBlog = async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  // console.log(req.body.title);
  // console.log(req.file);
  // const formData = req.body;
  // console.log(formData);

  const { title, content, description, category, date } = req.body;
  // const imagePath = req.file.filename;
  let fileName;
  if (req.file) {
    fileName = req.file.filename;
  }
  // console.log(fileName)

  const oldData = await Blog.findAll({
    where: {
      id: id,
    },
  });

  const oldFileName = oldData[0].image;
  const lengthToCut = "http://localhost:3000/".length;

  const oldFileNameAfterCut = oldFileName.slice(lengthToCut);
  // console.log(oldFileNameAfterCut);

  if (fileName) {
    // delete old because naya aairaxa
    fs.unlink("./uploads/" + oldFileNameAfterCut, (err) => {
      if (err) {
        console.log("error occured", err);
      } else {
        console.log("Old File Deleted successfully");
      }
    });
  }

  if (!title || !description || !category || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }
  imagePath = fileName ? fileName : oldFileNameAfterCut
  try {
    const blog = await Blog.update(
      {
        title,
        content,
        description,
        category,
        date,
        image: `http://localhost:3000/${imagePath}`,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).json({ message: req.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
