import React from 'react';
// import React, { useState } from 'react';
import './registerPage.css';
import { FirstNavBar } from '../../components/firstNavBar/FirstNavBar';

const RegisterPage = () => {
  // function getData(val) {
  //   console.warn(val.target.value)
  // }

  return (
    <div>/
      <div className = "split left">
        <div className = "centered">
          <h1>Welcome to -SuRe!</h1>
          <p className = "suredes">-SuRe is a platform for Retailers to manage its invoices and SOA.</p>
        </div>
      </div>
    
      <div className = "split right">
        <div className = "centered">

          <FirstNavBar />

          <div className = "input">
            <input type = "text" placeholder = "Enter Your Full Name"></input>
            <input type = "text" placeholder = "Enter Your Company"></input>
            <input type = "email" placeholder = "Enter Your Email Address"></input>
            <input type = "password" placeholder = "Enter Your Password"></input>
            <input type = "password" placeholder = "Confirm Your Password"></input>
            <button type = "button">Create Account</button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default RegisterPage