import React from 'react';
import './Login.css';
import loginImage from '../../assets/loginImage.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const handleLogin = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
      
    axios.post('http://localhost:8000/login', {email, password})
      .then((response) => {
        if(response.data === null){
          alert('Invalid Credentials');
        }
        else{
          localStorage.setItem('token', 'Bearer '+response.data);
          navigate('/');
        }
      }
      );
  };
  return (
    <div className="loginContainer">
      <div className="loginContent">
        <div className="loginContentHeader">
          <h1>Design APIs fast,</h1>
          <h1>Manage Content Easily.</h1>
        </div>
        <img className='loginImage' src={loginImage} alt='loginImage' />
      </div>
      <div className="loginForm">
        <h1>Login to your CMS+ account</h1>
        <br/>
        <br/>
        <div className='loginFormContent'>
          <div className="loginFormInput">
            <label htmlFor="email">Email</label>
            <br/>
            <input type="email" name="email" id="email"className='input' />
          </div>
          <div className="loginFormInput">
            <label htmlFor="password">Password</label>
            <br/>
            <input type="password" name="password" id="password" className='input'/>
          </div>
          <div className="loginFormInput">
            <button onClick={handleLogin} type="submit">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}