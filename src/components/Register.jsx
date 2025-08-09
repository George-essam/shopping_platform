import React, {unsState, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import { Container } from "react-bootstrap";
import Records from '../data/records.json';

export const Register = (props)=>{
    const [email,setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [Name, setName] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [Address, setAddress] = useState('');
    const [City, setCity] = useState('');
    const [CardNumber, setCardNumber] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents form submission
        if (pass !== confirmPass) {
          alert("Passwords Do not match");
          navigate('/home');
        } else {
          const formData = {
            name: Name,
            email: email,
            password: pass,
            phoneNumber: PhoneNumber,
            address: Address,
            city: City,
            cardNumber: CardNumber
          };
          console.log(Records); // Logs the JSON object with form data
          alert("Registration is successful");
          navigate("/login");
        }
      };


    return( 
        <div className="auth-form-container">
        <form className="register-form" onSubmit={handleSubmit}>

            <label htmlFor="Name">Name</label>
            <input value={Name} onChange={(e)=> setName(e.target.value)} type="Name" placeholder="Enter your Name" id="Name" name = "Name"/>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="Enter your E-mail" id="email" name = "email"/>
            <div className="pass">
            <div className="password">
            <label htmlFor="password">Password</label>
            <input value={pass} onChange={(e)=> setPass(e.target.value)} type="password" placeholder="********" id="password" name = "password"/>
            </div>
            <div className="confirmPass">
            <label htmlFor="confirmPass">Confirm Password</label>
            <input value={confirmPass} onChange={(e)=> setConfirmPass(e.target.value)} type="password" placeholder="********" id="confirmPass" name = "confirmPass"/>
            </div>
            </div>
            <label htmlFor="PhoneNumber">Phone Number</label>
            <input value={PhoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} type="PhoneNumber" placeholder="Phone Number" id="PhoneNumber" name = "PhoneNumber"/>
            <label htmlFor="Address">Address</label>
            <input value={Address} onChange={(e)=> setAddress(e.target.value)} type="Address" placeholder="Address" id="Address" name = "Address"/>
            <div className="city">
            <label htmlFor="City">City</label>
            <input value={City} onChange={(e)=> setCity(e.target.value)} type="City" placeholder="City" id="City" name = "City"/>
            </div>
            
            <label htmlFor="CardNumber">Card Number</label>
            <input value={CardNumber} onChange={(e)=> setCardNumber(e.target.value)} type="CardNumber" placeholder="CardNumber" id="CardNumber" name = "CardNumber"/>
            <button className="button" onClick={()=>handleSubmit}>Register</button>
        </form>
        <label htmlFor = "Login">Already have an account?</label>
        <button className="link-btn" type= "Login" onClick={()=>navigate('/login')}>Login here.</button>
        </div>
    )
}