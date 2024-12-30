const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.controller");

router.get("/blog", blogController.getAllBlogs);
router.post("/blog", blogController.createBlog);
router.get("/blog/:id", blogController.getBlogById);
router.put("/blog/:id", blogController.blogUpdate);
router.delete("/blog/:id", blogController.blogDelete);

module.exports = router;