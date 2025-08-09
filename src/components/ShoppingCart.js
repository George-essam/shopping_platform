import React, { useEffect, useState } from 'react';
import { Offcanvas, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import CartItem from './CartItem';
import formatCurrency from './formatCurrency';
import storeItems from"../data/storeItems.json";
import {Link } from "react-router-dom";

const ShoppingCart = ({isOpen}) => {
  const {cartItems,closeCart}= useShoppingCart();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const response = await fetch('http://fakestoreapi.com/products');
      const data = await response.json();
      setItems(data);
    };
    getItems();
  }, []);

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => {
            const product = items.find((i) => i.id === item.id);
            return <CartItem key={item.id} {...item} product={product} />;
          })}
          <div className="ms-auto fw-bold fs-5">
            Total{' '}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = items.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
          <div className="mx-auto">
                { cartItems.reduce((total,cartItem) =>{
                    const item = storeItems.find((i) => i.id === cartItem.id);
                    return <Link to="/Checkout"><button className="btn btn-outline-dark me-2">Checkout</button></Link>;
                },null)}
            </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;