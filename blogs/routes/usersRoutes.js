import express from "express";
import * as User from "../database/user.js";
const router = express.Router();
import bcrypt from "bcrypt";

router.get("/", (req, res) => {
  const users = User.getUsers();
  res.json(users);
});
/////////////////////////////////////////////////////////////////////////////
router.get("/", (req, res) => {
  const getUsers = user;
  return res.status(200).json;
});

router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required." });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
});

router.put("/:id", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required." });
  }

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }
});

router.delete("/", (req, res) => {
  database.deleteUser(+req.params.id);
  res.status(200).json({ message: "Delete successful." });
});

export default router;
