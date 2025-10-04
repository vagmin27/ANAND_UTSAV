import React, { useState } from "react";
import { providerAddServiceRequest } from "../utils/providerAuthApi";
import { useNavigate } from "react-router-dom";

export default function AddService() {
  const [form, setForm] = useState({
    name: "",
    categoryName: "",
    priceAmount: "", // new
    priceUnit: "full", // default
    description: "",
    images: "", // store as string for input field
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Always send images as array, priceInfo as object
    const payload = {
      name: form.name.trim(),
      categoryName: form.categoryName.trim(),
      description: form.description.trim(),
      images: form.images
        ? form.images.split(",").map((img) => img.trim())
        : [],
      priceInfo: {
        amount: Number(form.priceAmount),
        unit: form.priceUnit,
      },
    };

    const res = await providerAddServiceRequest(payload);

    if (res.success) {
      alert("✅ Service added successfully");
      navigate("/provider/dashboard");
    } else {
      alert(res.msg || "❌ Failed to add service");
    }

    setLoading(false);
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
          type="number"
          placeholder="Price Amount"
          value={form.priceAmount}
          onChange={(e) => setForm({ ...form, priceAmount: e.target.value })}
          required
        />
        <select
          value={form.priceUnit}
          onChange={(e) => setForm({ ...form, priceUnit: e.target.value })}
          required
        >
          <option value="full">Full</option>
          <option value="per-hour">Per Hour</option>
          <option value="per-session">Per Session</option>
        </select>
        <input
          type="text"
          placeholder="Image URL(s), comma separated"
          value={form.images}
          onChange={(e) => setForm({ ...form, images: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit" className="booking-btn" disabled={loading}>
          {loading ? "Adding..." : "Add Service"}
        </button>
      </form>
    </div>
  );
}
