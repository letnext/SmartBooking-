import React, { useState } from "react";
import { Search, Users, Mail, Phone, Filter } from "lucide-react";
import "../Styles/PatientList.css";

import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
const PatientList = ({ allPatients = [], loading }) => {
   const navigate = useNavigate(); 
  const [searchTerm, setSearchTerm] = useState("");

  const demoPatients =
    allPatients.length > 0
      ? allPatients
      : [
          { _id: "1", fullName: "Sarah Johnson", email: "sarah.j@email.com", phoneNumber: "+1 (555) 123-4567" },
          { _id: "2", fullName: "Michael Chen", email: "m.chen@email.com", phoneNumber: "+1 (555) 234-5678" },
          { _id: "3", fullName: "Emma Williams", email: "emma.w@email.com", phoneNumber: "+1 (555) 345-6789" },
          { _id: "4", fullName: "James Smith", email: "j.smith@email.com", phoneNumber: "+1 (555) 456-7890" },
          { _id: "5", fullName: "Olivia Brown", email: "olivia.b@email.com", phoneNumber: "+1 (555) 567-8901" },
        ];

  const filteredPatients = demoPatients.filter(
    (p) =>
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phoneNumber.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="patient-loading">
        <div className="spinner"></div>
        <p>Loading patients...</p>
      </div>
    );
  }

  return (
    <div className="patient-container">
         <button className="mobile-back-btn" onClick={() => navigate("/admin-dashboard")}>
        <ArrowLeft size={22} />
      </button>
      <div className="patient-wrapper">
        {/* Header Section */}
        <div className="patient-header">
          <div className="header-icon">
            <Users size={26} color="#fff" />
          </div>
          <div>
            <h1>Patient Directory</h1>
            <p>Manage and view all registered patients</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Total Patients</p>
            <p className="stat-value">{demoPatients.length}</p>
          </div>

          <div className="stat-card">
            <p className="stat-label">Active Today</p>
            <p className="stat-value">{Math.floor(demoPatients.length * 0.6)}</p>
          </div>

          <div className="stat-card">
            <p className="stat-label">New This Week</p>
            <p className="stat-value">{Math.floor(demoPatients.length * 0.2)}</p>
          </div>
        </div>

        {/* Search Box */}
        <div className="search-card">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <button className="filter-btn">
            <Filter size={18} />
            Filter
          </button>
        </div>

        {/* Patients Grid */}
        <div className="patients-grid">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((p, i) => (
              <div
                className="patient-card"
                key={p._id}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="card-inner">
                  <div className="patient-avatar">
                    {p.fullName.charAt(0).toUpperCase()}
                  </div>

                  <h3 className="patient-name">{p.fullName}</h3>
                  <p className="patient-id">ID: {p._id.slice(-6)}</p>

                  <div className="info-row">
                    <div className="info-icon email">
                      <Mail  />
                    </div>
                    <span>{p.email}</span>
                  </div>

                  <div className="info-row">
                    <div className="info-icon phone">
                      <Phone size={16} />
                    </div>
                    <span>{p.phoneNumber}</span>
                  </div>

                  {/* <button className="view-btn">View Details</button> */}
                </div>
              </div>
            ))
          ) : (
            <div className="no-patient">
              <div className="no-icon">
                <Users size={40} color="#999" />
              </div>
              <h3>No patients found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientList;
