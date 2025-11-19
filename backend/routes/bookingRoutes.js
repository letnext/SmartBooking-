import express from "express";
import {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, createBooking);
router.get("/get", verifyToken, getAllBookings);
router.get("/my", verifyToken, getUserBookings);
router.put("/:id", verifyToken, updateBookingStatus);

// 🔹 Helpful logging for invalid routes
router.use((req, res) => {
  console.warn(`❌ Invalid Appointments route accessed: ${req.originalUrl}`);
  res.status(404).json({ message: "Appointments route not found" });
});

export default router;
