import React, { useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';
import swal from 'sweetalert';
import './ProductList.css';

const ProductList = () => {
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    const quantity = 1;
    addToCart(product, quantity);
    swal('Added to Cart', `${product.name} has been added to your cart!`, 'success');
  };

  if (!products || products.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <h3>No products available at the moment. Please check back later!</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4" style={{ fontFamily: 'Impact, sans-serif', fontSize: '50px' }}>
        PRODUCT LIST
      </h2>
      <Row className="mt-4">
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
            <Card className="product-card">
              <Card.Img
                variant="top"
                src={product.image}
                className="product-image"
                loading="lazy"
              />
              <Card.Body>
                <Card.Title className="product-title">{product.name}</Card.Title>
                <Card.Text className="product-description">{product.description}</Card.Text>
                <div className="d-flex flex-column product-buttons">
                  <Link to={`/products/${product.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                  <Button
                    variant="success"
                    onClick={() => handleAddToCart(product)}
                    aria-label={`Add ${product.name} to Cart`}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
