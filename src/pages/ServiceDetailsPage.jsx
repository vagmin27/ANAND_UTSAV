import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { allServices } from '../data/servicesData';
import '../css/ServiceDetailsPage.css'; // Using the updated CSS
import { CalendarCheck } from 'lucide-react';
import { allCategories } from '../data/categoriesData';

// Helper component to display star ratings
const StarRating = ({ rating }) => {
    const totalStars = 5;
    const filledStars = Math.round(rating);
    return (
        <div className="star-rating">
            {[...Array(totalStars)].map((_, index) => (
                <span key={index} className={index < filledStars ? 'star filled' : 'star'}>★</span>
            ))}
        </div>
    );
};

function getCategoryName(id) {
    const cat = allCategories.find(c => c.id === id);
    return cat ? cat.name : "Unknown";
}

export default function ServiceDetailsPage() {
    const { id } = useParams();
    const serviceId = Number(id);
    const service = allServices.find(s => s.id === serviceId);

    const [mainImage, setMainImage] = useState('');
    const hasImages = service && service.images && service.images.length > 0;
    const hasReviews = service && service.reviews && service.reviews.length > 0;

    useEffect(() => {
        if (hasImages) {
            setMainImage(service.images[0]);
        }
    }, [service, hasImages]);

    if (!service) {
        return <div className="service-details-page"><p>Service not found.</p></div>;
    }

    return (
        <div className="service-details-page">
            <div className={`details-card ${!hasImages ? 'no-image' : ''}`}>
                {hasImages && (
                    <div className="service-image-container">
                        <img src={mainImage} alt={service.name} className="main-image" />
                        <div className="thumbnail-gallery">
                            {service.images.map((imgSrc, index) => (
                                <img
                                    key={index}
                                    src={imgSrc}
                                    alt={`${service.name} thumbnail ${index + 1}`}
                                    className={`thumbnail ${mainImage === imgSrc ? 'active' : ''}`}
                                    onClick={() => setMainImage(imgSrc)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className="service-info">
                    {/* ... (meta-info, h1, description) ... */}
                    <div className="meta-info">
                        <span className="category-tag">{service.category || getCategoryName(service.categoryId)}</span>
                        <div className="rating-display">
                            <span className="star-icon">★</span>
                            <span>{service.rating}</span>
                        </div>
                    </div>
                    <h1>{service.name}</h1>
                    {service.description && <p className="description">{service.description}</p>}

                    <div className="price-and-cta">
                        <p className="price">{service.priceInfo}</p>
                        <button className="cta-button">
                            <CalendarCheck size={20} />
                            <span>Book Service</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* --- ✨ NEW REVIEWS SECTION ✨ --- */}
            {hasReviews && (
                <div className="reviews-section">
                    <h2 className="reviews-title">What Customers Are Saying</h2>
                    <div className="reviews-list">
                        {service.reviews.map((review) => (
                            <div key={review.id} className="review-card">
                                <div className="review-header">
                                    <span className="review-author">{review.author}</span>
                                    <StarRating rating={review.rating} />
                                </div>
                                <p className="review-comment">"{review.comment}"</p>
                                <span className="review-date">{new Date(review.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}