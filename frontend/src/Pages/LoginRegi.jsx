import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/LoginRegi.css";

const API_BASE = "http://localhost:5001/api/auth";

const LoginRegi = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("register");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const [registerData, setRegisterData] = useState({
    fullName: "",
    phoneNumber:"",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [registerErrors, setRegisterErrors] = useState({});
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  // ✅ Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      const data = await res.json();

      if (!res.ok) {
        setPopupMessage(`⚠️ ${data.message}`);
        setShowPopup(true);
        return;
      }

      setPopupMessage("✅ Registration successful!");
      setShowPopup(true);
      setRegisterData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        setShowPopup(false);
        setActiveTab("login");
      }, 1500);
    } catch (err) {
      console.error("Register Error:", err);
      setPopupMessage("❌ Server error during registration");
      setShowPopup(true);
    }
  };

  // ✅ Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.message || "Invalid email or password.");
        return;
      }

      // ✅ Save both versions (so any component can use)
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ token: data.token, user: data.user })
      );

      console.log("🪪 Token saved:", data.token);

      setPopupMessage(data.message || "Login successful!");
      setShowPopup(true);
      setLoginData({ email: "", password: "" });

      // ✅ Navigate after popup
      setTimeout(() => {
        setShowPopup(false);
        if (data.user?.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 1200);
    } catch (err) {
      console.error("Login Error:", err);
      setLoginError("❌ Server error during login. Check backend logs!");
    }
  };

  return (
    <div className="register-page">
      <div className="login-container">
        {activeTab === "register" ? (
          // 🔹 Registration Form
          <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={registerData.fullName}
              onChange={(e) =>
                setRegisterData({ ...registerData, fullName: e.target.value })
              }
            />
            <input
  type="phone"
  name="phone"
  placeholder="phone"
  value={registerData.phoneNumber}
  onChange={(e) =>
    setRegisterData({ ...registerData, phoneNumber: e.target.value })
  }
/>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={registerData.confirmPassword}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  confirmPassword: e.target.value,
                })
              }
            />
            <button type="submit">Register</button>
            <p onClick={() => setActiveTab("login")}>
              Already have an account? Login
            </p>
          </form>
        ) : (
          // 🔹 Login Form
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            {loginError && <span className="error">{loginError}</span>}
            <button type="submit">Login</button>
            <p onClick={() => setActiveTab("register")}>
              Don’t have an account? Register
            </p>
          </form>
        )}
      </div>

      {/* 🔹 Popup Notification */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>✓ Success</h3>
            <p>{popupMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginRegi;
