// src/pages/MyAccountPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../css/MyAccountPage.css";

export default function MyAccountPage() {
  const { token, logout } = useUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get("https://anand-u.vercel.app/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserDetails(res.data);
        setFormData({
          fullName: res.data.fullName || "",
          username: res.data.username || "",
          phone: res.data.phone || "",
          location: res.data.location || "",
        });
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchUserDetails();
  }, [token]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        "https://anand-u.vercel.app/user/updateUser",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserDetails(res.data);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      const res = await axios.delete("https://anand-u.vercel.app/user/deleteAccount", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        alert("Account deleted successfully");
        logout();
        navigate("/");
      }
    } catch (err) {
      console.error("Error deleting account:", err);
      alert("Failed to delete account");
    }
  };

  if (loading) return <p>Loading profile...</p>;

  if (!userDetails)
    return <p>User details not found.</p>;

  return (
    <div className="my-account-page">
      <h2>My Profile</h2>
      <div className="profile-card">
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            disabled={!editing}
          />
        </label>

        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={!editing}
          />
        </label>

        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!editing}
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            disabled={!editing}
          />
        </label>

        <div className="profile-buttons">
          {editing ? (
            <>
              <button onClick={handleSave} className="save-btn">Save</button>
              <button onClick={() => setEditing(false)} className="cancel-btn">Cancel</button>
            </>
          ) : (
            <button onClick={() => setEditing(true)} className="edit-btn">Edit Profile</button>
          )}
          <button onClick={handleDelete} className="delete-btn">Delete Account</button>
          <button
        onClick={() => navigate('/my-reviews')}
        className="my-reviews-btn"
    >
        ⭐ My Reviews
    </button>
        </div>
      </div>
    </div>
  );
}
