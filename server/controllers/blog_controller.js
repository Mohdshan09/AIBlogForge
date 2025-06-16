import fs from "fs";
import imageKit from "../config/imageKit.js";
import Blog from "../models/blog.js";
import Comment from "../models/comment.js";
import main from "../config/gemini.js";

const addBlog = async (req, res) => {
  try {
    const { title, subtitle, description, isPublished, category } = JSON.parse(
      req.body.blog
    );

    const imageFile = req.file;

    if (!title || !description || !subtitle || !category || !imageFile) {
      return res.json({ success: false, msg: "Missing required feilds" });
    }
    const fileBuffer = fs.readFileSync(imageFile.path);

    // upload image on imageKit
    const response = await imageKit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // optimization
    const optimizeImageUrl = imageKit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, //compression
        { format: "webp" }, // image-format
        { width: "1280" }, // width
      ],
    });

    const image = optimizeImageUrl;

    await Blog.create({
      title,
      subtitle,
      description,
      category,
      image,
      isPublished,
    });

    res.json({ success: true, response: "Blog added successfully" });
  } catch (error) {
    res.json({ success: false, msg: "not found !" });
  }
};

const getallBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs: blogs });
  } catch (error) {
    res.json({ success: false, response: error.message });
  }
};

const getblogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      res.json({ success: false, message: "Blog not found !" });
    }
    res.json({ success: true, response: blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const deleteblogById = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Blog ID is required" });
    }
    await Blog.findByIdAndDelete(id);

    //delete allComments
    await Comment.deleteMany({ blog: id });

    res.json({ success: true, message: "Blog is deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);

    blog.isPublished = !blog.isPublished;
    res.json({ success: true, response: "Blog status updated" });

    await blog.save();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await Comment.create({
      blog,
      name,
      content,
    });

    res.json({ success: true, response: "comment added for review" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getblogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({
      createdAt: -1,
    });

    if (comments) {
      res.json({ success: true, comment: comments });
    } else {
      res.json({ success: false, messasge: "Comment not found !" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await main(
      prompt + " Generate a blog content for this topic in simple text format"
    );

    res.json({success:true,content})
  } catch (error) {
    res.json({success:false,message:error.message});
  }
};

export {
  addBlog,
  getallBlogs,
  getblogById,
  deleteblogById,
  togglePublish,
  getblogComments,
  addComment,
  generateContent
};
