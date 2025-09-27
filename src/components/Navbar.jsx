import React, { useState, useEffect } from 'react';
import { User, ShoppingCart, Menu, Search, Heart } from 'lucide-react';
import "../css/Navbar.css";

// --- Main Navbar Component ---
export default function AnandUtsavNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    // Effect to detect page scroll
    useEffect(() => {
        const handleScroll = () => {
            // Set state to true if user scrolls down 10px, otherwise false
            setIsScrolled(window.scrollY > 0);
        };

        // Add event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array means this effect runs only once on mount

    return (
        <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-left">
                <Menu className="menu-icon" />
                {/* Logo updated to the new brand name */}
                <h1 className="logo">AnandUtsav</h1>
            </div>

            <div className="search-bar">
                <Search size={20} className="search-icon" />
                {/* Placeholder text updated to be more thematic */}
                <input type="text" placeholder="Search for festive wear, gifts & more..." />
            </div>

            <div className="navbar-right">
                <Heart className="icon" />
                <ShoppingCart className="icon" />
                <User className="icon" />
            </div>
        </header>
    );
}