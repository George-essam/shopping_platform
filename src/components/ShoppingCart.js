import React, { useEffect, useState } from 'react';
import { Offcanvas, Stack, Button } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import CartItem from './CartItem';
import formatCurrency from './formatCurrency';
import { Link } from 'react-router-dom';

const ShoppingCart = ({ isOpen }) => {
  const { cartItems, closeCart } = useShoppingCart();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    getItems();
  }, []);

  // ✅ Correct total calculation
  const total = cartItems.reduce((sum, cartItem) => {
    const product = items.find((i) => i.id === cartItem.id);
    if (!product) return sum; // in case API not loaded yet
    return sum + product.price * cartItem.quantity;
  }, 0);

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column justify-content-between">

        {/* Cart Items */}
        <div className="flex-grow-1">
          {cartItems.length > 0 ? (
            <Stack gap={3}>
              {cartItems.map((item) => {
                const product = items.find((i) => i.id === item.id);
                return product ? (
                  <CartItem key={item.id} {...item} product={product} />
                ) : null;
              })}
            </Stack>
          ) : (
            <div className="text-center text-muted my-5">
              <i className="fa fa-shopping-cart fa-3x mb-3"></i>
              <p>Your cart is empty</p>
            </div>
          )}
        </div>

        {/* Footer: Total + Checkout */}
        {cartItems.length > 0 && (
          <div className="cart-footer mt-3 pt-3 border-top">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0">Total</h6>
              <span className="fs-5">{formatCurrency(total)}</span>
            </div>
            <Link to="/checkout">
              <Button variant="dark" className="w-100">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;

