import React from 'react';
import { Link } from 'react-router-dom';
import { allServices } from '../data/servicesData';
import "../css/ServiceStyles.css"; // The shared CSS file

// ✨ NEW: Import the dedicated card component
import ServiceCard from './ServiceCard';

// Show the first 5 services on the homepage
const previewServices = allServices.slice(0, 7);

export default function ServicePreview() {
    return (
        <section className="services-section">
            <h3 className="section-title">Book Top-Tier Services</h3>
            <div className="service-grid">
                {previewServices.map(service => (
                    // ✨ NEW: Use the ServiceCard component
                    <ServiceCard key={service.id} service={service} />
                ))}

                {/* Link card to all services page - styling is now consistent */}
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