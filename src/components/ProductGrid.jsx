import React, { useState } from 'react';
import { CalendarCheck, Heart } from 'lucide-react';
import "../css/ProductGrid.css"; // Note: Rename your CSS file to ServiceGrid.css

// --- Main Component for Booking Services ---
export default function ProductGrid() {
    const [services] = useState([
        { id: 1, name: "Royal Catering", category: "Catering", priceInfo: "Starts at ₹25,000", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600" },
        { id: 2, name: "DJ Rhythmic", category: "Entertainment", priceInfo: "₹15,000 / night", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600" },
        { id: 3, name: "Lavish Decorators", category: "Decorations", priceInfo: "Starts at ₹50,000", image: "https://images.unsplash.com/photo-1522143243539-2775799b6e8a?w=600" },
        { id: 4, name: "Wanderlust Travels", category: "Travel", priceInfo: "Packages from ₹12,000", image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600" },
        { id: 5, name: "Mehndi Artists", category: "Beauty", priceInfo: "₹5,000 onwards", image: "https://images.unsplash.com/photo-1595342255761-e59210418388?w=600" },
        { id: 6, name: "Photography Crew", category: "Photography", priceInfo: "Starts at ₹40,000", image: "https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=600" },
    ]);

    return (
        <section className="services-section">
            <h3 className="section-title">Book Services For Your Event</h3>
            <div className="service-grid">
                {services.map(service => (
                    <div key={service.id} className="service-card">
                        <div className="service-image-container">
                            <img src={service.image} alt={service.name} />
                            <button className="wishlist-btn" aria-label="Shortlist Service">
                                <Heart />
                            </button>
                            <span className="service-category">{service.category}</span>
                        </div>
                        <div className="service-details">
                            <h4 className="service-name">{service.name}</h4>
                            <p className="service-price">{service.priceInfo}</p>
                        </div>
                        <button className="booking-btn">
                            <CalendarCheck size={20} />
                            <span>Book Now</span>
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}