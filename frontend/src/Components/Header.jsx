import React from "react";
import "../Styles/Header.css";

const Header = ({ title, subtitle }) => {
  return (
    <header className="dashboard-header">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="admin-info">
        <button className="notify-btn" aria-label="Notifications">🔔</button>
        <div className="admin-avatar">A</div>
      </div>
    </header>
  );
};

export default Header;