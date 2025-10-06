import React, { useState, useEffect } from "react";
import { LayoutGrid, LayoutList } from "lucide-react";
import { useUser } from "../context/UserContext";
import FavouriteSlide from "../components/FavouriteSlide";
import FavouriteCard from "../components/FavouriteCard";
import "../css/Favourites.css";
import axios from "axios";

export default function Favourites() {
  const { user, favourites, token } = useUser();
  const [favouriteServices, setFavouriteServices] = useState([]);
  const [viewMode, setViewMode] = useState("slide");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favourites.length > 0 && token) {
      const fetchFavouriteServices = async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            "https://anand-u.vercel.app/provider/allservices",
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const allServices = res.data; // array of all services
          const favServices = allServices.filter((s) =>
            favourites.includes(s._id)
          );

          setFavouriteServices(favServices);
        } catch (err) {
          console.error("Failed to fetch favourite services:", err);
        } finally {
          setLoading(false); // hide loader
        }
      };
      fetchFavouriteServices();
    } else {
      setFavouriteServices([]);
      setLoading(false);
    }
  }, [favourites, token]);

  if (!user) return <p>Please login to see your favourites.</p>;

  return (
    <div className="favourites-page">
      <div className="favourites-header">
        <h2>My Favourites</h2>
        <div className="view-toggle">
          <button
            className={viewMode === "slide" ? "active" : ""}
            onClick={() => setViewMode("slide")}
            aria-label="Slide View"
          >
            <LayoutGrid size={24} />
          </button>
          <button
            className={viewMode === "card" ? "active" : ""}
            onClick={() => setViewMode("card")}
            aria-label="Card View"
          >
            <LayoutList size={24} />
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading favourite services...</p> // ✅ show while fetching
      ) : favouriteServices.length === 0 ? (
        <p>You have no favourites yet.</p>
      ) : viewMode === "slide" ? (
        <FavouriteSlide services={favouriteServices} />
      ) : (
        <div className="favourite-cards-grid">
          {favouriteServices.map((service) => (
            <FavouriteCard key={service._id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
