import React, { useState, useEffect } from 'react';
import { User, ShoppingCart, Menu, Search, Heart, X } from 'lucide-react';
import { Link, NavLink } from "react-router-dom";
import "../css/Navbar.css";

// --- Main Navbar Component ---
export default function AnandUtsavNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Effect to detect page scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10); // A small threshold
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Effect to lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        // Cleanup function
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMobileMenuOpen]);


    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <header className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
                <div className="navbar-content">
                    {/* --- Left Section --- */}
                    <div className="navbar-left">
                        {/* The menu button for mobile view */}
                        <button className="menu-toggle" onClick={toggleMobileMenu}>
                            <Menu className="menu-icon" />
                        </button>
                        <Link to="/" className="logo-link">
                            <h1 className="logo">AnandUtsav</h1>
                        </Link>
                    </div>

                    {/* --- Center Section: Navigation Links for Desktop --- */}
                    <nav className="navbar-center">
                        <NavLink to="/new-arrivals" className="nav-link">New Arrivals</NavLink>
                        <NavLink to="/sarees" className="nav-link">Sarees</NavLink>
                        <NavLink to="/gifts" className="nav-link">Gifts & Decor</NavLink>
                        <NavLink to="/men" className="nav-link">Men's Wear</NavLink>
                    </nav>

                    {/* --- Right Section --- */}
                    <div className="navbar-right">
                        <button className="icon-button"><Search /></button>
                        <button className="icon-button"><Heart /></button>
                        <button className="icon-button"><ShoppingCart /></button>
                        <Link to="/login" className="icon-button user-icon-link">
                            <User />
                        </Link>
                    </div>
                </div>
            </header>

            {/* --- Mobile Navigation Overlay --- */}
            <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
                <button className="close-menu-btn" onClick={toggleMobileMenu}>
                    <X size={30} />
                </button>
                <nav className="mobile-nav-links">
                    <NavLink to="/" onClick={toggleMobileMenu}>Home</NavLink>
                    <NavLink to="/new-arrivals" onClick={toggleMobileMenu}>New Arrivals</NavLink>
                    <NavLink to="/sarees" onClick={toggleMobileMenu}>Sarees</NavLink>
                    <NavLink to="/gifts" onClick={toggleMobileMenu}>Gifts & Decor</NavLink>
                    <NavLink to="/men" onClick={toggleMobileMenu}>Men's Wear</NavLink>
                    <NavLink to="/account" onClick={toggleMobileMenu}>My Account</NavLink>
                    <NavLink to="/login" onClick={toggleMobileMenu}>Login / Register</NavLink>
                </nav>
            </div>
        </>
    );
}