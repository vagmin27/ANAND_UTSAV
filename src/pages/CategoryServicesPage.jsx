import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { allServices } from '../data/servicesData';
import { allCategories } from '../data/categoriesData';
import ServiceCard from '../components/ServiceCard';
import { LayoutGrid, List, Search, ChevronDown } from 'lucide-react';
import "../css/AllServicesPage.css"; // Reuse same CSS for filters & grid/list view

export default function CategoryServicesPage() {
    const { id } = useParams(); // category id from URL
    const categoryId = Number(id); // convert string to number
    const category = allCategories.find(cat => cat.id === categoryId);

    const [viewMode, setViewMode] = useState('grid');
    const [price, setPrice] = useState(100000);
    const [selectedRating, setSelectedRating] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOpen, setSortOpen] = useState(false);
    const [sortOption, setSortOption] = useState('Popularity');

    const sortOptions = ['Popularity', 'Rating', 'Price: Low to High', 'Price: High to Low'];

    const clearFilters = () => {
        setPrice(100000);
        setSelectedRating(null);
        setSearchQuery("");
    };

    // Filter services for this category
    let filteredServices = allServices
        .filter(s => s.categoryId === categoryId) // only this category
        .filter(s => s.price <= price)
        .filter(s => (selectedRating ? s.rating >= selectedRating : true))
        .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

    // Sorting
    if (sortOption === 'Rating') {
        filteredServices = filteredServices.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'Price: Low to High') {
        filteredServices = filteredServices.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'Price: High to Low') {
        filteredServices = filteredServices.sort((a, b) => b.price - a.price);
    }

    return (
        <div className="services-page-container">
            {/* Sidebar Filters */}
            <aside className="filters-sidebar">
                <h3>Filters</h3>

                <details className="filter-group" open>
                    <summary>Price Range <ChevronDown size={16} /></summary>
                    <div className="price-slider-container">
                        <div className="price-value">Up to ₹{Number(price).toLocaleString('en-IN')}</div>
                        <input
                            type="range" min="10000" max="100000" step="5000"
                            value={price} onChange={(e) => setPrice(Number(e.target.value))}
                            className="price-slider"
                        />
                    </div>
                </details>

                <details className="filter-group" open>
                    <summary>Rating <ChevronDown size={16} /></summary>
                    <div className="rating-options">
                        {[4.5, 4.0, 3.5].map(r => (
                            <button
                                key={r}
                                className={`rating-pill ${selectedRating === r ? 'active' : ''}`}
                                onClick={() => setSelectedRating(r)}
                            >
                                {r} ★ & up
                            </button>
                        ))}
                    </div>
                </details>

                <button className="clear-filters-btn" onClick={clearFilters}>Clear All</button>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="page-header">
                    <div className="header-left">
                        <h1>{category ? category.name : "Category"}</h1>
                        <div className="search-bar">
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search for services..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="header-right">
                        <div className="custom-dropdown">
                            <button className={`dropdown-toggle ${sortOpen ? 'active' : ''}`} onClick={() => setSortOpen(!sortOpen)}>
                                <span>Sort by: <strong>{sortOption}</strong></span>
                                <ChevronDown size={16} className={`chevron-icon ${sortOpen ? 'open' : ''}`} />
                            </button>
                            {sortOpen && (
                                <ul className="dropdown-menu">
                                    {sortOptions.map(option => (
                                        <li
                                            key={option}
                                            className={sortOption === option ? 'active' : ''}
                                            onClick={() => { setSortOption(option); setSortOpen(false); }}
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

                {/* Services Display */}
                <div className={viewMode === 'grid' ? 'service-grid-view' : 'service-list-view'}>
                    {filteredServices.length > 0 ? (
                        filteredServices.map(service => <ServiceCard key={service.id} service={service} />)
                    ) : (
                        <p className="no-results">No services match your filters.</p>
                    )}
                </div>
            </main>
        </div>
    );
}
