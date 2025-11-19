import React, { useEffect, useState } from "react";
import "../Styles/MyAppointments.css";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // 🔹 Step 1: Check if token exists
        const token = localStorage.getItem("token");
       

        if (!token) {
          
          setError("No token found. Please login again.");
          setLoading(false);
          return;
        }

        // 🔹 Step 2: Make the API call
        
        const res = await fetch("http://localhost:5001/api/appointments/my", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        

        // 🔹 Step 3: Parse the response
        const data = await res.json();
        

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch appointments");
        }

        // 🔹 Step 4: Update state
        setAppointments(data.bookings || []);
        
      } catch (err) {
        
        setError(err.message);
      } finally {
        // 🔹 Step 5: Stop loading
        
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []); // ✅ Only run once when mounted

  // 🔹 Step 6: Log whenever appointments change
  useEffect(() => {

  }, [appointments]);



  


  return (
    <div className="my-appointments-wrapper">
    

      {/* Main Content */}
      <main className="appointments-main">
        <div className="appointments-header">
          <h2>📅 My Appointments</h2>
          <p>View and manage your upcoming medical appointments</p>
        </div>

        {appointments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No Appointments Yet</h3>
            <p>You haven't booked any appointments. Start by finding a doctor!</p>
            <button className="back-btn" onClick={() => window.history.back()}>
              Find Doctors
            </button>
          </div>
        ) : (
          <div className="appointments-grid">
            {appointments.map((item) => (
              <div key={item._id} className="appointment-detail-card">
                {/* Card Header */}
                <div className="card-header">
                  <div className="doctor-icon">👨‍⚕️</div>
                  <div className="card-title">
                    <h3>{item.doctorName}</h3>
                    <p className="specialization">{item.category}</p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="card-body">
                  <div className="info-row">
                    <div className="icon">🏥</div>
                    <div>
                      <p className="label">Hospital</p>
                      <p className="value">{item.hospital}</p>
                    </div>
                  </div>

                  <div className="info-row">
                    <div className="icon">📅</div>
                    <div>
                      <p className="label">Date</p>
                      <p className="value">{item.date}</p>
                    </div>
                  </div>

                  <div className="info-row">
                    <div className="icon">🕐</div>
                    <div>
                      <p className="label">Time</p>
                      <p className="value">{item.time}</p>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="card-footer">
                  <span className={`status-badge status-${item.status?.toLowerCase()}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyAppointments;