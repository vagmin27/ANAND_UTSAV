import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { allServices } from '../data/servicesData';
import { allCategories } from '../data/categoriesData';
import { LayoutGrid, List, Search, ChevronDown, Tag, CircleDollarSign, Star } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import "../css/AllServicesPage.css";

export default function AllServicesPage() {
    const location = useLocation();
    const MAX_PRICE = 100000;

    // State for collapsible filter sections
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const [isPriceOpen, setIsPriceOpen] = useState(true);
    const [isRatingOpen, setIsRatingOpen] = useState(true);

    // Staging State (holds selections before "Apply")
    const [tempCategories, setTempCategories] = useState([]);
    const [tempPrice, setTempPrice] = useState(MAX_PRICE);
    const [tempRating, setTempRating] = useState(null);

    // Applied State (drives the visible list)
    const [appliedCategories, setAppliedCategories] = useState([]);
    const [appliedPrice, setAppliedPrice] = useState(MAX_PRICE);
    const [appliedRating, setAppliedRating] = useState(null);

    // Instant State (for sort, search, view)
    const [sortOption, setSortOption] = useState('Popularity');
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState('grid');

    const sortOptions = ['Popularity', 'Rating', 'Price: Low to High', 'Price: High to Low'];

    // Derived state for filter summaries
    const selectedCategoryNames = useMemo(() =>
        allCategories
            .filter(cat => tempCategories.includes(cat.id))
            .map(cat => cat.name)
        , [tempCategories]);

    useEffect(() => {
        const preSelectedId = location.state?.preSelectedCategoryId;
        if (preSelectedId) {
            setTempCategories([preSelectedId]);
            setAppliedCategories([preSelectedId]);
        }
    }, [location.state]);

    const handleCategoryChange = (categoryId) => {
        setTempCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleApplyFilters = () => {
        setAppliedCategories(tempCategories);
        setAppliedPrice(tempPrice);
        setAppliedRating(tempRating);
    };

    const clearFilters = () => {
        setTempCategories([]);
        setTempPrice(MAX_PRICE);
        setTempRating(null);
        setAppliedCategories([]);
        setAppliedPrice(MAX_PRICE);
        setAppliedRating(null);
        setSearchQuery("");
    };

    const filteredServices = useMemo(() => {
        return allServices.filter(service => {
            const matchCategory = appliedCategories.length === 0 ? true : appliedCategories.includes(service.categoryId);
            const matchPrice = service.price <= appliedPrice;
            const matchRating = appliedRating ? service.rating >= appliedRating : true;
            const matchSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchCategory && matchPrice && matchRating && matchSearch;
        });
    }, [appliedCategories, appliedPrice, appliedRating, searchQuery]);

    const sortedAndFilteredServices = useMemo(() => {
        const sorted = [...filteredServices];
        if (sortOption === 'Rating') sorted.sort((a, b) => b.rating - a.rating);
        else if (sortOption === 'Price: Low to High') sorted.sort((a, b) => a.price - b.price);
        else if (sortOption === 'Price: High to Low') sorted.sort((a, b) => b.price - a.price);
        return sorted;
    }, [filteredServices, sortOption]);

    return (
        <div className="services-page-background">
            <div className="services-page-container">
                <aside className="filters-sidebar">
                    <h3>Filters</h3>
                    <div className="filter-group">
                        <h4 className="filter-title" onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
                            <div className="title-content">
                                <Tag size={16} /> Category
                                {!isCategoryOpen && selectedCategoryNames.length > 0 && (
                                    <span className="selected-summary">{selectedCategoryNames.join(', ')}</span>
                                )}
                            </div>
                            <ChevronDown size={16} className={`chevron-icon ${isCategoryOpen ? 'open' : ''}`} />
                        </h4>
                        {isCategoryOpen && (
                            <div className="category-checkbox-list">
                                {allCategories.map(cat => (
                                    <label key={cat.id} className="checkbox-label">
                                        <input type="checkbox" checked={tempCategories.includes(cat.id)} onChange={() => handleCategoryChange(cat.id)} />
                                        <span className="custom-checkbox"></span>{cat.name}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="filter-group">
                        <h4 className="filter-title" onClick={() => setIsPriceOpen(!isPriceOpen)}>
                            <div className="title-content"><CircleDollarSign size={16} /> Price Range</div>
                            <ChevronDown size={16} className={`chevron-icon ${isPriceOpen ? 'open' : ''}`} />
                        </h4>
                        {isPriceOpen && (
                            <div className="price-slider-container">
                                <div className="price-value">Up to ₹{Number(tempPrice).toLocaleString('en-IN')}</div>
                                <input type="range" min="10000" max={MAX_PRICE} step="5000" value={tempPrice} onChange={(e) => setTempPrice(Number(e.target.value))} className="price-slider" />
                            </div>
                        )}
                    </div>
                    <div className="filter-group">
                        <h4 className="filter-title" onClick={() => setIsRatingOpen(!isRatingOpen)}>
                            <div className="title-content"><Star size={16} /> Rating</div>
                            <ChevronDown size={16} className={`chevron-icon ${isRatingOpen ? 'open' : ''}`} />
                        </h4>
                        {isRatingOpen && (
                            <div className="rating-options">
                                {[4.5, 4.0, 3.5].map(r => (
                                    <button key={r} className={`rating-pill ${tempRating === r ? 'active' : ''}`} onClick={() => setTempRating(prev => prev === r ? null : r)}>{r} ★ & up</button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="sidebar-actions">
                        <button className="apply-btn" onClick={handleApplyFilters}>Apply Filters</button>
                        <button className="clear-filters-btn" onClick={clearFilters}>Clear All</button>
                    </div>
                </aside>
                <main className="main-content">
                    <header className="page-header">
                        <div className="search-bar">
                            <Search size={20} className="search-icon" />
                            <input type="text" placeholder="Search services, vendors..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        <div className="header-right">
                            <div className="custom-dropdown">
                                <button className="dropdown-toggle">
                                    <span>Sort by: <strong>{sortOption}</strong></span>
                                    <ChevronDown size={16} />
                                </button>
                                <ul className="dropdown-menu">
                                    {sortOptions.map(option => (
                                        <li key={option} className={sortOption === option ? 'active' : ''} onClick={() => setSortOption(option)}>{option}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="view-toggle">
                                <button onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'active' : ''} aria-label="Grid View"><LayoutGrid size={18} /></button>
                                <button onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'active' : ''} aria-label="List View"><List size={18} /></button>
                            </div>
                        </div>
                    </header>
                    <div className={viewMode === 'grid' ? 'service-grid-view' : 'service-list-view'}>
                        {sortedAndFilteredServices.length > 0 ? (
                            sortedAndFilteredServices.map(service => (
                                <ServiceCard key={service.id} service={service} viewMode={viewMode} />
                            ))
                        ) : (
                            <div className="no-results">
                                <h3>No Services Found</h3>
                                <p>Try adjusting your filters or search term.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}