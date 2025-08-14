import React from "react";
import Store from "./Store";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="overlay">
          <div className="hero-content">
            <h1 className="hero-title">New Season Arrivals</h1>
            <p className="hero-subtitle">Discover the latest trends & styles</p>
            <a href="#store" className="btn-shop">
              Shop Now
            </a>
          </div>
        </div>
      </section>

      {/* Featured Preview */}
      <section className="featured-section">
        <h2 className="section-title">Why Shop With Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="icon">🚚</span>
            <h3>Free Shipping</h3>
            <p>Enjoy free shipping on all orders above $50.</p>
          </div>
          <div className="feature-card">
            <span className="icon">💳</span>
            <h3>Secure Payments</h3>
            <p>We use trusted payment gateways to keep you safe.</p>
          </div>
          <div className="feature-card">
            <span className="icon">✨</span>
            <h3>Premium Quality</h3>
            <p>Our products are carefully selected for quality & style.</p>
          </div>
        </div>
      </section>

      {/* Store Section */}
      <section id="store" className="store-section">
        <h2 className="section-title">Our Collection</h2>
        <Store />
      </section>
    </div>
  );
};

export default Home;
