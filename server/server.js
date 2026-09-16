import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const { default: requestRoutes } = await import("./routes/requests.js");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/requests", requestRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Craftsman Request API is running"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});