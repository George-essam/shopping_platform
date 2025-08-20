import React, { useState, useEffect } from 'react';
import { Button, Stack } from 'react-bootstrap';
import formatCurrency from './formatCurrency';
import { useShoppingCart } from '../context/ShoppingCartContext';
import './CartItem.css';

const CartItem = ({ id, quantity }) => {
  const { removeItemFromCart } = useShoppingCart();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItem = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    getItem();
  }, [id]);

  if (loading) {
    return <div className="loading-text">Loading...</div>;
  }

  if (!item) {
    return <div className="error-text">Product not found</div>;
  }

  return (
    <Stack direction="horizontal" gap={3} className="cart-item">
      <img
        src={item.image}
        alt={item.title}
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
      <div className="total-price">
        {formatCurrency(item.price * quantity)}
      </div>
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
