import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ServiceCard from "../components/ServiceProviderCard";
import {
  providerLogoutRequest,
  providerFetchServices,
  providerDeleteService,
} from "../utils/providerAuthApi";

export default function ProviderDashboard() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch services from backend
  const fetchServices = async () => {
    setFetching(true);
    try {
      const res = await providerFetchServices();
      if (res.success) {
        // Ensure we always have an array
        setServices(Array.isArray(res.services) ? res.services : []);
      } else {
        alert(res.msg || "Failed to fetch services");
        setServices([]);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch services");
      setServices([]);
    }
    setFetching(false);
  };

  // Load services on mount
  useEffect(() => {
    if (location.state?.newService && typeof location.state.newService === "object") {
      setServices(prev => [location.state.newService, ...prev]);
    } else {
      fetchServices();
    }
  }, [location.state]);

  // Logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await providerLogoutRequest();
      if (res.success) {
        alert("✅ Logged out successfully");
        navigate("/provider-login");
      } else {
        alert(res.msg || "❌ Logout failed");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Logout failed");
    }
    setLoading(false);
  };

  // Delete a service
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await providerDeleteService(id);
      if (res.success) {
        alert("✅ Service deleted");
        setServices(prev => prev.filter(s => s._id !== id));
      } else {
        alert(res.msg || "❌ Failed to delete service");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete service");
    }
  };

  return (
    <div className="services-section">
      <h2 className="section-title">Your Services</h2>

      <Link
        to="/provider/add-service"
        className="booking-btn"
        style={{ marginBottom: "1rem" }}
      >
        + Add New Service
      </Link>

      {fetching ? (
        <p>Loading services...</p>
      ) : !Array.isArray(services) || services.length === 0 ? (
        <p>No services added yet.</p>
      ) : (
        <div className="service-grid">
          {services.map((service) => (
            <div key={service._id} className="relative">
              <ServiceCard service={service} />
              <button
                className="delete-btn"
                onClick={() => handleDelete(service._id)}
                style={{ marginTop: "0.5rem" }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        className="submit-btn"
        onClick={handleLogout}
        disabled={loading}
        style={{ width: "auto", marginTop: "2rem" }}
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}
