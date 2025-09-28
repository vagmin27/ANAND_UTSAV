import React, { useState, useEffect } from "react"; // 1. Import useEffect
import "../css/FestiveAuth.css";

export default function FestiveAuth() {
  const [activeTab, setActiveTab] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  // 2. ✨ ADDED: This effect controls the page's scrollbar
  useEffect(() => {
    // When this component loads, lock the body's scrollbar
    document.body.style.overflow = 'hidden';

    // When this component is removed, unlock the scrollbar
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []); // The empty array [] means this runs only once when the component mounts and unmounts

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-tabs">
          <button
            className={`tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`tab ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        <div className="auth-content">
          <h1 className="auth-title">
            {activeTab === "login" ? "Welcome Back" : "Join AnandUtsav"}
          </h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              id="email"
              className="auth-input"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleInputChange}
              required
            />
            <input
              id="password"
              className="auth-input"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleInputChange}
              required
            />

            <div className={`confirm-password-wrapper ${activeTab === 'register' ? 'active' : ''}`}>
              <div className="input-field-inner">
                <input
                  id="confirmPassword"
                  className="auth-input"
                  type="password"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              {activeTab === "login" ? "Login" : "Create Account"}
            </button>
          </form>

          <p className="switch-prompt">
            {activeTab === "login" ? "Don't have an account?" : "Already a member?"}
            <a
              href="#"
              className="switch-link"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(activeTab === "login" ? "register" : "login");
              }}
            >
              {activeTab === "login" ? "Sign Up" : "Log In"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}