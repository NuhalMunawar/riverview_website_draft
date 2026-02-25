import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

interface Review {
  id: number;
  customer_name: string;
  rating: number;
  comment: string;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const loadReviews = () => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(console.error);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleSubmitReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');

    const safeName = customerName.trim();
    const safeComment = comment.trim();

    if (!safeName || !safeComment) {
      setFormError('Please enter your name and review.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: safeName,
          rating,
          comment: safeComment,
        }),
      });

      if (!response.ok) {
        throw new Error('Could not submit review');
      }

      const newReview: Review = await response.json();

      setReviews((prevReviews) => [newReview, ...prevReviews]);

      setCustomerName('');
      setRating(5);
      setComment('');
    } catch (error) {
      setFormError('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-20 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold uppercase tracking-tight">What Players Say</h2>
          <p className="mt-4 text-stone-400">Real reviews from our community.</p>
        </div>

        <div className="max-w-3xl mx-auto mb-12 bg-stone-800 rounded-2xl border border-stone-700 p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-4">Write Your Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label htmlFor="review-name" className="block text-sm text-stone-300 mb-2">Name</label>
              <input
                id="review-name"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full rounded-lg bg-stone-900 border border-stone-700 px-4 py-2 text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Your name"
                maxLength={50}
              />
            </div>

            <div>
              <label htmlFor="review-rating" className="block text-sm text-stone-300 mb-2">Rating</label>
              <select
                id="review-rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full rounded-lg bg-stone-900 border border-stone-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {[5, 4, 3, 2, 1].map((value) => (
                  <option key={value} value={value}>{value} Star{value > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="review-comment" className="block text-sm text-stone-300 mb-2">Review</label>
              <textarea
                id="review-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full rounded-lg bg-stone-900 border border-stone-700 px-4 py-2 text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Share your experience"
                rows={4}
                maxLength={300}
              />
            </div>

            {formError && <p className="text-red-400 text-sm">{formError}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-emerald-600 rounded-full font-semibold hover:bg-emerald-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.slice(0, 3).map((review, i) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-stone-800 rounded-2xl p-8 border border-stone-700"
            >
              <div className="flex gap-1 mb-4 text-emerald-400">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={18} fill={idx < review.rating ? "currentColor" : "none"} />
                ))}
              </div>
              <p className="text-stone-300 mb-6 italic">"{review.comment}"</p>
              <div className="font-semibold text-white">{review.customer_name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
