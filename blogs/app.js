import express from "express";
import cors from "cors";

import usersRoutes from "./routes/usersRoutes.js";
import postsRoutes from "./routes/postsRoutes.js";

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`a szerver a ${port} porton fut.`);
});
