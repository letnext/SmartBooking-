import React, { useEffect, useState } from "react";
import "../Styles/HospitalDashboard.css";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HospitalDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // ✅ Fetch all bookings (Admin)
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login again.");
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:5001/api/appointments/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to fetch bookings");
      }

      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (err) {
      console.error("❌ Fetch Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update Booking Status (Approve / Reject)
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please login again.");
        return;
      }

      const res = await fetch(`http://localhost:5001/api/appointments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update status");
        return;
      }

      // Update UI instantly
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: data.booking.status } : b
        )
      );

      alert(`Appointment ${status} successfully`);
    } catch (err) {
      console.error("❌ Status Update Error:", err.message);
      alert("Error updating booking status");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    if (filterStatus === "All") return true;
    return booking.status === filterStatus;
  });

  // Stats
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "Pending").length,
    approved: bookings.filter((b) => b.status === "Approved").length,
    cancelled: bookings.filter((b) => b.status === "Cancelled").length,
  };

  // ====== Loading State ======
  if (loading) {
    return (
      <div className="hospital-dashboard">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading appointments...</p>
        </div>
      </div>
    );
  }

  // ====== Error State ======
  if (error) {
    return (
      <div className="hospital-dashboard">
        {/* 🔙 Mobile Back Button */}
        <button className="mobile-back-btn" onClick={() => navigate("/admin-dashboard")}>
          <ArrowLeft size={22} />
        </button>

        <div className="error-container">
          <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // ====== MAIN RETURN ======
  return (
    <div className="hospital-dashboard">

      {/* 🔙 MOBILE BACK BUTTON */}
      <button className="mobile-back-btn" onClick={() => navigate("/admin-dashboard")}>
        <ArrowLeft size={22} />
      </button>

      <div className="dashboard-header">
        <h1>Hospital Dashboard</h1>
        <p className="subtitle">Manage and review all appointment requests</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Appointments</p>
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{stats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className="stat-card approved">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.approved}</h3>
            <p>Approved</p>
          </div>
        </div>
        <div className="stat-card cancelled">
          <div className="stat-icon">❌</div>
          <div className="stat-content">
            <h3>{stats.cancelled}</h3>
            <p>Cancelled</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button className={`filter-tab ${filterStatus === "All" ? "active" : ""}`}
          onClick={() => setFilterStatus("All")}
        >
          All ({bookings.length})
        </button>

        <button className={`filter-tab ${filterStatus === "Pending" ? "active" : ""}`}
          onClick={() => setFilterStatus("Pending")}
        >
          Pending ({stats.pending})
        </button>

        <button className={`filter-tab ${filterStatus === "Approved" ? "active" : ""}`}
          onClick={() => setFilterStatus("Approved")}
        >
          Approved ({stats.approved})
        </button>

        <button className={`filter-tab ${filterStatus === "Cancelled" ? "active" : ""}`}
          onClick={() => setFilterStatus("Cancelled")}
        >
          Cancelled ({stats.cancelled})
        </button>
      </div>

      {/* Bookings Grid */}
      {filteredBookings.length === 0 ? (
        <div className="empty-state">
          <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <p>No appointments found</p>
        </div>
      ) : (
        <div className="bookings-grid">
          {filteredBookings.map((item) => (
            <div key={item._id} className={`booking-card ${item.status.toLowerCase()}`}>
              <div className="card-header">
                <div className="doctor-info">
                  <div className="doctor-avatar">
                    {item.doctorName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3>{item.doctorName}</h3>
                    <span className="category-badge">{item.category}</span>
                  </div>
                </div>
                <span className={`status-badge ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>

              <div className="card-body">
                <div className="info-row">
                  <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <div>
                    <span className="info-label">Patient</span>
                    <span className="info-value">{item.user?.fullName || "Unknown User"}</span>
                  </div>
                </div>

                <div className="info-row">
                  <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <div>
                    <span className="info-label">Email</span>
                    <span className="info-value">{item.user?.email || "N/A"}</span>
                  </div>
                </div>

                <div className="info-row">
                  <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <div>
                    <span className="info-label">Hospital</span>
                    <span className="info-value">{item.hospital}</span>
                  </div>
                </div>

                <div className="appointment-time">
                  <div className="time-item">
                    <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>{item.date}</span>
                  </div>
                  <div className="time-item">
                    <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="card-footer">
                {item.status === "Pending" ? (
                  <div className="action-buttons">
                    <button className="btn btn-approve"
                      onClick={() => updateStatus(item._id, "Approved")}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Approve
                    </button>

                    <button className="btn btn-reject"
                      onClick={() => updateStatus(item._id, "Cancelled")}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                      Reject
                    </button>
                  </div>
                ) : (
                  <div className="status-message">
                    {item.status === "Approved" ? (
                      <span className="approved-msg">✓ Appointment Approved</span>
                    ) : (
                      <span className="rejected-msg">✗ Appointment Rejected</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HospitalDashboard;
