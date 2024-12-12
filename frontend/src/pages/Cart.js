// pages/Cart.js
import React, { useContext, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { ProductContext } from '../context/ProductContext';
import swal from 'sweetalert';

const Cart = () => {
  const { cartItems, removeFromCart, updateCartItem } = useContext(CartContext);
  const { products } = useContext(ProductContext);

  const handleRemoveFromCart = (productId) => {
    swal({
      title: 'Remove Item',
      text: 'Are you sure you want to remove this item from your cart?',
      icon: 'warning',
      buttons: ['Cancel', 'Remove'],
      dangerMode: true,
    }).then((willRemove) => {
      if (willRemove) {
        removeFromCart(productId);
        swal('Item Removed', 'The item has been removed from your cart.', 'success');
      }
    });
  };

  const handleUpdateCartItem = (productId, newQuantity) => {
    if (newQuantity === '') {
      // If the input is empty, treat it as deletion
      handleRemoveFromCart(productId);
    } else {
      updateCartItem(productId, parseInt(newQuantity, 10));
      swal('Quantity Updated', 'Quantity updated in your cart', 'success');
    }
  };

  // State to track input values
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (productId, value) => {
    console.log(`Updating product ${productId} to quantity ${value}`);
    setInputValues((prevValues) => ({ ...prevValues, [productId]: value }));
  };
  return (
    <Container>
      <h2 className="mt-5" style={{ fontFamily: 'Impact, sans-serif' , fontSize:'50px'}}>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              // Find the product details using product_id
              const product = products.find((product) => product.id === item.product_id);

              return (
                <tr key={item.product_id}>
                  <td>{product?.name}</td>
                  <td>Ksh {product?.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={inputValues[item.product_id] || item.quantity}
                      onChange={(e) => handleInputChange(item.product_id, e.target.value)}
                    />
                  </td>
                  <td>Ksh {(product?.price * (inputValues[item.product_id] || item.quantity)).toFixed(2)}</td>
                  <td>
                    <Button style={{ marginRight: '10px' }}
                      variant="success"
                      onClick={() => handleUpdateCartItem(item.id, (inputValues[item.product_id] || item.quantity))}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Cart;