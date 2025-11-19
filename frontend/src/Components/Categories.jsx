import React from "react";
import "../Styles/Categories.css";
import { useNavigate } from "react-router-dom";
import "../Pages/Dashboard.jsx";
import "../Components/Navbar.jsx";

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      title: "Cardiology",
      description: "Heart and blood vessel specialists providing expert cardiac care.",
      image: "https://cdn-icons-png.flaticon.com/512/2966/2966486.png",
      color: "#e3f2fd",
    },
    {
      id: 2,
      title: "Neurology",
      description: "Experts in brain, spine, and nervous system disorders.",
      image: "https://cdn-icons-png.flaticon.com/512/2966/2966492.png",
      color: "#ede7f6",
    },
    {
      id: 3,
      title: "Dermatology",
      description: "Specialists in treating skin, hair, and nail conditions.",
      image: "https://cdn-icons-png.flaticon.com/512/2966/2966482.png",
      color: "#fce4ec",
    },
    {
      id: 4,
      title: "ENT (Otolaryngology)",
      description: "Care for ear, nose, and throat disorders and treatments.",
      image: "https://cdn-icons-png.flaticon.com/512/2966/2966491.png",
      color: "#e8f5e9",
    },
    {
      id: 5,
      title: "Dentistry",
      description: "Comprehensive dental care and oral hygiene services.",
      image: "https://cdn-icons-png.flaticon.com/512/2966/2966484.png",
      color: "#fff3e0",
    },
    {
      id: 6,
      title: "Ophthalmology",
      description: "Eye care specialists providing diagnosis and vision correction.",
      image: "https://cdn-icons-png.flaticon.com/512/2966/2966493.png",
      color: "#e0f7fa",
    },
    {
      id: 7,
      title: "Pediatrics",
      description: "Child healthcare experts ensuring proper growth and wellness.",
      image: "https://cdn-icons-png.flaticon.com/512/2966/2966488.png",
      color: "#f3e5f5",
    },
    {
      id: 8,
      title: "Orthopedics",
      description: "Treatment for bone, joint, and muscle-related conditions.",
      image: "https://cdn-icons-png.flaticon.com/512/2966/2966487.png",
      color: "#e8f5e9",
    },
    {
      id: 9,
      title: "Psychiatry",
      description: "Mental health specialists offering therapy and counseling.",
      image: "https://cdn-icons-png.flaticon.com/512/2966/2966495.png",
      color: "#f1f8e9",
    },
  ];

  const handleViewDoctors = (category) => {
    navigate("/dashboard", { state: { selectedCategory: category } });
  };

  return (
    <div className="categories-page">
      <header className="categories-header">
        <h1>Doctor Service Categories</h1>
        <p>
          Explore specialized medical services and find the right doctors for your health needs.
        </p>
      </header>

      <div className="categories-grid">
        {categories.map((cat) => (
          <div
            className="category-card"
            key={cat.id}
            style={{ backgroundColor: cat.color }}
          >
            <img src={cat.image} alt={cat.title} className="category-icon" />
            <h3>{cat.title}</h3>
            <p>{cat.description}</p>
            <button onClick={() => handleViewDoctors(cat.title)}>View Doctors</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
