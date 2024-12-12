// components/ShoppingCart.js
import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Button } from 'react-bootstrap';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateCartItem } = useContext(CartContext);

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    updateCartItem(productId, newQuantity);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.product.id} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
              <p>{item.product.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.product.price * item.quantity}</p>
              <Button variant="danger" onClick={() => handleRemoveItem(item.product.id)}>
                Remove
              </Button>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleUpdateQuantity(item.product.id, parseInt(e.target.value))}
              />
            </div>
          ))}
          <p>Total: ${cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)}</p>
          <Button variant="primary">Proceed to Checkout</Button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;