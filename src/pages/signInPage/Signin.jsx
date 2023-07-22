import React from 'react';

import './signinPage.css'; 
import { FirstNavBar } from '../../components/firstNavBar/FirstNavBar';

const Signin = () => {

    const signinbutton = {
        width: "370px",
        height: "60px",
        flexShrink: "0",  

        borderRadius: "12px",
        border: "none",
        background: "var(--color-blue)",
        boxShadow: "-2px 4px 30px 0px rgba(0, 0, 0, 0.25)",
        boxSizing: "border-box",

        marginTop: "18px",

        color: "white",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "normal",
        cursor: "pointer",

        transitionDuration: "0.4s",
    }
    return (
        <div>
            <div className="split left">
                <div className="centered">
                    <h1 className="welcome-text">Welcome to -SuRe!</h1>
                    <p className="suredes">-SuRe is a platform for Retailers to manage its invoices and SOA.</p>
                </div>
            </div>
            <div className="split right">
                <div className="centered">
                    <FirstNavBar />
                    <div className="signin-input">
                        <input type="email" placeholder="Enter your Email Address" id="email"/>
                        <input type="password" placeholder="Enter Your Password" id="password"/>
                    </div>
                    <div className="before-button"> 
                        <div className="checkbox-wrapper">
                            <input type="checkbox" id="remember_me" />
                            <label for="remember_me">Remember Me?</label>
                        </div>
                        <p><a href="#signin" className="forget-pass">Forgot Password?</a></p>
                    </div>
                    <button style = {signinbutton} type="button">Sign In</button>
                </div>
            </div>
        </div>
    
    )
}

export default Signin