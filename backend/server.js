import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";

dotenv.config();
const app = express();

// 🟢 Middleware
app.use(cors());
app.use(express.json()); // For JSON parsing

// 🟢 Connect MongoDB
connectDB(); // <-- Just call it directly (we'll make sure it handles errors internally)

// 🟢 Routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments",bookingRoutes);
app.use("/api/doctors", doctorRoutes);

// 🧠 Root route
app.get("/", (req, res) => {
  res.send("✅ Smart Booking API Running....!!!");
});

// 🟢 Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
