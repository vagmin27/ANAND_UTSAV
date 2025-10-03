import React, { useState } from "react";
import { useServiceProvider } from "../context/ServiceProviderContext";
import { useNavigate } from "react-router-dom";

export default function AddService() {
  const { addService } = useServiceProvider();
  const [form, setForm] = useState({
    name: "",
    categoryName: "",
    priceInfo: "",
    description: "",
    images: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newService = {
      id: Date.now().toString(),
      ...form,
      images: form.images ? [form.images] : [],
    };

    addService(newService);
    navigate("/provider/dashboard");
  };

  return (
    <div className="services-section">
      <h2 className="section-title">Add New Service</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px", width: "100%" }}>
        <input
          type="text"
          placeholder="Service Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category Name"
          value={form.categoryName}
          onChange={(e) => setForm({ ...form, categoryName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Price Info"
          value={form.priceInfo}
          onChange={(e) => setForm({ ...form, priceInfo: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.images}
          onChange={(e) => setForm({ ...form, images: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit" className="booking-btn">
          Add Service
        </button>
      </form>
    </div>
  );
}
