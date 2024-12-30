import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import recordsRouter from "./routes/records.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 8888;

app.use("/api/records", recordsRouter);

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}/`);
});
