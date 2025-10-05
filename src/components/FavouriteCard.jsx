import React from "react";
import { Heart, CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../css/Favourites.css";

export default function FavouriteCard({ service }) {
  const { favourites, toggleFavourite } = useUser();
  const isFavourite = favourites.includes(service._id);

  return (
    <div className="fullwidth-card">
      <Link to={`/service/${service._id}`} className="fullwidth-image-link">
        <div className="fullwidth-image">
          <img src={service.images[0]} alt={service.name} />
        </div>
      </Link>

      <div className="fullwidth-overlay">
        <div className="overlay-left">
          <h4 className="service-name">{service.name}</h4>
          <p className="service-price">
  ₹{service.priceInfo?.amount || 0} {service.priceInfo?.unit ? `/ ${service.priceInfo.unit}` : ""}
</p>

        </div>

        <div className="overlay-right">
          <button
            className="wishlist-btn"
            onClick={() => toggleFavourite(service._id)}
            aria-label="Toggle Favourite"
          >
            <Heart
              fill={isFavourite ? "red" : "none"}
              color={isFavourite ? "red" : "#ff671f"}
              size={18}
            />
          </button>

          <button className="booking-btn">
            <CalendarCheck size={18} />
            <span>Book Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}

