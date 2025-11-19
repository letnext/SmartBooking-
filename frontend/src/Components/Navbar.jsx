import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState(false);

  const isDashboard = location.pathname === "/dashboard";

  const handleAppointments = () => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    navigate("/appointments", { state: { appointments: storedAppointments } });
    setOpenMenu(false);
  };

  const handleCategory = () => {
    const storedDoctors = JSON.parse(localStorage.getItem("doctors") || "[]");
    navigate("/categories", { state: { doctors: storedDoctors } });
    setOpenMenu(false);
  };

  const handleDashboard = () => {
    navigate("/dashboard");
    setOpenMenu(false);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <nav className="navbar">

      <div className="nav-left">

        {/* SHOW BACK BUTTON ONLY WHEN NOT ON DASHBOARD */}
        {!isDashboard && (
          <div className="mobile-back" onClick={() => navigate(-1)}>
            {"<"}
          </div>
        )}

        {/* SHOW TOGGLE ONLY ON DASHBOARD */}
        {isDashboard && (
          <div className="mobile-toggle" onClick={() => setOpenMenu(!openMenu)}>
            {openMenu ? "✖" : "☰"}
          </div>
        )}

        <div className="nav-brand" onClick={handleDashboard}>
          <h2>🩺 MediConnect</h2>
        </div>

      </div>

      {/* MENU */}
      <ul className={`nav-menu ${openMenu ? "open" : ""}`}>
        <li
          className={`nav-item ${isDashboard ? "active" : ""}`}
          onClick={handleDashboard}
        >
          Doctors
        </li>

        <li
          className={`nav-item ${location.pathname === "/appointments" ? "active" : ""}`}
          onClick={handleAppointments}
        >
          My Appointments
        </li>

        <li
          className={`nav-item ${location.pathname === "/categories" ? "active" : ""}`}
          onClick={handleCategory}
        >
          Categories
        </li>

        <li className="nav-item" onClick={handleLogout}>
          Logout
        </li>
      </ul>

    </nav>
  );
};

export default Navbar;
