import React, { useState } from "react";

import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../Styles/DoctorList.css";

const DoctorList = ({ doctors, error, loading }) => {
    const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("all");

  // Get unique specialities
  const specialities = ["all", ...new Set(doctors.map(doc => doc.speciality))];

  // Filter doctors
  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpeciality = selectedSpeciality === "all" || doc.speciality === selectedSpeciality;
    return matchesSearch && matchesSpeciality;
  });

  return (
    <div className="premium-doctor-container">
         <button className="mobile-back-btn" onClick={() => navigate("/admin-dashboard")}>
                <ArrowLeft size={22} />
              </button>
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Meet our Medical Professionals</h1>
          <p className="hero-subtitle">Connect with experienced healthcare specialists</p>
        </div>
        <div className="hero-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="filters-section">
          <div className="search-box">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search by name or hospital..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-dropdown">
            <svg className="filter-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 7H21M6 12H18M9 17H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <select
              value={selectedSpeciality}
              onChange={(e) => setSelectedSpeciality(e.target.value)}
              className="speciality-select"
            >
              {specialities.map(spec => (
                <option key={spec} value={spec}>
                  {spec === "all" ? "All Specialities" : spec}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading medical professionals...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/>
              <path d="M12 8V12M12 16H12.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <p>{error}</p>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <path d="M9 11C9 12.1046 8.10457 13 7 13C5.89543 13 5 12.1046 5 11C5 9.89543 5.89543 9 7 9C8.10457 9 9 9.89543 9 11Z" 
                    fill="#94a3b8"/>
              <path d="M19 11C19 12.1046 18.1046 13 17 13C15.8954 13 15 12.1046 15 11C15 9.89543 15.8954 9 17 9C18.1046 9 19 9.89543 19 11Z" 
                    fill="#94a3b8"/>
              <path d="M7 17C7 17 9 19 12 19C15 19 17 17 17 17" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <p>No doctors found matching your criteria</p>
          </div>
        ) : (
          <div className="doctors-grid">
            {filteredDoctors.map((doc, index) => (
              <div 
                key={doc._id} 
                className="doctor-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-header">
                  <div className="avatar">
                    {doc.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="doctor-info">
                    <h3 className="doctor-name">{doc.name}</h3>
                    <span className="speciality-badge">{doc.speciality}</span>
                  </div>
                </div>
                
                <div className="card-details">
                  <div className="detail-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21M19 21H21M19 21H15M5 21H3M5 21H9M9 21V17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17V21M9 21H15M9 7H10M9 11H10M14 7H15M14 11H15" 
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>{doc.hospital}</span>
                  </div>
                  
                  <div className="detail-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>{doc.experience} years experience</span>
                  </div>
                </div>

               
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorList;