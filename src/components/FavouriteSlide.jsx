import React from "react";
import { Heart, CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../css/Favourites.css";

export default function FavouriteSlide({ services }) {
  const { favourites, toggleFavourite } = useUser();

  return (
    <div className="slide-view">
      {services.map((service) => {
        const isFavourite = favourites.includes(service._id);

        return (
          <div key={service._id} className="service-card">
            <Link to={`/service/${service._id}`} className="service-card-link">
              <img
                src={service.images[0]}
                alt={service.name}
                className="card-background-image"
              />
            </Link>

            <div className="card-content-overlay">
              <div className="card-top-section">
                <h4 className="service-name">{service.name}</h4>
                <button
                  className={`wishlist-btn ${isFavourite ? "active" : ""}`}
                  onClick={() => toggleFavourite(service._id)}
                  aria-label="Toggle Favourite"
                >
                  <Heart
                    fill={isFavourite ? "red" : "none"}
                    color={isFavourite ? "red" : "#ff671f"}
                    size={18}
                  />
                </button>
              </div>

              <p className="service-price">
  ₹{service.priceInfo?.amount || 0} {service.priceInfo?.unit ? `/ ${service.priceInfo.unit}` : ""}
</p>


              <div className="card-bottom-section">
                <button className="booking-btn">
                  <CalendarCheck size={18} />
                  <span>Book Now</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
