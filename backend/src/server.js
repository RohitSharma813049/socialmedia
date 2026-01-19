import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import { ConnectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

/* ========== MIDDLEWARES ========== */
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173" ,// Vite default
  credentials: true
}));

/* ========== ROUTES ========== */
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

/* ========== START SERVER ========== */
const startServer = async () => {
  try {
    await ConnectDB();
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server", error.message);
  }
};

startServer();
