import React from "react";
import { useServiceProvider } from "../context/ServiceProviderContext";
import { Link } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";

export default function ProviderDashboard() {
  const { services, deleteService } = useServiceProvider();

  return (
    <div className="services-section">
      <h2 className="section-title">Your Services</h2>

      <Link to="/provider/add-service" className="booking-btn" style={{ marginBottom: "2rem" }}>
        + Add New Service
      </Link>

      {services.length === 0 ? (
        <p>No services added yet.</p>
      ) : (
        <div className="service-grid">
          {services.map((service) => (
            <div key={service.id} className="relative">
              <ServiceCard service={service} />
              <button
                onClick={() => deleteService(service.id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
