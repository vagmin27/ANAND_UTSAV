// src/pages/AllServicesPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LayoutGrid, List } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import "../css/AllServicesPage.css";

export default function AllServicesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('https://anand-u.vercel.app/provider/allservices');
        const serviceList = Array.isArray(res.data) ? res.data : [];
        setServices(serviceList);
      } catch (err) {
        console.error('❌ Failed to fetch services:', err);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter((s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [services, searchQuery]);

  return (
    <div className="services-page-background">
      <div className="services-page-container">
        {/* --- Sidebar --- */}
        <aside className="filters-sidebar">
          <h3>Filters</h3>
          <p>Search and explore our top-rated services.</p>
          <input
            type="text"
            placeholder="Search..."
            className="filter-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </aside>

        {/* --- Main Content --- */}
        <main className="main-content">
          <div className="view-toggle">
            <button onClick={() => setViewMode('grid')}>
              <LayoutGrid />
            </button>
            <button onClick={() => setViewMode('list')}>
              <List />
            </button>
          </div>

          <div className={viewMode === 'grid' ? 'service-grid-view' : 'service-list-view'}>
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <ServiceCard key={service._id} service={service} viewMode={viewMode} />
              ))
            ) : (
              <div className="no-results">
                <h3>No Services Found</h3>
                <p>Try searching something else.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
