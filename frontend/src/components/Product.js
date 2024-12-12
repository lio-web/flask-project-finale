// components/Product/Product.js
import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000); // Reset added to cart message after 2 seconds
  };
  
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={product.image} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>${product.price}</Card.Text>
        <Button variant="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Link to={`/products/${product.id}`} className="btn btn-link">
          View Details
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Product;