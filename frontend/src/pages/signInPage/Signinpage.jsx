// import "./signinPage.css";
import React, { useState } from 'react';
import { FirstNavBar } from "../../components/firstNavBar/FirstNavBar";
import { header, suredes, right, inputdiv, checkboxWrapper, checkboxInput, checkboxLabel, 
          beforeButton, forgetPass, button, split, centered, left, input,
          inputValidationContainer, labelStyle, descriptionStyle, invalidSignin } from "./SigninPageStyle"; 
import { useNavigate } from 'react-router-dom';
import mockData from '../../data/mock_data.json'

const Signin = () => {
// HOVER BUTTON FUNCTIONALITY
const [buttonHover, setButtonHover] = useState(false);

const handleMouseEnter = () => {
  setButtonHover(true);
};

const handleMouseLeave = () => {
  setButtonHover(false);
};

// INPUT VALIDATION
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const navigate = useNavigate();
const [invalidLogin, setInvalidLogin] = useState(false);
const [error, setError] = useState({
  email: false,
  password: false,
});

const handleSubmit = (e) => {
  e.preventDefault();

  const newErrors = {
    email: email.trim() === '',
    password: password.trim() === '',
};

  setError(newErrors);

  if (Object.values(newErrors).some((error) => error)) {
    return;
  }

  // Check if the entered email and password match any of the mock data
  const foundUser = mockData.validEmails.find((user) => user.email === email && user.password === password);

  if (foundUser) {
    // Navigate to the homepage if the user is found in the mock data
    navigate("/homepage");
  } else {
    // Show an error message or perform any other action for invalid login
    console.log("Invalid email or password");
    setInvalidLogin(true);
  }

};

return (
  <div>
    <div style={{...split, ...left}}>
      <div style={centered}>
        <div style={descriptionStyle}>
          <h1 style={header}>WELCOME TO SuRe !</h1>
          <p style={suredes}>SuRe is a platform for Retailers to manage its invoices and SOA.</p>
        </div>
      </div>
    </div>

    <div style={{...split, ...right}}>
      <div style={centered}>
        <FirstNavBar />

        <div style={inputdiv}>
          <form onSubmit={handleSubmit}>
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

            <div style={beforeButton}>
              <div style={checkboxWrapper}>
                <input type="checkbox" id="remember_me" style={checkboxInput}/>
                <label htmlFor="remember_me" style={checkboxLabel}>Remember Me?</label>
              </div>
              <p>
                <a href="#signin" style={forgetPass}>
                  Forgot Password?
                </a>
              </p>
            </div>

            <div>
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
                Sign In
              </button>
              {invalidLogin && <p style={invalidSignin}>Invalid email or password. Please try again.</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);
};

export default Signin;