import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause } from 'lucide-react';
import "../css/Hero.css";
import { allServices } from "../data/servicesData";
import { topPicksIds } from "../data/topPicksIds";

export default function Hero() {
    const topPicks = allServices.filter(service =>
        topPicksIds.includes(service.id)
    );

    // ✨ CHANGED: Get the number of slides dynamically
    const numSlides = topPicks.length;

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

    const handleScrubStart = (e) => {
        e.preventDefault();
        setIsScrubbing(true);
        setIsPlaying(false);
        dragStartX.current = e.clientX;
        startScrubIndex.current = activeIndex;
    };

    const handleScrubMove = useCallback((e) => {
        if (!isScrubbing || numSlides <= 1) return;

        const paginationWidth = paginationRef.current?.offsetWidth || 200;
        const pixelsPerIndex = paginationWidth / (numSlides - 1);
        const dragDistance = e.clientX - dragStartX.current;
        const indexOffset = Math.round(dragDistance / pixelsPerIndex);
        const newIndex = startScrubIndex.current + indexOffset;
        const clampedIndex = Math.max(0, Math.min(newIndex, numSlides - 1));

        if (clampedIndex !== activeIndex) {
            setActiveIndex(clampedIndex);
        }
    }, [isScrubbing, activeIndex, numSlides]); // ✨ ADDED numSlides to dependency array

    const handleScrubEnd = useCallback(() => {
        setIsScrubbing(false);
    }, []);

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

    useEffect(() => {
        let interval;
        if (isPlaying && !isScrubbing && numSlides > 1) { // ✨ Prevent timer if only one slide
            interval = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % numSlides);
            }, 4000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, isScrubbing, numSlides]); // ✨ ADDED numSlides to dependency array

    // ✨ CHANGED: Calculate dynamic styles for the track and slides
    const slideItemWidth = 100 / numSlides;

    const trackStyles = {
        // e.g., for 4 slides, width will be '400%'
        width: `${numSlides * 100}%`,
        // e.g., for 4 slides, on index 1, it moves -25%
        transform: `translateX(-${activeIndex * slideItemWidth}%)`,
        transition: 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
    };

    const slideItemStyles = {
        // e.g., for 4 slides, each slide is '25%' wide
        width: `${slideItemWidth}%`,
    };

    const getHeroImage = (images) => {
        if (!images || images.length === 0) return 'https://via.placeholder.com/800x450';
        return images[0] || images[1] || 'https://via.placeholder.com/800x450';
    };

    // ✨ ADDED: Handle case with no slides to prevent errors
    if (numSlides === 0) {
        return (
            <section className="top-picks-hero">
                <div className="slide-item" style={{ justifyContent: 'center', width: '100%' }}>
                    <p>No top picks available.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="top-picks-hero">
            {/* ✨ CHANGED: Applied dynamic style object */}
            <div className="carousel-track" style={trackStyles}>
                {topPicks.map((pick) => (
                    // ✨ CHANGED: Applied dynamic style object
                    <div key={pick.id} className="slide-item" style={slideItemStyles}>
                        <div className="slide-background" style={{ backgroundImage: `url(${getHeroImage(pick.images)})` }} />
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

            {/* ✨ Only show controls if there is more than one slide */}
            {numSlides > 1 && (
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
            )}
        </section>
    );
}