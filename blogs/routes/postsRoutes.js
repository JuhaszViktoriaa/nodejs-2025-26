import { Router } from "express";
import * as Post from "../database/post.js";
const router = Router();

router.get("/", (req, res) => {
  const posts = Post.getPosts();
  res.json(posts);
});

router.get("/", (req, res) => {
  const getPosts = post;
  return res.status(200).json;
});

router.post("/:id", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "title and content required." });
  }
});

router.put("/:id", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "title and content required." });
  }

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }
});

router.delete("/", (req, res) => {
  database.deletePost(+req.params.id);
  res.status(200).json({ message: "Delete successful." });
});

export default router;
