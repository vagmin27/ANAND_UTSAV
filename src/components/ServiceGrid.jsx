import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, Heart } from 'lucide-react';
import { allServices } from '../data/servicesData'; // Assuming data file exists
import "../css/ServiceStyles.css"; // Use the shared CSS file

// Show the first 5 services on the homepage
const previewServices = allServices.slice(0, 5);

export default function ServicePreview() {
    return (
        <section className="services-section">
            <h3 className="section-title">Book Top-Tier Services</h3>
            <div className="service-grid">
                {previewServices.map(service => (
                    <div key={service.id} className="service-card">
                        <img src={service.image} className="card-background-image" alt={service.name} />
                        <span className="service-category-tag">{service.category}</span>
                        <div className="card-content-overlay">
                            <div className="card-top-section">
                                <h4 className="service-name">{service.name}</h4>
                                <button className="wishlist-btn" aria-label="Shortlist Service">
                                    <Heart size={18} />
                                </button>
                            </div>
                            <div className="card-bottom-section">
                                <p className="service-price">{service.priceInfo}</p>
                                <button className="booking-btn">
                                    <CalendarCheck size={16} />
                                    <span>Book Now</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {/* Link card to all services page */}
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