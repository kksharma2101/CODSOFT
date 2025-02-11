import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDb from "./src/config/db.js";

const PORT = process.env.PORT || 2025;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("server is live");
});

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is live on ${PORT}`);
});
