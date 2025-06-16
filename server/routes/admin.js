import express from "express";
import {
  adminLogin,
  approvedComment,
  deleteCommentById,
  getallblogsAdmin,
  getallComments,
  getDashboard,
} from "../controllers/admin_controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/comments", auth, getallComments);
router.get("/blogs", auth, getallblogsAdmin);
router.post("/delete-comment", deleteCommentById);
router.post("/approved-comment", auth, approvedComment);
router.get("/dashboard", auth, getDashboard);

export default router;
