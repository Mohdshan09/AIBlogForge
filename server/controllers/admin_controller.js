import jwt from "jsonwebtoken";
import Blog from "../models/blog.js";
import Comment from "../models/comment.js";

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email != process.env.admin_Email ||
      password != process.env.admin_Password
    ) {
      return res.json({ success: false, response: "Invalid Credentials" });
    }

    const token = jwt.sign({ email }, process.env.secretKey);

    res.json({ success: true, token: token }); //very important !
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, response: error });
  }
};

const getallblogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json({ success: true, response: blogs });
  } catch (error) {
    res.json({ success: false, response: error.message });
  }
};

const getallComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).populate("blog").sort({ createdAt: -1 });
    res.json({ success: true, comment: comments });
  } catch (error) {
    res.json({ success: false, response: error.message });
  }
};

const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });

    const dashboardData = {
      blogs,
      comments,
      drafts,
      recentBlogs,
    };

    res.json({ success: true, response: dashboardData });
  } catch (error) {
    res.json({ success: false, response: error.message });
  }
};

const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndDelete(id);
    res.json({ success: true, msg: "comment is deleted" });
  } catch (error) {
    res.json({ success: false, response: error.message });
  }
};

const approvedComment = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndUpdate(id, { isApproved: true });
    res.json({ success: true, msg: "comment approved" });
  } catch (error) {
    res.json({ success: false, response: error.message });
  }
};
export {
  adminLogin,
  getallblogsAdmin,
  getallComments,
  getDashboard,
  deleteCommentById,
  approvedComment,
};
