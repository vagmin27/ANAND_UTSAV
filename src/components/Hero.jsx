// src/components/Hero.js

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import "../css/Hero.css";
import { heroPicks } from "../data/heroPicksData";

export default function Hero() {
    const topPicks = heroPicks;
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

    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + numSlides) % numSlides);
        setIsPlaying(false);
    }, [numSlides]);

    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % numSlides);
        setIsPlaying(false);
    }, [numSlides]);

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
    }, [isScrubbing, activeIndex, numSlides]);

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
        if (isPlaying && !isScrubbing && numSlides > 1) {
            interval = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % numSlides);
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, isScrubbing, numSlides]);

    const trackStyles = {
        transform: `translateX(-${activeIndex * 100}%)`,
    };

    const getSlideBackgroundStyle = (images) => {
        const imageUrl = (images && images.length > 0) ? images[0] : null;
        if (imageUrl) {
            return { backgroundImage: `url(${imageUrl})` };
        } else {
            return { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' };
        }
    };

    if (numSlides === 0) {
        return <section className="top-picks-hero"><div className="slide-item"><p>No top picks available.</p></div></section>;
    }

    return (
        <section className="top-picks-hero">
            <div className="carousel-track" style={trackStyles}>
                {topPicks.map((pick, index) => (
                    <div key={pick.id} className="slide-item">
                        <div
                            className={`slide-background ${activeIndex === index ? 'active' : ''}`}
                            style={getSlideBackgroundStyle(pick.images)}
                        />
                        <div className="hero-content">
                            <div className={`hero-details ${activeIndex === index ? 'active' : ''}`}>
                                <div className="hero-text-content">
                                    <span className="hero-tag">{pick.tag}</span>
                                    <h2 className="hero-title">{pick.title}</h2>
                                    <p className="hero-description">{pick.description}</p>
                                </div>
                                <div className="hero-action-content">
                                    <Link
                                        to="/services"
                                        className="cta-button"
                                        state={{ preSelectedServiceIds: pick.packageServiceIds }}
                                    >
                                        <span>Explore Package</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {numSlides > 1 && (
                <>
                    <button onClick={handlePrev} className="nav-arrow prev" aria-label="Previous Slide"><ChevronLeft size={32} /></button>
                    <button onClick={handleNext} className="nav-arrow next" aria-label="Next Slide"><ChevronRight size={32} /></button>
                    <div className="carousel-controls-overlay">
                        <div className="pagination-dots" ref={paginationRef}>
                            {topPicks.map((_, index) => (
                                <div key={index} className={`dot ${activeIndex === index ? 'active' : ''}`} onMouseDown={activeIndex === index ? handleScrubStart : null} onClick={activeIndex !== index ? () => handleDotClick(index) : null} />
                            ))}
                        </div>
                        <button className="play-pause-btn" onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}