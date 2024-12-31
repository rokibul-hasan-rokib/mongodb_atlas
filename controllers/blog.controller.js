const blogModel = require("../models/blog.model");
const shopModel = require("../models/shop.model");

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
  try {
    const { title, description, shopId } = req.body;
    const shop = await shopModel.findById(shopId);
    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }
    const newBlog = await blogModel.create({
      title,
      description,
      shopId,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create blog",
      error: error.message,
    });
  }
};

exports.blogUpdate = async (req, res) => {
  try {
    const { title, description, shopId } = req.body;
    const blogId = req.params.id;
    const blog = await blogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    if (shopId) {
      const shop = await shopModel.findById(shopId);
      if (!shop) {
        return res.status(404).json({
          success: false,
          message: "Shop not found",
        });
      }
    }
    const updatedBlog = await blogModel.findByIdAndUpdate(
      blogId,
      {
        title: title || blog.title,
        description: description || blog.description,
        shopId: shopId || blog.shopId,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update blog",
      error: error.message,
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
};

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
};
