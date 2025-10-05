// src/pages/ServiceDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/ServiceDetailsPage.css';
import { CalendarCheck } from 'lucide-react';
import { allCategories } from '../data/categoriesData';
import axios from 'axios';

const StarRating = ({ rating = 0 }) => {
  const totalStars = 5;
  const filledStars = Math.round(rating);
  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, i) => (
        <span key={i} className={i < filledStars ? 'star filled' : 'star'}>
          ★
        </span>
      ))}
    </div>
  );
};

function getCategoryName(id) {
  const cat = allCategories.find((c) => c.id === id);
  return cat ? cat.name : 'Unknown';
}

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get('https://anand-u.vercel.app/provider/allservices');
        const allServices = Array.isArray(res.data) ? res.data : [];
        const selectedService = allServices.find(s => s._id === id);
        setService(selectedService);

        if (selectedService?.images?.length > 0) {
          setMainImage(selectedService.images[0]);
        }
      } catch (err) {
        console.error('❌ Failed to fetch service:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) return <div className="service-details-page"><p>Loading service...</p></div>;
  if (!service) return <div className="service-details-page"><p>Service not found.</p></div>;

  const hasImages = service.images?.length > 0;

  return (
    <div className="service-details-page">
      <div className={`details-card ${!hasImages ? 'no-image' : ''}`}>
        {hasImages && (
          <div className="service-image-container">
            <img src={mainImage} alt={service.name} className="main-image" />
            <div className="thumbnail-gallery">
              {service.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${service.name} ${i}`}
                  className={`thumbnail ${mainImage === img ? 'active' : ''}`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="service-info">
          <div className="meta-info">
            <span className="category-tag">
              {getCategoryName(service.categoryId || service.category)}
            </span>
            <div className="rating-display">
              <span className="star-icon">★</span>
              <span>{service.rating || 4.5}</span>
            </div>
          </div>
          <h1>{service.name}</h1>
          <p className="description">{service.description}</p>

          <div className="price-and-cta">
            <p className="price">
              ₹{service.priceInfo?.amount || 0} {service.priceInfo?.unit && `/ ${service.priceInfo.unit}`}
            </p>
            <button className="cta-button">
              <CalendarCheck size={20} />
              <span>Book Service</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

