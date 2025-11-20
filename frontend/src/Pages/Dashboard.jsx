import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Dashboard.css";
import Navbar from "../Components/Navbar.jsx";

const Dashboard = ({ doctors }) => {
  const [user, setUser] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_BASE_URL;
  // const API_BASE = "http://localhost:5001/api/appointments";

  // Load logged-in user
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedUser) {
      navigate("/register");
      return;
    }
    setUser(loggedUser.user);
  }, [navigate]);

  // When user clicks "Book Appointment"
  const handleBook = (doctor) => {
    setSelectedDoctor(doctor);
    setPopupMessage("");
    setDate("");
    setTime("");
  };

  // Confirm Booking
  const confirmBooking = async () => {
    if (!date || !time) {
      setPopupMessage("⚠️ Please select date and time!");
      return;
    }

    setLoading(true);

    try {
      const tokenData = JSON.parse(localStorage.getItem("loggedInUser"));
      const token = tokenData?.token;

      if (!token) {
        setPopupMessage("⚠️ Please log in again. Token missing!");
        setLoading(false);
        navigate("/register");
        return;
      }

      // FIX: Map categories correctly 
      const bookingData = {
        doctorName: selectedDoctor.name,
        category:
          selectedDoctor.speciality ||
          selectedDoctor.specialization ||
          selectedDoctor.category,
        hospital: selectedDoctor.hospital,
        date,
        time,
         userEmail: user.email 
      };
 console.log(bookingData.userEmail);
      const res = await fetch(`${API_BASE}/api/appointments/create`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        setPopupMessage(`⚠️ ${data.message || "Booking failed"}`);
        setLoading(false);
        return;
      }

      setPopupMessage("✅ Appointment booked successfully!");
      setLoading(false);

      setTimeout(() => {
        setSelectedDoctor(null);
        setPopupMessage("");
        navigate("/appointments");
      }, 1200);
    } catch (err) {
      console.error("Booking Error:", err);
      setPopupMessage("❌ Server error while booking. Please try again.");
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/register");
  };

  const handleAppointments = () => navigate("/appointments");
  const handleCategory = () => navigate("/categories", { state: { doctors } });

  return (
    <div className="dashboard-wrapper">
      {/* Navbar */}
      <Navbar
        onAppointments={handleAppointments}
        onCategories={handleCategory}
        onLogout={handleLogout}
      />

      {/* Main Section */}
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h2>Welcome, {user?.fullName || "User"} 👋</h2>
          <p>Find and book appointments with top doctors easily.</p>
        </div>

        <div className="doctors-section">
          <h3>Make your doctor’s appointment here 👇</h3>

          <div className="doctor-grid">
            {doctors.map((doc) => (
              <div className="doctor-card" key={doc._id || doc.id}>
                <div className="doctor-info">
                  <img
                    src={
                      doc.image ||
                      "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                    }
                    alt={doc.name}
                  />

                  <div>
                    <h4>{doc.name}</h4>
                    <p>{doc.speciality || doc.specialization}</p>
                    <small>{doc.hospital}</small>
                    <span>{doc.experience}</span>
                  </div>
                </div>

                <button onClick={() => handleBook(doc)}>Book Appointment</button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      {selectedDoctor && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Book Appointment</h3>

            <div className="modal-doctor">
              <img
                src={
                  selectedDoctor.image ||
                  "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                }
                alt={selectedDoctor.name}
              />
              <div>
                <h4>{selectedDoctor.name}</h4>
                <p>{selectedDoctor.speciality || selectedDoctor.specialization}</p>
                <small>{selectedDoctor.hospital}</small>
              </div>
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            {popupMessage && (
              <p className={popupMessage.includes("✅") ? "success" : "error"}>
                {popupMessage}
              </p>
            )}

            <div className="modal-actions">
              <button
                onClick={confirmBooking}
                className="confirm-btn"
                disabled={loading}
              >
                {loading ? "Booking..." : "Confirm"}
              </button>

              <button
                onClick={() => setSelectedDoctor(null)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
