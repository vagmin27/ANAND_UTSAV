// src/pages/MyReviewsPage.jsx
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useUser } from '../context/UserContext';
import '../css/MyReviewPage.css';
export default function MyReviewsPage() {
  const { token } = useUser();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // ✅ Fetch user's reviews
  const fetchMyReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://anand-u.vercel.app/review/userReview', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setReviews(res.data.reviews);
    } catch (err) {
      console.error('❌ Failed to fetch user reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchMyReviews();
  }, [token]);

  // 🗑️ Delete review from user's review list
  const handleDeleteReview = async (reviewId) => {
    if (!token) {
      alert('Please login to delete your review.');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      setDeletingId(reviewId);
      const res = await axios.delete(
        `https://anand-u.vercel.app/review/removereview/${reviewId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        alert(res.data.msg);
        await fetchMyReviews(); // Refresh list
      } else {
        alert(res.data.msg || 'Failed to delete review');
      }
    } catch (err) {
      console.error('❌ Error deleting review:', err);
      alert('Error deleting review');
    } finally {
      setDeletingId(null);
    }
  };

  // 🌀 Show loader
  if (loading) {
    return (
      <div className="my-reviews-page">
        <h2>My Reviews</h2>
        <p>Loading your reviews...</p>
      </div>
    );
  }

  return (
    <div className="my-reviews-page">
      <h2>My Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((r) => (
          <div key={r._id} className="review-item">
            <div className="review-header">
              <h3>{r.service?.name || 'Service Deleted'}</h3>
              <button
                className="delete-btn"
                onClick={() => handleDeleteReview(r._id)}
                disabled={deletingId === r._id}
                title="Delete review"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <p>⭐ {r.rating} — {r.review}</p>
            <small>{new Date(r.createdAt).toLocaleString()}</small>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}
