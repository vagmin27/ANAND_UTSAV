import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  registerServiceProvider,
  loginServiceProvider,
  sendForgotPasswordOtp,
  resetServiceProviderPassword,
} from "../utils/providerAuthApi";
import "../css/FestiveAuth.css";

const INITIAL_FORM_STATE = {
  name: "",
  gender: "",
  phone: "",
  location: "",
  email: "",
  password: "",
  otp: "",
  newPassword: "",
};

export default function ProviderAuth() {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState("email");

  const navigate = useNavigate();

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 5000);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleProviderLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await loginServiceProvider({
      email: formData.email,
      password: formData.password,
    });
    if (response.success && response.token) {
      showNotification("Login successful!", "success");
      localStorage.setItem("providerToken", response.token);
      setTimeout(() => navigate("/"), 1500);
    } else {
      showNotification(response.message || "Login failed", "error");
    }
    setIsLoading(false);
  };

  const handleProviderRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await registerServiceProvider({
      name: formData.name,
      gender: formData.gender,
      phone: formData.phone,
      location: formData.location,
      email: formData.email,
      password: formData.password,
    });
    if (response.success) {
      showNotification("Registration successful! Please login.", "success");
      setActiveTab("login");
    } else {
      showNotification(response.message || "Registration failed", "error");
    }
    setIsLoading(false);
  };

  const handleSendForgotOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await sendForgotPasswordOtp(formData.email);
    if (response.success) {
      showNotification("OTP sent to your email!", "success");
      setForgotStep("verify");
    } else {
      showNotification(response.message || "Failed to send OTP", "error");
    }
    setIsLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await resetServiceProviderPassword({
      email: formData.email,
      userOtp: formData.otp,
      newPassword: formData.newPassword,
    });
    if (response.success) {
      showNotification("Password reset successful! Please login.", "success");
      setShowForgotPassword(false);
    } else {
      showNotification(response.message || "Password reset failed", "error");
    }
    setIsLoading(false);
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <div className="tabs-container">
          <button
            className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("login");
              setShowForgotPassword(false);
            }}
          >
            Login
          </button>
          <button
            className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {notification.message && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}

        {/* LOGIN TAB */}
        {activeTab === "login" && !showForgotPassword && (
          <form onSubmit={handleProviderLogin} className="auth-form">
            <h2>Provider Login</h2>
            <div className="input-group">
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <div
              style={{
                marginTop: "10px",
                cursor: "pointer",
                color: "#FF671F",
                textAlign: "center",
              }}
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot Password?
            </div>
          </form>
        )}

        {/* FORGOT PASSWORD FORM */}
        {activeTab === "login" && showForgotPassword && (
          <form
            onSubmit={
              forgotStep === "email"
                ? handleSendForgotOtp
                : handleResetPassword
            }
            className="auth-form"
          >
            <h2>Forgot Password</h2>
            {forgotStep === "email" && (
              <>
                <div className="input-group">
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </button>
              </>
            )}
            {forgotStep === "verify" && (
              <>
                <div className="input-group">
                  <input
                    id="otp"
                    type="text"
                    placeholder="Enter OTP"
                    value={formData.otp}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <input
                    id="newPassword"
                    type="password"
                    placeholder="Enter New Password"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </button>
              </>
            )}
            <button
              type="button"
              className="back-btn"
              onClick={() => setShowForgotPassword(false)}
            >
              Back to Login
            </button>
          </form>
        )}

        {/* REGISTER TAB */}
        {activeTab === "register" && (
          <form onSubmit={handleProviderRegister} className="auth-form">
            <h2>Provider Registration</h2>
            <div className="input-group">
              <input
                id="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                id="gender"
                placeholder="Gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                id="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                id="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
