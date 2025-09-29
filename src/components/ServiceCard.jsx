import React from 'react';
import { Heart, CalendarCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServiceCard({ service }) {
    return (
        <Link to={`/service/${service.id}`} className="service-card-link">
            <div className="service-card">
                <img src={service.images[0]} className="card-background-image" alt={service.name} />

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
        </Link>
    );
}
