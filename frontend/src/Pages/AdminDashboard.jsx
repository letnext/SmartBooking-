import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiBell, FiUsers } from "react-icons/fi";
import {
  AiOutlineSchedule,
  AiOutlineMedicineBox,
  AiOutlineUserAdd,
} from "react-icons/ai";
import ActionCard from "../Components/ActionCard";
import AddDoctor from "./AddDoctor";
import "../Styles/AdminDashboard.css";

const AdminDashboard = ({ allPatients = [], doctors = [] }) => {
  const navigate = useNavigate();  const upcomingAppointments = Math.floor(Math.random() * 10) + 3;

  const [showAddDoctor, setShowAddDoctor] = useState(false);

  return (
    <div className="admin-dashboard">
      
      {/* ================= NAVBAR ================= */}
      <nav className="admin-navbar">

 

        <div className="nav-left">
          <div className="nav-logo">🏥</div>
          <h2>Admin Dashboard</h2>
        </div>

        <div className="nav-right">
          <FiBell className="nav-icon" />
          <div className="nav-avatar">AD</div>
          <button className="nav-logout" onClick={() => navigate("/")}>
            <FiLogOut size={18} />
          </button>
        </div>

      </nav>

      {/* ============== MAIN CONTENT ============== */}
      <main className="dashboard-main">

        {/* Quick Action Cards */}
        <section className="actions-grid">

          <ActionCard
            title="Doctor List"
            subtext="View Doctors"
            icon={<AiOutlineMedicineBox className="dash-icon" />}
            onClick={() => navigate("/doctor-list")}
          />

          <ActionCard
            title="Patient List"
            subtext="View Patients"
            icon={<FiUsers className="dash-icon" />}
            onClick={() => navigate("/patients-list")}
          />

          <ActionCard
            title="Appointment Details"
            subtext="View Appointments"
            icon={<AiOutlineSchedule className="dash-icon" />}
            onClick={() => navigate("/hospital-dashboard")}
          />

          {/* 🔥 OPEN MODAL */}
          <ActionCard
            title="Manage Doctors"
            subtext="Add Doctors"
            icon={<AiOutlineUserAdd className="dash-icon" />}
            onClick={() => setShowAddDoctor(true)}
          />

        </section>

        {/* Stats */}
        <section className="stats">
          <div className="stat-card">
            <h4>Total Doctors</h4>
            <p>{doctors.length}</p>
          </div>

          <div className="stat-card">
            <h4>Total Patients</h4>
            <p>{allPatients.length}</p>
          </div>

          <div className="stat-card">
            <h4>Upcoming Appointments</h4>
            <p>{upcomingAppointments}</p>
          </div>
        </section>

      </main>

      {/* 🔥 SHOW MODAL */}
      {showAddDoctor && (
        <AddDoctor onClose={() => setShowAddDoctor(false)} />
      )}

    </div>
  );
};

export default AdminDashboard;
