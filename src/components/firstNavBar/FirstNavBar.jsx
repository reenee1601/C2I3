import React from 'react';
import './firstNavBar.css';

export const FirstNavBar = () => {
  return (
    <div>
        <div className = "signin_register_navbar">
            <p><a href = "/signinpage">Sign In</a></p>
            <p><a href = "/registerpage">Register</a></p>
        </div>
    </div>
  )
}
