import React, { useState, useEffect } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import axios from 'axios';

import ServiceCard from '../components/ServiceCard';
import "../css/AllServicesPage.css";

export default function AllServicesPage() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get('https://anand-u.vercel.app/category/getall');
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('❌ Failed to fetch categories:', err);
    }
  };

  // Fetch all services
  const fetchAllServices = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://anand-u.vercel.app/provider/allservices');
      const allServices = Array.isArray(res.data) ? res.data : [];
      console.log("📦 Sample service data:", allServices[0]);

      const servicesWithCategory = allServices.map((s) => ({
        ...s,
        categoryName: s.categories?.name || s.categories?.slug || s.categoryId || s.category || "Unknown",
      }));

      setServices(servicesWithCategory);
    } catch (err) {
      console.error('❌ Failed to fetch services:', err);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories once on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch all services once categories are loaded
  useEffect(() => {
    if (categories.length > 0) {
      fetchAllServices();
    }
  }, [categories]);

  // Handle category filter change
  const handleCategoryChange = async (category) => {
    let updatedCategories = [...selectedCategories];

    if (selectedCategories.includes(category.slug)) {
      updatedCategories = updatedCategories.filter(slug => slug !== category.slug);
    } else {
      updatedCategories.push(category.slug);
    }

    setSelectedCategories(updatedCategories);

    if (updatedCategories.length === 0) {
      fetchAllServices();
      return;
    }

    try {
      setLoading(true);
      const resArray = await Promise.all(
        updatedCategories.map(slug =>
          axios.get(`https://anand-u.vercel.app/category/services/${slug}`)
        )
      );

      const combinedServices = resArray.flatMap((r) => {
        const services = Array.isArray(r.data) ? r.data : [];
        return services.map((s) => ({
          ...s,
          categoryName: s.categories?.name || s.categories?.slug || s.categoryId || s.category || "Unknown",
        }));
      });

      console.log("📦 Filtered service sample:", combinedServices[0]);
      setServices(combinedServices);
    } catch (err) {
      console.error("❌ Failed to fetch services for selected categories:", err);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="services-page-background">
      <div className="services-page-container">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <h3>Categories</h3>
          <div className="category-checkboxes">
            {categories.map(cat => (
              <label key={cat._id} className="category-label">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.slug)}
                  onChange={() => handleCategoryChange(cat)}
                />
                {cat.name}
              </label>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="view-toggle">
            <button onClick={() => setViewMode('grid')}><LayoutGrid /></button>
            <button onClick={() => setViewMode('list')}><List /></button>
          </div>

          {loading ? (
            <p>Loading services...</p>
          ) : (
            <div className={viewMode === 'grid' ? 'service-grid-view' : 'service-list-view'}>
              {services.length > 0 ? (
                services.map(service => (
                  <ServiceCard
                    key={service._id}
                    service={service}
                    viewMode={viewMode}
                    categories={categories}
                  />
                ))
              ) : (
                <div className="no-results">
                  <h3>No Services Found</h3>
                  <p>Select another category.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

