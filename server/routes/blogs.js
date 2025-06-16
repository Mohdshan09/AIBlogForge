import express from "express";
import {
  addBlog,
  addComment,
  deleteblogById,
  generateContent,
  getallBlogs,
  getblogById,
  getblogComments,
  togglePublish,
} from "../controllers/blog_controller.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", upload.single("image"), auth, addBlog);
router.get("/all", getallBlogs);
router.get("/:blogId", getblogById);
router.post("/delete", auth, deleteblogById);
router.post("/togglepublish", togglePublish);

router.post("/add-comment", addComment);
router.post("/comments", getblogComments);
router.post("/generate", auth, generateContent);

export default router;
