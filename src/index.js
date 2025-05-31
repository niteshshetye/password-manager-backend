import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./utils/db.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

connectDB()
  .then(() => {
    // Start server
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
