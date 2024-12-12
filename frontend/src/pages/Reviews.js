// src/pages/Reviews.js
import React, { useState } from 'react';
import { ListGroup, Alert, Form, Button } from 'react-bootstrap';
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Retrieve the user ID dynamically (for example, from localStorage)
  const userId = localStorage.getItem('userId') || 'guest'; // Default to 'guest' if no userId is found

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!reviewText.trim()) {
      alert('Please enter a review text!');
      return;
    }

    if (rating === 0) {
      alert('Please select a rating!');
      return;
    }

    setIsSubmitting(true);

   
    setTimeout(() => {
      const newReview = {
        reviewText,
        rating,
        user_id: userId, // Dynamic user_id
      };

      setReviews([...reviews, newReview]);

      // Clear form fields after submission
      setReviewText('');
      setRating(0);

      setIsSubmitting(false);
    }, 1000); // Simulating async operation
  };

  return (
    <div className="reviews-page">
      <h1>Customer Reviews</h1>

      {/* Review Form */}
      <Form onSubmit={handleReviewSubmit}>
        <Form.Group controlId="reviewText">
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            disabled={isSubmitting} // Disable textarea while submitting
          />
        </Form.Group>

        <Form.Group controlId="rating">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            disabled={isSubmitting} // Disable rating select while submitting
          >
            <option value={0}>Select Rating</option>
            <option value={1}>1 - Poor</option>
            <option value={2}>2 - Fair</option>
            <option value={3}>3 - Good</option>
            <option value={4}>4 - Very Good</option>
            <option value={5}>5 - Excellent</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </Form>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <Alert variant="info">No reviews available. Be the first to write one!</Alert>
      ) : (
        <ListGroup className="mt-4">
          {reviews.map((review, index) => (
            <ListGroup.Item key={index}>
              <h5>User ID: {review.user_id}</h5>
              <p>Rating: {review.rating}</p>
              <p>{review.reviewText}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default Reviews;
