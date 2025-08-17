import React, { useState } from 'react';
import {
  Button,
  Container,
  Nav,
  Navbar as NavbarBs,
  Offcanvas,
  Form
} from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { STATUS } from './status';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { openCart, cartQuantity } = useShoppingCart();
  const [searchQuery, setSearchQuery] = useState("");

  const logoutHandle = () => {
    STATUS.isLogged = false;
    navigate('/home');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/store?search=${searchQuery}`);
  };

  return (
    <NavbarBs expand="lg" sticky="top" className="custom-navbar shadow-sm">
      <Container className="d-flex align-items-center justify-content-between">
        
        {/* Brand */}
        <NavbarBs.Brand as={NavLink} to="/" className="brand-name">
          <i className="fas fa-gem me-2"></i> Grand Bazar
        </NavbarBs.Brand>

        {/* Mobile Toggle */}
        <NavbarBs.Toggle aria-controls="offcanvasNavbar" />
        <NavbarBs.Offcanvas id="offcanvasNavbar" placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            
            {/* Center: Nav Links */}
            <Nav className="me-auto nav-links">
              <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
              <Nav.Link as={NavLink} to="/store">Store</Nav.Link>
            </Nav>

            {/* Search Bar */}
            <Form className="search-form my-3 my-lg-0" onSubmit={handleSearch}>
              <div className="input-wrapper">
                <i id="search-icon" className="fas fa-search" onClick={handleSearch}></i>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </Form>

            {/* Right: Icons */}
            <div className="icon-group d-flex align-items-center mt-3 mt-lg-0">
              {STATUS.isLogged ? (
                <Button variant="outline-dark" className="icon-btn me-2" onClick={logoutHandle} alt="sign out">
                  <i className="fa fa-sign-out-alt"></i>
                </Button>
              ) : (
                <Button variant="outline-dark" className="icon-btn me-2" onClick={() => navigate('/login')} alt="sign in">
                  <i className="fa fa-sign-in-alt"></i>
                </Button>
              )}

              <Button onClick={() => navigate('/profile')} variant="outline-secondary" className="icon-btn me-2" alt="profile">
                <i className="fa fa-user"></i>
              </Button>

              <Button onClick={openCart} variant="outline-primary" className="icon-btn position-relative">
                <i className="fa fa-shopping-cart"></i>
                {cartQuantity > 0 && <span className="cart-badge">{cartQuantity}</span>}
              </Button>
            </div>
          </Offcanvas.Body>
        </NavbarBs.Offcanvas>
      </Container>
    </NavbarBs>
  );
};

export default Navbar;
