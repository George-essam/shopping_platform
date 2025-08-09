import { Button, Container } from "react-bootstrap";
import CartItem from "./CartItem";
import { useShoppingCart } from "../context/ShoppingCartContext";
import formatCurrency from "./formatCurrency";
import storeItems from "../data/storeItems.json";
import React, { Navigate,useEffect, useState } from "react";
import { STATUS } from "./status.js";
import {useLocation, Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';

const Checkout = () => {
  const { cartItems, closeCart } = useShoppingCart();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const location = useLocation();
  const [checkoutInput, setCheckoutInput] = useState({
    firstName: "",
    lastName:"",
    phone:'',
    email:'',
    address:'',
    city:'',
    state:'',
    cardNumber:'',
    cardName:'',
    ExpirationDate:'',
  });

  const handleInput=(e)=>{
    // e.persist();
    setCheckoutInput({...checkoutInput, [e.target.name]: e.target.value});
  }

  const submitOrder=(e) =>{
    e.preventDefault();
    setError(validate(checkoutInput));
    setIsSubmit(true);
  }
  useEffect(()=>{
    console.log(error);
    if(Object.keys(error).length === 0 && isSubmit){
      console.log(checkoutInput)
    }
  },[checkoutInput])

  const validate =(values)=>{
    const errors ={};
    const regex = /^[^\@]+@[^\@]+\.[^\s@]{2,}$/i;
    if(!values.firstName){
      errors.firstName= "First Name is required!" 
    }
    if(!values.lastName){
      errors.lastName= "Last Name is required!" 
    }
    if(!values.email){
      errors.email= "Email is required!" 
    }
    //else if(regex.test(values.email)){
    //   errors.email= "This is not a valid email Format!" 
    // }
    if(!values.address){
      errors.address= "Full Address is required!" 
    }
    if(!values.city){
      errors.city= "City is required!" 
    }
    if(!values.state){
      errors.state= "State is required!" 
    }
    if(!values.phone){
      errors.phone= "Phone number is required!" 
    }
    if(!values.cardName){
      errors.cardName= "Card Holder name is required!" 
    }
    if(!values.cardNumber){
      errors.cardNumber= "Card Number is required!" 
    }else if(values.cardNumber.length<3){
      errors.cardNumber= "Card Number must be more than 3 characters" 
    }
    if(!values.ExpirationDate){
      errors.ExpirationDate= "Expiration date is required!" 
    }
    return errors;
  }

  useEffect(() => {
    const getItems = async () => {
      const response = await fetch("http://fakestoreapi.com/products");
      const data = await response.json();
      setItems(data);
    };
    getItems();
  }, []);

  const handleClick=()=>{
    navigate("/login",{state:{previousUrl:'/Checkout'} });
  };
  if (STATUS.isLogged == false) {
    return (
      <div>
        You must be logged in to view this page.
        <Button variant="link" onClick={handleClick}>
          {" "}
          Login Here
        </Button>
      </div>
    );
  }
  return (
    <div>
      <div className="py-2">
        <div className="container">
          <h6>Checkout</h6>
        </div>
      </div>
      {Object.keys(error).length === 0 && isSubmit? (<div className="ui message success">Order placed Successfully</div>): null} 
      

      <div className="py-2">
        <div className="container">
          <div className="row">
            <div className="col-md-7 auth-form-container">
              <div className="form">
                <div className="container bg-pistachio">
                  <h4>Basic Information</h4>
                </div>
                <div className="card-Body mx-3">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>First Name</label>
                        <input type="text" name="firstName" onChange={handleInput} value={checkoutInput.firstName} className="form-control" placeholder="First name" />
                        <p className="text-danger">{error.firstName}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>Last Name</label>
                        <input type="text" name="lastName" onChange={handleInput} value={checkoutInput.lastName} className="form-control" placeholder="Last name" />
                        <p className="text-danger">{error.lastName}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>Phone number</label>
                        <input type="text" name="phone" onChange={handleInput} value={checkoutInput.phone} className="form-control" placeholder="Phone Number" />
                        <p className="text-danger">{error.phone}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>Email</label>
                        <input type="text" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control" placeholder="Email" />
                        <p className="text-danger">{error.email}</p>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group mb-3">
                        <label>Full Address</label>
                        <textarea rows="3" name="address" onChange={handleInput} value={checkoutInput.address} className="form-control" placeholder="Address" />
                        <p className="text-danger">{error.address}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group mb-3">
                        <label>City</label>
                        <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className="form-control" placeholder="City" />
                        <p className="text-danger">{error.city}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group mb-3">
                        <label>state</label>
                        <input type="text" name="state" onChange={handleInput} value={checkoutInput.state} className="form-control" placeholder="State" />
                        <p className="text-danger">{error.state}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group mb-3">
                        <label>Zip Code</label>
                        <input type="text" name="zipcode" className="form-control" placeholder="Zip Code" />
                      </div>
                    </div>
                    <div className="container bg-pistachio">
                      <h4>Payment Information</h4>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group mb-3">
                        <label>Card Number</label>
                        <input type="text" name="cardNumber" onChange={handleInput} value={checkoutInput.cardNumber} className="form-control" placeholder="Card Number"/>
                        <p className="text-danger">{error.cardNumber}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group mb-3">
                        <label>Name</label>
                        <input
                          type="text"
                          name="cardName"
                          onChange={handleInput} value={checkoutInput.cardName}
                          className="form-control"
                          placeholder="Card Holder Name"
                        />
                        <p className="text-danger">{error.cardName}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group mb-3">
                        <label>Expiration Date</label>
                        <input
                          type="text"
                          name="ExpirationDate"
                          onChange={handleInput} value={checkoutInput.ExpirationDate}
                          className="form-control"
                          placeholder="Expiration Date"
                        />
                        <p className="text-danger">{error.ExpirationDate}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group ">
                        <label>Coupon</label>
                        <input
                          type="text"
                          name="Coupon"
                          className="form-control"
                          placeholder="Coupon"
                        />
                      </div>
                    </div>
                    <div className="col-md-3 py-4">
                      <div className="form-group">
                        <button type="button" className="btn btn-primary ">
                          Verify Coupon
                        </button>
                        
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group text-end">
                        <button type="button" className="btn btn-primary" style={{ margin: 20 }} onClick={submitOrder}>
                          Place Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th width="50%">Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, id) => {
                    const product = items.find((i) => i.id === item.id);
                    return (
                      <CartItem key={item.id} {...item} product={product} />
                    );
                  })}
                  <div className="ms-auto fw-bold fs-5">
                    Total{" "}
                    {formatCurrency(
                      cartItems.reduce((total, cartItem) => {
                        const item = items.find((i) => i.id === cartItem.id);
                        return total + (item?.price || 0) * cartItem.quantity;
                      }, 0)
                    )}
                  </div>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
