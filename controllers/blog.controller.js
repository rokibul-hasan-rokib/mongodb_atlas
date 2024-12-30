const blogModel = require("../models/blog.model");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    res.status(200).json({
      success: true,
      message: "Blog get successfully",
      blogs,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Blog Not Found",
      error,
    });
  }
};

exports.createBlog = async (req, res) => {
  const { title, description } = req.body;

  try {
    const blog = await blogModel.create({
      title,
      description,
    });
    res.status(200).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Blog Not Found",
      error,
    });
  }
};

exports.blogUpdate = async (req, res) => {
  try {
    const blog = await blogModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Blog Updated Successfully",
      blog,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Blog Not Found",
      error,
    });
  }
};

exports.blogDelete = async (req, res) => {
  try {
    const blog = await blogModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Blog Deleted Successfully",
      blog,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Blog Not Found",
      error,
    });
  }
}

exports.getBlogById = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Blog Found Successfully",
      blog,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Blog Not Found",
      error,
    });
  }
}