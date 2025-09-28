import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause } from 'lucide-react';
import "../css/Hero.css";

const topPicks = [
    { id: 1, title: "The Royal Silk Collection", tag: "New Arrival", description: "Experience unparalleled craftsmanship...", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800" },
    { id: 2, title: "Temple Jewellery", tag: "Best Seller", description: "Adorn yourself with timeless, intricate designs...", image: "https://images.unsplash.com/photo-1611652033959-8a8279d45f47?w=800" },
    { id: 3, title: "Diwali Decor", tag: "Festive Special", description: "Light up your home with our exclusive range...", image: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=800" },
    { id: 4, title: "Gourmet Gift Baskets", tag: "Top Rated", description: "The perfect gift of joy, filled with artisanal sweets...", image: "https://images.unsplash.com/photo-1627808003926-d568c077a285?w=800" },
    { id: 5, title: "Men's Festive Kurtas", tag: "Just In", description: "Celebrate in style with our elegant and comfortable wear...", image: "https://images.unsplash.com/photo-1594657154523-a5a4159a434d?w=800" },
];

export default function Hero() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isScrubbing, setIsScrubbing] = useState(false);

    const paginationRef = useRef(null);
    const dragStartX = useRef(0);
    const startScrubIndex = useRef(0);

    const handleDotClick = (index) => {
        setActiveIndex(index);
        setIsPlaying(false);
    };

    // --- REBUILT SCROLLBAR LOGIC ---

    const handleScrubStart = (e) => {
        e.preventDefault();
        setIsScrubbing(true);
        setIsPlaying(false);
        dragStartX.current = e.clientX;
        startScrubIndex.current = activeIndex; // Record the index at the start of the drag
    };

    const handleScrubMove = useCallback((e) => {
        if (!isScrubbing) return;

        const paginationWidth = paginationRef.current?.offsetWidth || 200;
        // Calculate how many pixels of drag correspond to one slide change
        const pixelsPerIndex = paginationWidth / (topPicks.length - 1);

        const dragDistance = e.clientX - dragStartX.current;
        const indexOffset = Math.round(dragDistance / pixelsPerIndex);

        const newIndex = startScrubIndex.current + indexOffset;

        // Clamp the index to be within the valid range [0, 4]
        const clampedIndex = Math.max(0, Math.min(newIndex, topPicks.length - 1));

        // Update the active index in real-time
        if (clampedIndex !== activeIndex) {
            setActiveIndex(clampedIndex);
        }
    }, [isScrubbing, activeIndex]);

    const handleScrubEnd = useCallback(() => {
        setIsScrubbing(false);
    }, []);

    // Effect to manage window event listeners for smooth dragging
    useEffect(() => {
        if (isScrubbing) {
            window.addEventListener('mousemove', handleScrubMove);
            window.addEventListener('mouseup', handleScrubEnd);
        }
        return () => {
            window.removeEventListener('mousemove', handleScrubMove);
            window.removeEventListener('mouseup', handleScrubEnd);
        };
    }, [isScrubbing, handleScrubMove, handleScrubEnd]);

    // Auto-play timer
    useEffect(() => {
        let interval;
        if (isPlaying && !isScrubbing) {
            interval = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % topPicks.length);
            }, 4000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, isScrubbing]);

    const trackStyles = {
        transform: `translateX(-${activeIndex * 100}%)`,
        // The transition is now ALWAYS on, which creates the smooth follow effect
        transition: 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
    };

    return (
        <section className="top-picks-hero">
            <div className="carousel-track" style={trackStyles}>
                {topPicks.map((pick) => (
                    <div key={pick.id} className="slide-item">
                        <div className="slide-background" style={{ backgroundImage: `url(${pick.image})` }} />
                        <div className="hero-content">
                            <div className="hero-details">
                                <span className="hero-tag">{pick.tag}</span>
                                <h2 className="hero-title">{pick.title}</h2>
                                <p className="hero-description">{pick.description}</p>
                                <button className="cta-button">
                                    <span>Explore Now</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="carousel-controls-overlay">
                <div className="pagination-dots" ref={paginationRef}>
                    {topPicks.map((_, index) => (
                        <div
                            key={index}
                            className={`dot ${activeIndex === index ? 'active' : ''} ${isScrubbing && activeIndex === index ? 'scrubbing' : ''}`}
                            onMouseDown={activeIndex === index ? handleScrubStart : null}
                            onClick={activeIndex !== index ? () => handleDotClick(index) : null}
                        />
                    ))}
                </div>
                <button className="play-pause-btn" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
            </div>
        </section>
    );
}