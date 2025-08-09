import React, { useState, useEffect } from 'react';
import { Button, Stack } from 'react-bootstrap';
import formatCurrency from './formatCurrency';
import { useShoppingCart } from '../context/ShoppingCartContext';

const CartItem = ({ id, quantity }) => {
  const { removeItemFromCart } = useShoppingCart();
  const [item, setItem] = useState(null);

  const getItem = async () => {
    const response = await fetch("http://fakestoreapi.com/products");
    const data = await response.json(); // Wait for the response to resolve
    return data;
  };

  const getItemAndFind = async () => {
    const data = await getItem();
    const item = data.find((i) => i.id === id);
    if (item == null) return null;
    return item;
  };

  useEffect(() => {
    getItemAndFind().then((item) => setItem(item));
  }, [id]);

  if (!item) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.image}
        alt="cart-img"
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.title}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: "0.65rem" }}>
              x{quantity}
            </span>
          )}
        </div>

        <div className="text-muted" style={{ fontSize: "0.75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button variant="outline-danger" size="sm" onClick={() => removeItemFromCart(id)}>
        &times;
      </Button>
    </Stack>
  );
};

export default CartItem;
