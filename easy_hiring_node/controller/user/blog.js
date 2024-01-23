let { Blog } = require("./../../model");

exports.addBlog = async (req, res) => {
  const { title, description, category, date } = req.body;
  const imagePath = req.file.filename;

 
  if (!title || !description || !category || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const blog = await Blog.create({
      title,
      description,
      category,
      date,
      image: `http://localhost:3000/${imagePath}`,
    });
    res.status(200).json({ message: "Blog added successfully" });
  } catch (error) {
    console.log(error)
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
