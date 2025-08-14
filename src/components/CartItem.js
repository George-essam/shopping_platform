import React, { useState, useEffect } from 'react';
import { Button, Stack } from 'react-bootstrap';
import formatCurrency from './formatCurrency';
import { useShoppingCart } from '../context/ShoppingCartContext';
import './CartItem.css';

const CartItem = ({ id, quantity }) => {
  const { removeItemFromCart } = useShoppingCart();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const getItem = async () => {
      const response = await fetch("http://fakestoreapi.com/products");
      const data = await response.json();
      setItem(data.find((i) => i.id === id) || null);
    };
    getItem();
  }, [id]);

  if (!item) {
    return <div className="loading-text">Loading...</div>;
  }

  return (
    <Stack direction="horizontal" gap={3} className="cart-item">
      <img
        src={item.image}
        alt="cart-img"
        className="cart-item-img"
      />
      <div className="me-auto cart-item-info">
        <div className="cart-item-title">
          {item.title}
          {quantity > 1 && (
            <span className="quantity-badge">x{quantity}</span>
          )}
        </div>
        <div className="text-muted price">
          {formatCurrency(item.price)}
        </div>
      </div>
      <div className="total-price">{formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        className="remove-btn"
        onClick={() => removeItemFromCart(id)}
      >
        &times;
      </Button>
    </Stack>
  );
};

export default CartItem;
