import React, {Fragment,unsState, useState, useContext} from "react";
import {Link, useNavigate} from 'react-router-dom';
import Home from "./Home";
import { STATUS } from './status.js';

export const Login = (props)=>{
    const navigate = useNavigate()
    const [email,setEmail] = useState('');
    const [pass, setPass] = useState('');
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(email);
        if(location.state?.previousUrl){
            navigate(location.state.previousUrl);
        }else{
            navigate("/");
        }
        STATUS.isLogged = true;
    }
    // useEffect(() => {

    //     if (isAuthenticated) {
    //         history.push(redirect)
    //     }

    //     if (error) {
    //         alert.error(error);
    //         dispatch(clearErrors());
    //     }

    // }, [dispatch, alert, isAuthenticated, error, history])

    return(
       <div className="auth-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input className="input" value={email} onChange={(e)=> setEmail(e.target.value)} type="Email" placeholder="Enter your E-mail" id="email" name = "email"/>
            <label htmlFor="password">Password</label>
            <input value={pass} onChange={(e)=> setPass(e.target.value)} type="Password" placeholder="********" id="password" name = "password"/>
            <button className="button">Log in</button>
        </form>
        <label htmlFor = "Register">Don't have an account?</label>
        <button className="link-btn" type= "Register" onClick={()=>navigate('/register')}>Register here.</button>
        </div>
    )
}

        // axios.post('http://localhost:3333/SuperMarket/login',
        // {
        //     email:email,
        //     password: pass
        // }
        // )
        // .then(result =>{
        //     console.log(result.data)
        //     alert('success')
        //     localStorage.setItem('token',result.data.token)
        //     navigate('/home')
        // })
        // .catch(error=>{
        //     alert('error')
        // })