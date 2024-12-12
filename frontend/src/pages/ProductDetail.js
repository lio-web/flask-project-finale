// pages/ProductDetail.js
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';
import swal from 'sweetalert';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  // Find the product with the specified ID
  const product = products.find((product) => product.id === parseInt(id));

  // State to track the quantity selected by the user
  const [quantity, setQuantity] = useState(1);

  // Function to handle adding the product to the cart
  const handleAddToCart = () => {
    // Add the product to the cart with the selected quantity
    addToCart(product, quantity);

    // Show a success message using sweetalert
    swal('Added to Cart', `${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to your cart.`, 'success');
  };

  if (!product) {
    // Display a loading state or error message if the product is not found
    return <p>Product not found.</p>;
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={product.image} alt={product.name} />
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text>Price: Ksh {product.price}</Card.Text>
              <Card.Text>
                Quantity:
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                  min="1"
                />
              </Card.Text>
              <Button variant="primary" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;