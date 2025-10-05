// src/components/ServiceSection.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/ServiceStyles.css";
import ServiceCard from "./ServiceCard";
import axios from "axios";

export default function ServicePreview() {
  const [previewServices, setPreviewServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://anand-u.vercel.app/provider/allservices"
        );

        console.log("Fetched services:", response.data);

        const serviceList = Array.isArray(response.data) ? response.data : [];
        setPreviewServices(serviceList.slice(0, 6)); // first 6
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="services-section">
      <h3 className="section-title">Book Top-Tier Services</h3>
      <div className="service-grid">
        {previewServices.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}

        {/* View All Card */}
        <Link to="/services" className="service-card more-services-card">
          <div className="more-card-content">
            <span className="more-card-icon">→</span>
            <span className="more-card-text">View All Services</span>
          </div>
        </Link>
      </div>
    </section>
  );
}
