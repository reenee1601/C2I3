import React, { useState } from 'react';
import './registerPage.css';
import { FirstNavBar } from '../../components/firstNavBar/FirstNavBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  header,
  suredes,
  input,
  inputdiv,
  button,
  descriptionStyle,
  inputValidationContainer,
  labelStyle,
} from './RegisterPageStyle';

const RegisterPage = () => {
  // HOVER BUTTON FUNCTIONALITY

  const [buttonHover, setButtonHover] = useState(false);

  const handleMouseEnter = () => {
    setButtonHover(true);
  };

  const handleMouseLeave = () => {
    setButtonHover(false);
  };

  // INPUT VALIDATION
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const [error, setError] = useState({
    fullName: false,
    companyName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      fullName: fullName.trim() === '',
      companyName: companyName.trim() === '',
      email: email.trim() === '',
      password: password.trim() === '',
      confirmPassword: confirmPassword.trim() === '',
    };

    if (confirmPassword.trim() !== '' && confirmPassword !== password) {
      newErrors.confirmPassword = true;
    }

    setError(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    // Send the registration data to the server
    const userData = {
      name: fullName,
      company: companyName,
      email,
      password,
    };

    axios
      .post('http://localhost:8000/users/register', userData)
      .then((response) => {
        console.log('User registered:', response.data);
        navigate('/homepage');
      })
      .catch((error) => {
        console.error('Error registering user:', error);
        // Handle the error, e.g., show an error message to the user
      });
  };


  return (
    <div>
      <div className="split left">
        <div className="centered">
          <div style={descriptionStyle}>
            <h1 style={header}>WELCOME TO SuRe !</h1>
            <p style={suredes}>SuRe is a platform for Retailers to manage its invoices and SOA.</p>
          </div>
        </div>
      </div>

      <div className="split right">
        <div className="centered">
          <FirstNavBar />

          <div style={inputdiv}>
            <form onSubmit={handleSubmit}>
              <div style={inputValidationContainer}>
                <input
                  style={input}
                  type="text"
                  name="fullName"
                  placeholder="Enter Your Full Name"
                  onChange={(e) => setFullName(e.target.value)}
                />
                {error.fullName ? <label style={labelStyle}>This is a required field.</label> : null}
              </div>

              <div style={inputValidationContainer}>
                <input
                  style={input}
                  type="text"
                  name="company"
                  placeholder="Enter Your Company"
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                {error.companyName ? <label style={labelStyle}>This is a required field.</label> : null}
              </div>

              <div style={inputValidationContainer}>
                <input
                  style={input}
                  type="email"
                  name="email"
                  placeholder="Enter Your Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error.email ? <label style={labelStyle}>This is a required field.</label> : null}
              </div>

              <div style={inputValidationContainer}>
                <input
                  style={input}
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error.password ? <label style={labelStyle}>This is a required field.</label> : null}
              </div>

              <div style={inputValidationContainer}>
                <input
                  style={input}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Your Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                 {error.confirmPassword
                  ? confirmPassword.trim() !== ''
                    ? <label style={labelStyle}>Passwords mismatch.</label>
                    : <label style={labelStyle}>This is a required field.</label>
                  : null}
              </div>

              <button
                style={{
                  ...button,
                  backgroundColor: buttonHover ? '#A1A1A1' : '#FFF',
                  color: buttonHover ? '#FFF' : 'rgba(71, 71, 71, 0.80)',
                }}
                type="submit"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleSubmit}
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default RegisterPage;