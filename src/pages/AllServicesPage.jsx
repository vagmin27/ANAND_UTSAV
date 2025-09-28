import React, { useState } from 'react';
import { allServices } from '../data/servicesData';
import { Heart, Star, LayoutGrid, List, Search, ChevronDown } from 'lucide-react';
import "../css/AllServicesPage.css"; // We'll use the same CSS file name

export default function AllServicesPage() {

    const [viewMode, setViewMode] = useState('grid');
    const [price, setPrice] = useState(75000);
    const [selectedRating, setSelectedRating] = useState(null);

    // --- NEW: State for the custom sort dropdown ---
    const [sortOpen, setSortOpen] = useState(false);
    const [sortOption, setSortOption] = useState('Popularity');
    const sortOptions = ['Popularity', 'Rating', 'Price: Low to High', 'Price: High to Low'];

    const clearFilters = () => {
        setPrice(75000);
        setSelectedRating(null);
    };


    return (
        <div className="services-page-container">
            <aside className="filters-sidebar">
                <h3>Filters</h3>

                <details className="filter-group" open>
                    <summary>Category <ChevronDown size={16} /></summary>
                    <div className="custom-select-wrapper">
                        <select>
                            <option>All Categories</option>
                            <option>Catering</option>
                            <option>Decorations</option>
                            <option>Entertainment</option>
                        </select>
                        <ChevronDown size={16} className="select-arrow" />
                    </div>
                </details>

                <details className="filter-group" open>
                    <summary>Price Range <ChevronDown size={16} /></summary>
                    <div className="price-slider-container">
                        <div className="price-value">Up to ₹{Number(price).toLocaleString('en-IN')}</div>
                        <input
                            type="range"
                            min="10000"
                            max="100000"
                            step="5000"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="price-slider"
                        />
                    </div>
                </details>

                <details className="filter-group" open>
                    <summary>Rating <ChevronDown size={16} /></summary>
                    <div className="rating-options">
                        <button
                            className={`rating-pill ${selectedRating === 4.5 ? 'active' : ''}`}
                            onClick={() => setSelectedRating(4.5)}
                        >
                            4.5 ★ & up
                        </button>
                        <button
                            className={`rating-pill ${selectedRating === 4.0 ? 'active' : ''}`}
                            onClick={() => setSelectedRating(4.0)}
                        >
                            4.0 ★ & up
                        </button>
                    </div>
                </details>

                <button className="clear-filters-btn" onClick={clearFilters}>Clear All</button>
            </aside>

            <main className="main-content">
                <header className="page-header">
                    <div className="header-left">
                        <h1>All Services</h1>
                        <div className="search-bar">
                            <Search size={18} className="search-icon" />
                            <input type="text" placeholder="Search for services..." />
                        </div>
                    </div>
                    <div className="header-right">
                        {/* --- NEW: Custom Dropdown for Sorting --- */}
                        <div className="custom-dropdown">
                            <button
                                className={`dropdown-toggle ${sortOpen ? 'active' : ''}`}
                                onClick={() => setSortOpen(!sortOpen)}
                            >
                                <span>Sort by: <strong>{sortOption}</strong></span>
                                <ChevronDown size={16} className={`chevron-icon ${sortOpen ? 'open' : ''}`} />
                            </button>

                            {sortOpen && (
                                <ul className="dropdown-menu">
                                    {sortOptions.map(option => (
                                        <li
                                            key={option}
                                            className={sortOption === option ? 'active' : ''}
                                            onClick={() => {
                                                setSortOption(option);
                                                setSortOpen(false);
                                            }}
                                        >
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="view-toggle">
                            <button onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'active' : ''}><LayoutGrid /></button>
                            <button onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'active' : ''}><List /></button>
                        </div>
                    </div>
                </header>

                <div className={viewMode === 'grid' ? 'service-grid-view' : 'service-list-view'}>
                    {allServices.map(service => (
                        <div key={service.id} className="service-item-card">
                            <div className="item-image-container">
                                <img src={service.image} alt={service.name} />
                                <button className="item-wishlist-btn"><Heart size={18} /></button>
                            </div>
                            <div className="item-content">
                                <span className="item-category">{service.category}</span>
                                <h4 className="item-name">{service.name}</h4>
                                <p className="item-description">{service.description}</p>
                                <div className="item-footer">
                                    <div className="item-rating">
                                        <Star size={16} className="star-icon" /> {service.rating}
                                    </div>
                                    <div className="item-price">{service.priceInfo}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}