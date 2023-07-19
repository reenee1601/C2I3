import React from 'react';
import './secondNavBar.css';

export const SecondNavBar = () => {
  return (
    <div>
        <div className = "navbar">
            <p style={{paddingLeft: "9%"}}><a href = "#home">Home</a></p>
            <p><a className="upload-navbar" href = "#upload">Upload</a></p>
            <p><a className= "invoices-navbar" href = "#invoices">Invoices</a></p>
            <p><a className="soa-navbar" href = "#soa">Statement of Account</a></p>
            <p><a className="product-navbar" href = "#product">Product</a></p>

            <div style={{paddingRight: "9%"}} className = "logout">
              <a href="#signin">
              <img src = {require("../../asserts/LogOut.png")} alt = "LogOut" />
              </a>
              <p><a href = "#signin">Log Out</a></p>
            </div>
        </div>
    </div>
  )
}