import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import swal from 'sweetalert';
import { api } from "../api"; // Ensure this points to your API base URL

const ReviewForm = ({ productId }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    // Get JWT token from localStorage (or wherever you store it)
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   swal('Error', 'You must be logged in to submit a review', 'error');
    //   return;
    // }

    // Validation: Ensure review text is not empty
    if (!reviewText.trim()) {
      swal('Review Error', 'Please enter a review before submitting', 'error');
      return;
    }

    // Validation: Ensure a rating is selected
    if (rating === 0) {
      swal('Rating Error', 'Please select a rating before submitting', 'error');
      return;
    }

    // Set loading state
    setIsLoading(true);

    try {
      // Send the review and rating data to the backend API
      const response = await fetch(`${api}/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the header
        },
        body: JSON.stringify({
          reviewText,
          rating,
          productId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        swal('Review Submitted', 'Your review has been successfully submitted!', 'success');

        // Reset form fields after submission
        setReviewText('');
        setRating(0);
      } else {
        swal('Submission Error', data.error || 'Failed to submit the review. Please try again.', 'error');
      }
    } catch (error) {
      swal('Submission Error', 'There was an error submitting your review. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
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
            disabled={isLoading} // Disable textarea while submitting
          />
        </Form.Group>

        <Form.Group controlId="rating">
          <Form.Label>Rating </Form.Label>
          <Form.Control
            as="select"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            disabled={isLoading} // Disable rating select while submitting
          >
            <option value={0}>Select  Rating</option>
            <option value={1}>1 - Poor</option>
            <option value={2}>2 - Fair</option>
            <option value={3}>3 - Good</option>
            <option value={4}>4 - Very Good</option>
            <option value={5}>5 - Excellent</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner animation="border" size="sm" /> Submitting...
            </>
          ) : (
            'Submit Review'
          )}
        </Button>
      </Form>
    </div>
  );
};

export default ReviewForm;
