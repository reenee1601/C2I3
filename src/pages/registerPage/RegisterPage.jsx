import React, { useState, useEffect } from 'react';
import './registerPage.css';
import { FirstNavBar } from '../../components/firstNavBar/FirstNavBar';

import {
  header,
  suredes,
  input,
  inputdiv,
  button,
  descriptionStyle,
  inputValidationContainer,
  labelStyle,
  split,
  left,
  right,
  centered,
  successfulRegisterStyle
  
} from './RegisterPageStyle';

const RegisterPage = () => {

  //SUCCESS MESSAGE
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000); // Adjust the time (in milliseconds) as per your requirement
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

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

    setShowSuccessMessage(true);
    resetForm();
  };

  //RESTTING

  const resetForm = () => {
    // Reset all the form fields to empty strings
    setFullName('');
    setCompanyName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');

    // Reset the error object to all false
    setError({
      fullName: false,
      companyName: false,
      email: false,
      password: false,
      confirmPassword: false,
    });
  };

  return (
    <div>
      <div style={{ ...split, ...left }}>
        <div style={centered}>
          <div style={descriptionStyle}>
            <h1 style={header}>WELCOME TO SuRe !</h1>
            <p style={suredes}>SuRe is a platform for Retailers to manage its invoices and SOA.</p>
          </div>
        </div>
      </div>
  
        <div style={{ ...split, ...right }}>
          <div style={centered}>

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
                    value={fullName}
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
                    value={companyName}
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
                    value={email}
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
                    value={password}
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
                    value={confirmPassword}
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
                >
                  Create Account
                </button>
  
                {showSuccessMessage && (
                  <div style={successfulRegisterStyle}>
                    <p>Account registered!</p>
                  </div>
                )}
  
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default RegisterPage;