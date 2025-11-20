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
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ❗Only store red-border errors (true/false)
  const [registerErrors, setRegisterErrors] = useState({});
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({});

  // ===============================
  // REGISTER
  // ===============================
  const handleRegister = async (e) => {
    e.preventDefault();

    // 🔹 Check empty fields → set red border
    let errors = {};
    Object.keys(registerData).forEach((field) => {
      if (!registerData[field].trim()) errors[field] = true;
    });

    setRegisterErrors(errors);

    // ❌ Stop submission if any empty
    if (Object.keys(errors).length > 0) return;

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
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        setShowPopup(false);
        setActiveTab("login");
      }, 1500);
    } catch (err) {
      setPopupMessage("❌ Server error during registration");
      setShowPopup(true);
    }
  };

  // ===============================
  // LOGIN
  // ===============================
  const handleLogin = async (e) => {
    e.preventDefault();

    let errors = {};
    if (!loginData.email.trim()) errors.email = true;
    if (!loginData.password.trim()) errors.password = true;

    setLoginErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginErrors({ general: data.message || "Invalid email or password." });
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ token: data.token, user: data.user })
      );

      setPopupMessage("Login successful!");
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        if (data.user?.role === "admin") navigate("/admin-dashboard");
        else navigate("/dashboard");
      }, 1200);
    } catch (err) {
      setLoginErrors({ general: "❌ Server error during login" });
    }
  };

  return (
    <div className="register-page">
      <div className="login-container">
        {activeTab === "register" ? (
          <form onSubmit={handleRegister}>
            <h2>Register</h2>

            <input
              type="text"
              placeholder="Full Name"
              className={registerErrors.fullName ? "input-error" : ""}
              value={registerData.fullName}
              onChange={(e) => {
                setRegisterData({ ...registerData, fullName: e.target.value });
                setRegisterErrors({ ...registerErrors, fullName: false });
              }}
            />

            <input
              type="text"
              placeholder="Phone Number"
              className={registerErrors.phoneNumber ? "input-error" : ""}
              value={registerData.phoneNumber}
              onChange={(e) => {
                setRegisterData({ ...registerData, phoneNumber: e.target.value });
                setRegisterErrors({ ...registerErrors, phoneNumber: false });
              }}
            />

            <input
              type="email"
              placeholder="Email"
              className={registerErrors.email ? "input-error" : ""}
              value={registerData.email}
              onChange={(e) => {
                setRegisterData({ ...registerData, email: e.target.value });
                setRegisterErrors({ ...registerErrors, email: false });
              }}
            />

            <input
              type="password"
              placeholder="Password"
              className={registerErrors.password ? "input-error" : ""}
              value={registerData.password}
              onChange={(e) => {
                setRegisterData({ ...registerData, password: e.target.value });
                setRegisterErrors({ ...registerErrors, password: false });
              }}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className={registerErrors.confirmPassword ? "input-error" : ""}
              value={registerData.confirmPassword}
              onChange={(e) => {
                setRegisterData({
                  ...registerData,
                  confirmPassword: e.target.value,
                });
                setRegisterErrors({ ...registerErrors, confirmPassword: false });
              }}
            />

            <button type="submit">Register</button>

            <p onClick={() => setActiveTab("login")}>Already have an account? <span>Login</span></p>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <h2>Login</h2>

            <input
              type="email"
              placeholder="Email"
              className={loginErrors.email ? "input-error" : ""}
              value={loginData.email}
              onChange={(e) => {
                setLoginData({ ...loginData, email: e.target.value });
                setLoginErrors({ ...loginErrors, email: false });
              }}
            />

            <input
              type="password"
              placeholder="Password"
              className={loginErrors.password ? "input-error" : ""}
              value={loginData.password}
              onChange={(e) => {
                setLoginData({ ...loginData, password: e.target.value });
                setLoginErrors({ ...loginErrors, password: false });
              }}
            />

            {loginErrors.general && (
              <span className="error">{loginErrors.general}</span>
            )}

            <button type="submit">Login</button>

            <p onClick={() => setActiveTab("register")}>
              Don’t have an account? <span>Register</span>
            </p>
          </form>
        )}
      </div>

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
