import React, { useState } from "react";
import "../Styles/AddDoctor.css";

 const API_BASE = import.meta.env.VITE_BASE_URL;
// const API_BASE = "http://localhost:5001/api";

const AddDoctorModal = ({ onClose }) => {
  const [form, setForm] = useState({
    name: "",
    speciality: "",
    hospital: "",
    experience: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Doctor name is required";
    }
    
    if (!form.speciality.trim()) {
      newErrors.speciality = "Speciality is required";
    }
    
    if (!form.hospital.trim()) {
      newErrors.hospital = "Hospital name is required";
    }
    
    if (!form.experience.trim()) {
      newErrors.experience = "Experience is required";
    } else if (isNaN(form.experience) || Number(form.experience) < 0) {
      newErrors.experience = "Please enter a valid number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE}/api/doctors/adding`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert("✅ Doctor Added Successfully!");
        setForm({ name: "", speciality: "", hospital: "", experience: "" });
        onClose();
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("⚠️ Server Issue: Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Doctor</h2>
          <button 
            className="close-icon" 
            onClick={onClose} 
            type="button"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Doctor Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter doctor's full name"
              value={form.name}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="speciality">Speciality</label>
            <input
              id="speciality"
              name="speciality"
              type="text"
              placeholder="e.g., Cardiology, Neurology"
              value={form.speciality}
              onChange={handleChange}
              className={errors.speciality ? "error" : ""}
            />
            {errors.speciality && <span className="error-message">{errors.speciality}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="hospital">Hospital</label>
            <input
              id="hospital"
              name="hospital"
              type="text"
              placeholder="Hospital name"
              value={form.hospital}
              onChange={handleChange}
              className={errors.hospital ? "error" : ""}
            />
            {errors.hospital && <span className="error-message">{errors.hospital}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="experience">Experience (Years)</label>
            <input
              id="experience"
              name="experience"
              type="number"
              placeholder="Years of experience"
              value={form.experience}
              onChange={handleChange}
              className={errors.experience ? "error" : ""}
              min="0"
            />
            {errors.experience && <span className="error-message">{errors.experience}</span>}
          </div>

          <div className="button-group">
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Adding...
                </>
              ) : (
                "Add Doctor"
              )}
            </button>
            <button 
              className="cancel-btn" 
              onClick={onClose} 
              type="button"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorModal;