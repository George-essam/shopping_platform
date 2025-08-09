import React from "react";
import { Container } from "react-bootstrap";
import { Routes,Route } from "react-router-dom";
import Home from "./components/Home";
import Store from "./components/Store";
import About from "./components/About";
import Navbar from "./components/Navbar";
import ShoppingCartProvider from "./context/ShoppingCartContext";
import Product from "./components/Product";
import {Login} from './components/Login';
import {Register} from './components/Register';
import { useState } from 'react';
import Profile from "./components/Profile";
  


const App = ()=>{
  const [currentForm, setCurrentForm]= useState('login');
  const toggleForm = (formName)=>{
  setCurrentForm(formName);
  }
  return (
    <ShoppingCartProvider>
    <Navbar/>
    <Container className="mb-4">
      <Routes>
        <Route  exact path="/" element={<Home />} />
        <Route  exact path="/about" element={<About />} />
        <Route exact path="/store" element={<Store />} />
        <Route exact path="/store/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/Checkout" element={<Checkout />} />
      </Routes>
    </Container>
    </ShoppingCartProvider>
    
  );
};
export default App;
