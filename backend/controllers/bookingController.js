import Booking from "../models/bookingModel.js";

// === CREATE APPOINTMENT ===
export const createBooking = async (req, res) => {
  try {
    const { doctorName, category, hospital, date, time,userEmail } = req.body;
    if (!doctorName || !category || !hospital || !date || !time)
      return res.status(400).json({ message: "All fields are required" });

    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized user" });

    const newBooking = await Booking.create({
      user: userId,
      doctorName,
      category,
      hospital,
      date,
      time,
      userEmail
    });

    res.status(201).json({
      message: "✅ Appointment booked successfully",
      booking: newBooking,
    });
  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// === GET ALL BOOKINGS (for Admin) ===
export const getAllBookings = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const bookings = await Booking.find().populate("user", "fullName email");
    res.status(200).json({ bookings });
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// === GET USER BOOKINGS ===
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized user" });

    const bookings = await Booking.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ bookings });
  } catch (err) {
    console.error("❌ User Fetch Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// === UPDATE BOOKING STATUS (for Admin) ===
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedBooking)
      return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({
      message: "Booking status updated successfully",
      booking: updatedBooking,
    });
  } catch (err) {
    console.error("Status Update Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
