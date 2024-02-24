import express from "express";
import { CreatePost, getAllPosts } from "../controllers/Posts.js";

const router =express.Router();

router.get("/", getAllPosts);

router.post("/", CreatePost);

export default router;