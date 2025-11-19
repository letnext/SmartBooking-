import React,{useState,useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ViewScreen from "./Pages/ViewScreen.jsx";
import Register from "./Pages/LoginRegi.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import MyAppointments from "./Components/MyAppointments.jsx";
import Categories from "./Components/Categories.jsx";
import Navbar from "./Components/Navbar.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import HospitalDashboard from "./Pages/HospitalDashboard.jsx";
import AddDoctors from "./Pages/AddDoctor.jsx";
import DoctorList from "./Pages/DoctorList.jsx";
import PatientList from "./Pages/PatientList.jsx";


const API_BASE = "http://localhost:5001/api";

// ✅ Wrapper to control Navbar visibility
const AppContent = () => {
  const location = useLocation();

  // ✅ Define routes where Navbar should NOT appear
  const hideNavbarRoutes = [
    "/", // login
    "/register",
    "/hospital-dashboard",
    "/admin-dashboard",
    "/add-doctor",
    "/doctor-list",
    "/patients-list"
  ];

  // ✅ Check if current path starts with "/admin"
  const isAdminRoute = location.pathname.startsWith("/admin") || 
                       location.pathname.startsWith("/add-doctor") ||
                       location.pathname.startsWith("/doctor-list") ||
                       location.pathname.startsWith("/patients-list")


  // ✅ Hide Navbar for admin routes OR any listed route
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname) && !isAdminRoute;


  const [allPatients, setAllPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  
  const [error, setError] = useState("");

  // 🔹 Fetch patients from API
  const fetchPatients = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/getAll`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();


      

      if (res.ok) {
        setAllPatients(data);
        
      } else {
        console.error("API Error:", data.message);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  

  // ✅ Fetch doctors from backend API
  const fetchDoctors = async () => {
    try {
      const res = await fetch(`${API_BASE}/doctors/getting-all`);
      if (!res.ok) throw new Error("Failed to fetch doctors");
      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError("Unable to load doctor data");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Run once on component mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        {/* Public/User Routes */}
        <Route path="/" element={<ViewScreen />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard  doctors={doctors} setDoctors={setDoctors} />} />
        <Route path="/appointments" element={<MyAppointments />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/hospital-dashboard" element={<HospitalDashboard />} />

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={
          <AdminDashboard allPatients={allPatients} doctors={doctors}/>} />
        <Route path="/add-doctor" element={<AddDoctors />} />
        <Route path="/doctor-list" element={<DoctorList 
        doctors={doctors}
        error={error}
        loading={loading} 
        />} />
        <Route path="/patients-list" element={<PatientList 
        allPatients={allPatients}
        loading={loading} 
        />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
