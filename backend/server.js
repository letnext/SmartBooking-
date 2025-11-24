import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";

dotenv.config();
const app = express();

// ✅ CORS FIX (ALL REQUIRED ORIGINS INCLUDED)
app.use(
  cors({
    origin: [
      "http://localhost:5173",                       // Local development
      "https://smartappointmentbooking.netlify.app", // Your deployed frontend
      "https://smartbooking-1.onrender.com"          // Your backend domain (Render)
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Allow OPTIONS for all routes
app.options("*", cors());

// JSON Parsing
app.use(express.json());

// Connect MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", bookingRoutes);
app.use("/api/doctors", doctorRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("✅ Smart Booking API Running....!!!");
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
