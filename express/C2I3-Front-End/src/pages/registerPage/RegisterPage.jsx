import React from 'react';
import './registerPage.css';
import { FirstNavBar } from '../../components/firstNavBar/FirstNavBar';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const RegisterPage = () => {

  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:3000/users/register', formData)
      .then((response) => {
        console.log('User registered:', response.data);
        navigate('/homepage');
      })
      .catch((error) => {
        console.error('Error registering user:', error);
        // Handle the error, e.g., show an error message to the user
      });
  };

  useEffect(() => {
    
    if (formData.fullName && formData.company && formData.email && formData.password && formData.confirmPassword) {
      
      setTimeout(() => {
        console.log('User registered:', formData);
        
      }, 1500);
    }
  }, [formData, navigate]);


  const header = {
    color: '#418EFF',
    fontSize: '60px',
    fontStyle: 'italic',
    fontWeight: 700,
    lineHeight: 'normal',
    margin: '0 0 20px',
  };

  const suredes = {
    color: "var(--color-grey)",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  };

  const input = {
    backgroundColor: 'rgba(65, 142, 255, 0.1)',
    fontSize: '13px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    width: '370px',
    height: '60px',
    flexShrink: 0,
    borderRadius: '12px',
    border: 'none',
    marginTop: '10px',
    marginBottom: '10px',
    paddingLeft: '34px',
  };

  const inputdiv = {
    display: "flex",
    flexDirection: "column"
  }

  const button = {
    width: '370px',
    height: '60px',
    flexShrink: 0,
    borderRadius: '12px',
    border: 'none',
    background: 'var(--color-blue)',
    boxShadow: '-2px 4px 30px 0px rgba(0, 0, 0, 0.25)',
    marginTop: '18px',
    color: 'white',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
  };

  return (
    
    <div>
      <div className = "split left">
        <div className = "centered">
          <h1 style={header}>Welcome to -SuRe!</h1>
          <p style={suredes}>-SuRe is a platform for Retailers to manage its invoices and SOA.</p>
        </div>
      </div>
    
      <div className = "split right">
        <div className = "centered">

          <FirstNavBar />

          <div style = {inputdiv}>
          <form onSubmit={handleSubmit}>
              <input
                style={input}
                type="text"
                name="fullName"
                placeholder="Enter Your Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
              <input
                style={input}
                type="text"
                name="company"
                placeholder="Enter Your Company"
                value={formData.company}
                onChange={handleChange}
              />
              <input
                style={input}
                type="email"
                name="email"
                placeholder="Enter Your Email Address"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                style={input}
                type="password"
                name="password"
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={handleChange}
              />
              <input
                style={input}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Your Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            <button style={button} type="submit">Create Account</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default RegisterPage