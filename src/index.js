import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./utils/db.js";

// Import routes
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Middleware
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// connect to the database
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
