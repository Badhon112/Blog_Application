import express from "express";
import {
  blogPost,
  deleteBlog,
  getAllBlogs,
  getMyBlogs,
  getSingleBlog,
  uploadBlog,
} from "../controllers/blogController.js";
import { isAuthorized, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, isAuthorized("Author"), blogPost);
router.delete(
  "/delete/:id",
  isAuthenticated,
  isAuthorized("Author"),
  deleteBlog
);
router.get("/all", getAllBlogs);
router.get("/singleBlog/:id", isAuthenticated, getSingleBlog);
router.get("/myblogs", isAuthenticated,isAuthorized("Author"), getMyBlogs);
router.put("/update/:id", isAuthenticated,isAuthorized("Author"), uploadBlog);

export default router;
