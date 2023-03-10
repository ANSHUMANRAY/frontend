import React from 'react';
import './Register.css';
import loginImage from '../../assets/loginImage.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const handleLogin = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
      
    axios.post('http://localhost:8000/users', {name, email, password, role})
      .then((response) => {
        localStorage.setItem('token', 'Bearer '+response.data);
        navigate('/login');
      }
      );
  };
  return (
    <div className="registerContainer">
      <div className="registerContent">
        <div className="registerContentHeader">
          <h1>Design APIs fast,</h1>
          <h1>Manage Content Easily.</h1>
        </div>
        <img className='loginImage' src={loginImage} alt='loginImage' />
      </div>
      <div className="registerForm">
        <h1>Login to your CMS+ account</h1>
        <br/>
        <br/>
        <div className='registerFormContent'>
          <div className="registerFormInput">
            <label htmlFor="name">Name</label>
            <br/>
            <input type="text" name="name" id="name"className='input' />
          </div>
          <div className="registerFormInput">
            <label htmlFor="email">Email</label>
            <br/>
            <input type="email" name="email" id="email"className='input' />
          </div>
          <div className="registerFormInput">
            <label htmlFor="password">Password</label>
            <br/>
            <input type="password" name="password" id="password" className='input'/>
          </div>
          <div className="registerFormInput">
            <label htmlFor="role">Role</label>
            <br/>
            <input type="text" name="role" id="role"className='input' />
          </div>
          <div className="registerFormInput">
            <button onClick={handleLogin} type="submit">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}