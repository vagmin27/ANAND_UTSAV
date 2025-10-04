import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";
import { providerLogoutRequest } from "../utils/providerAuthApi";
export default function ProviderDashboard() {
  // For now, no backend fetch because only addService exists
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    const res = await providerLogoutRequest();
    setLoading(false);

    if (res.success) {
      alert("✅ Logged out successfully");
      navigate("/provider-login");
    } else {
      alert(res.msg || "❌ Logout failed");
    }
  };
  // When you add a service, ideally redirect here with new service data
  // Or keep services in Context so this page can show them
  // Example: if using context → get services from context instead of API

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

      

      {services.length === 0 ? (
        <p>No services added yet.</p>
      ) : (
        <div className="service-grid">
          {services.map((service, idx) => (
            <div key={idx} className="relative">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      )}
      <button
        type="button"
        className="submit-btn"
        onClick={handleLogout}
        disabled={loading}
        style={{ width: "auto", marginBottom: "2rem" }}
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}
