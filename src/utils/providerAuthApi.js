import axios from "axios";

// Use relative URL for Vite proxy
const BASE_URL = "/provider/auth";

// General API request with logging
async function apiRequest(endpoint, payload) {
  console.log("➡️ API Request:", endpoint, payload);
  try {
    const res = await axios.post(`${BASE_URL}${endpoint}`, payload, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // keep this if backend sets cookies
    });
    console.log("✅ API Response:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ API Error:", err.response?.data || err.message);
    return {
      success: false,
      msg: err.response?.data?.msg || err.response?.data?.message || err.message,
    };
  }
}

// --- LOGIN ---
export const providerLoginRequest = (formData) =>
  apiRequest("/login", {
    email: formData.email?.trim(),
    password: formData.password?.trim(),
  });

// --- REGISTER ---
export const providerRegisterRequest = (formData) =>
  apiRequest("/register", {
    name: formData.name?.trim(),
    gender: formData.gender?.trim(),
    phone: formData.phone?.trim(),
    location: formData.location?.trim(),
    email: formData.email?.trim(),
    password: formData.password?.trim(),
  });

// --- FORGOT PASSWORD ---
export const providerForgotPasswordRequest = (email) =>
  apiRequest("/forgototp", { email: email?.trim() });

// --- RESET PASSWORD ---
export const providerResetPasswordRequest = (formData) =>
  apiRequest("/verifyOtp", {
    email: formData.email?.trim(),
    otp: formData.otp?.trim(),
    newpassword: formData.password?.trim(),
  });
