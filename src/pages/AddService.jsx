import React, { useState } from "react";
import { providerAddServiceRequest } from "../utils/providerAuthApi";
import { useNavigate } from "react-router-dom";

export default function AddService() {
  const [form, setForm] = useState({
    name: "",
    categoryName: "",
    priceAmount: "",
    priceUnit: "full",
    description: "",
    images: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: form.name.trim(),
      categoryName: form.categoryName.trim(),
      description: form.description.trim(),
      images: form.images ? form.images.split(",").map((img) => img.trim()) : [],
      priceInfo: {
        amount: Number(form.priceAmount),
        unit: form.priceUnit,
      },
    };

    const res = await providerAddServiceRequest(payload);

    if (res.success) {
      alert("✅ Service added successfully");

      // ✅ Pass the new service to dashboard instantly
      navigate("/provider/dashboard", { state: { newService: res.service } });
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
        <select
          value={form.categoryName}
          onChange={(e) => setForm({ ...form, categoryName: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          <option value="Catering">Catering</option>
          <option value="Decorations">Decorations</option>
          <option value="Photography">Photography</option>
          <option value="Videography">Videography</option>
          <option value="Beauty & Makeup">Beauty & Makeup</option>
          <option value="Fashion & Attire">Fashion & Attire</option>
          <option value="Invitations">Invitations</option>
          <option value="Venues">Venues</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Music Bands">Music Bands</option>
          <option value="DJs">DJs</option>
          <option value="Travel">Travel</option>
          <option value="Transport">Transport</option>
          <option value="Event Planning">Event Planning</option>
          <option value="Florists">Florists</option>
          <option value="Production (Sound & Lights)">Production (Sound & Lights)</option>
          <option value="Fireworks">Fireworks</option>
          <option value="Mehndi Artists">Mehndi Artists</option>
          <option value="Gifting">Gifting</option>
          <option value="Jewellery">Jewellery</option>
        </select>

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
