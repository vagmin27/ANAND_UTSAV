import React from "react";
import { Heart, CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function ServiceCard({ service }) {
  const { favourites, toggleFavourite } = useUser();
  const isFav = favourites.includes(service._id);

  return (
    <div className="service-card-wrapper">
      <Link to={`/service/${service._id}`} className="service-card-link">
        <div className="service-card">
          <img
            src={service.images?.[0] || "/fallback.jpg"}
            className="card-background-image"
            alt={service.name}
          />

          <span className="service-category-tag">
            {service.categories?.name || "Unknown"}
          </span>

          <div className="card-content-overlay">
            <div className="card-top-section">
              <h4 className="service-name">{service.name}</h4>

              {/* ❤️ Toggle Button */}
              <button
                className="wishlist-btn"
                aria-label="Shortlist Service"
                onClick={(e) => {
                  e.preventDefault(); // stop Link navigation
                  toggleFavourite(service._id);
                }}
              >
                <Heart
                  size={18}
                  fill={isFav ? "red" : "none"}
                  color={isFav ? "red" : "currentColor"}
                />
              </button>
            </div>

            <div className="card-bottom-section">
              <p className="service-price">
                ₹{service.priceInfo?.amount} / {service.priceInfo?.unit}
              </p>
              <button className="booking-btn">
                <CalendarCheck size={16} />
                <span>Book Now</span>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

