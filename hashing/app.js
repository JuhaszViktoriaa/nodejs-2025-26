import express from "express";
import cors from "cors";
import * as database from "./database/database.js";
import bcrypt from "bcrypt";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.get("/users", (req, res) => {
  const users = database.getUsers();
  res.json(users);
});
app.get("/users/:id", (req, res) => {
  const user = database.getUserbyid(+req.params.id);
  if (!user) {
    return res.status(404).json({ message: "nincs ilyen felhasznalo." });
  }
  res.json(user);
});

app.post("/users", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "hianyos adat." });
  }
  const salt = await bcrypt.genSalt(24);
  const hashsedPassword = await bcrypt.hash(password, salt);
  const saved = database.saveUser(email, hashsedPassword);
  const user = database.getUserbyid(saved.lastInsertRowid);
  res.status(201).json(user);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "a megadott adatok rosszak" });
  }
  const user = database.getUserbyemail(email);
  if (!user) {
    return res.status(400).json({ message: "a megadott adatok rosszak" });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({ message: "a megadott adatok rosszak" });
  }
  res.status(200).json(user);
});

app.put("/users/:id", (req, res) => {
  const id = +req.params.id;
  let user = database.getUserbyid(id);
  if (!user) {
    return res.status(404).json({ message: "nincs ilyen felhasznalo" });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "hianyos adatok" });
  }
  const salt = bcrypt.genSaltSync();
  const hashsedPassword = bcrypt.hashSync(password, salt);
  database.updateUser(id, email, hashsedPassword);
  user = database.getUserbyid(id);
  res.status(200).json(user);
});

app.delete("/users/:id", (req, res) => {
  const id = +req.params.id;
  const user = database.getUserbyid(+req.params.id);
  if (!user) {
    return res.status(404).json({ message: "nincs ilyen felhasznalo." });
  }
  database.deleteUser(id);
  res.status(200).json({ message: "sikeres torles" });
});

app.listen(PORT, () => {
  console.log("a szerver a {PORT} porton fut.");
});
