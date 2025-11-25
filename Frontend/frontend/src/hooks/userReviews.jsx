// src/hooks/useReviews.js
import { useState, useEffect } from 'react';
import API from '../api/api';

const useReviews = (movieId, userId) => {
  const [reviews, setReviews] = useState([]);
  const [ratingStats, setRatingStats] = useState({1:0,2:0,3:0,4:0,5:0});

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/reviews/movie/${movieId}?user_id=${userId || 0}&limit=50&offset=0`);
      if (res.data.status === 'success') {
        const revs = res.data.data;
        setReviews(revs);

        // Calculate rating statistics
        const stats = {1:0,2:0,3:0,4:0,5:0};
        revs.forEach(r => { stats[r.rating] = (stats[r.rating] || 0) + 1 });
        setRatingStats(stats);
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  };

  useEffect(() => {
    if (!movieId) return;
    fetchReviews();
  }, [movieId, userId]);

  return { reviews, ratingStats, fetchReviews };
};

export default useReviews;
