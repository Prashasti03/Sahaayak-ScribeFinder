import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv'
import connectDB from "./utils/db.js";
import userRoute from './routes/user.route.js'
import examRequestRoute from './routes/examRequest.route.js'
import path from "path"
import { fileURLToPath } from "url";

dotenv.config({})
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOption = {
  origin: ["http://localhost:3000","http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOption));

const PORT = process.env.PORT || 5001

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// apis

app.use("/api/user",userRoute)
app.use("/api/exam",examRequestRoute)

app.listen(PORT, () => {
    connectDB()
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});
