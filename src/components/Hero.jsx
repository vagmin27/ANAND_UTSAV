import React, { useState, useEffect } from 'react';
import { PlayCircle } from 'lucide-react';
import "../css/Hero.css";

// --- Component Data (More detailed for the new design) ---
const topPicks = [
    {
        id: 1,
        title: "The Royal Silk Collection",
        tag: "New Arrival",
        description: "Experience unparalleled craftsmanship with our latest collection of Banarasi silk sarees.",
        image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800",
    },
    {
        id: 2,
        title: "Temple Jewellery",
        tag: "Best Seller",
        description: "Adorn yourself with timeless, intricate designs inspired by ancient temple art.",
        image: "https://images.unsplash.com/photo-1611652033959-8a8279d45f47?w=800",
    },
    {
        id: 3,
        title: "Diwali Decor",
        tag: "Festive Special",
        description: "Light up your home with our exclusive range of handcrafted lamps and decor.",
        image: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=800",
    },
    {
        id: 4,
        title: "Gourmet Gift Baskets",
        tag: "Top Rated",
        description: "The perfect gift of joy, filled with artisanal sweets and festive delicacies.",
        image: "https://images.unsplash.com/photo-1627808003926-d568c077a285?w=800",
    },
    {
        id: 5,
        title: "Men's Festive Kurtas",
        tag: "Just In",
        description: "Celebrate in style with our elegant and comfortable festive wear for men.",
        image: "https://images.unsplash.com/photo-1622942416922- abusing-18d1a12e2e?w=800",
    },
];

export default function Hero() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePickSelect = (index) => {
        setActiveIndex(index);
    };

    const activePick = topPicks[activeIndex];

    return (
        <section className="top-picks-hero">
            {/* The background image changes based on the active pick */}
            <div
                className="hero-background"
                style={{ backgroundImage: `url(${activePick.image})` }}
            />

            <div className="hero-content">
                <div className="hero-details">
                    <span className="hero-tag">{activePick.tag}</span>
                    <h2 className="hero-title">{activePick.title}</h2>
                    <p className="hero-description">{activePick.description}</p>
                    <button className="cta-button">
                        <PlayCircle size={22} />
                        <span>Explore Now</span>
                    </button>
                </div>
            </div>

            <div className="picks-selector-container">
                {topPicks.map((pick, index) => (
                    <div
                        key={pick.id}
                        className={`pick-thumbnail ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => handlePickSelect(index)}
                    >
                        <img src={pick.image} alt={pick.title} />
                        <div className="thumbnail-overlay">
                            <p>{pick.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}