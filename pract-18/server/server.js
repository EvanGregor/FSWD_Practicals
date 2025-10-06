import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import quoteRoutes from "./routes/quoteRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
const MONGO_URI = "mongodb://localhost:27017/pract18";
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/quotes", quoteRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
