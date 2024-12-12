// components/Review/ReviewForm.js
import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import swal from 'sweetalert';

const ReviewForm = ({ productId }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    // Validation: Ensure review text is not empty
    if (!reviewText.trim()) {
      // Provide feedback to the user, e.g., show an error message
      swal('Review Error', 'Please enter a review before submitting', 'error');
      return;
    }

    // Mock API request to submit the review (replace with actual API call)
    // For demonstration purposes, we'll just show a success message
    swal('Review Submitted', 'Your review has been submitted successfully', 'success');

    // Reset form fields after submission
    setReviewText('');
    setRating(0);
  };

  return (
    <div className="mt-4">
      <h3>Write a Review</h3>
      <Form onSubmit={handleReviewSubmit}>
        <Form.Group controlId="reviewText">
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="rating">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
          >
            <option value={0}>Select Rating</option>
            <option value={1}>1 - Poor</option>
            <option value={2}>2 - Fair</option>
            <option value={3}>3 - Good</option>
            <option value={4}>4 - Very Good</option>
            <option value={5}>5 - Excellent</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit Review
        </Button>
      </Form>
    </div>
  );
};

export default ReviewForm;