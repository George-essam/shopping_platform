import React from 'react';
import { Button, Card } from 'react-bootstrap';
import formatCurrency from './formatCurrency';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { useNavigate } from 'react-router-dom';
import './StoreItem.css';

const StoreItem = ({ id, price, title, image }) => {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeItemFromCart } = useShoppingCart();
  const quantity = getItemQuantity(id);
  const navigate = useNavigate();

  const handleBuyNowClick = () => {
    navigate(`/store/${id}`);
  };

  return (
    <Card className="store-item-card h-100 shadow-sm">
      <div className="img-wrapper">
        <Card.Img src={image} variant="top" className="store-item-img" />
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-3">
          <span className="store-item-title">{title}</span>
          <span className="store-item-price">{formatCurrency(price)}</span>
        </Card.Title>

        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100 add-btn" onClick={() => increaseCartQuantity(id)}>
              Add to Cart
            </Button>
          ) : (
            <div className="d-flex flex-column align-items-center gap-2">
              <div className="d-flex align-items-center justify-content-center gap-2">
                <Button
                  className="qty-btn"
                  onClick={() => (quantity === 1 ? removeItemFromCart(id) : decreaseCartQuantity(id))}
                >
                  −
                </Button>
                <span className="fs-5 fw-semibold">{quantity} in cart</span>
                <Button className="qty-btn" onClick={() => increaseCartQuantity(id)}>
                  +
                </Button>
              </div>
              <Button variant="danger" size="sm" onClick={() => removeItemFromCart(id)}>
                Remove
              </Button>
            </div>
          )}

          <div className="text-center mt-3">
            <Button variant="outline-dark" className="buy-now-btn" onClick={handleBuyNowClick}>
              Buy Now
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
