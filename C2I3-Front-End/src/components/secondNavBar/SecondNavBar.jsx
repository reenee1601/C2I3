import React, { useState } from 'react';

import './secondNavBar.css';
import { IoLogOutOutline } from "react-icons/io5";

export const SecondNavBar = () => {
  const [linkState, setLinkState] = useState([
    { label: 'Home', active: false, hovered: false },
    { label: 'Upload', active: false, hovered: false },
    { label: 'Invoice', active: false, hovered: false },
    { label: 'Statement Of Account', active: false, hovered: false },
    { label: 'Product', active: false, hovered: false },
  ]);

  // Function to handle onMouseOver
  function handleMouseOver(index) {
    setLinkState((prevLinkState) =>
      prevLinkState.map((link, i) =>
        i === index ? { ...link, hovered: true } : { ...link, hovered: false }
      )
    );
  }

  // Function to handle onMouseLeave
  function handleMouseLeave(index) {
    setLinkState((prevLinkState) =>
      prevLinkState.map((link, i) =>
        i === index ? { ...link, hovered: false } : link
      )
    );
  }

  // Function to handle onClick
  function handleLinkClick(index) {
    setLinkState((prevLinkState) =>
      prevLinkState.map((link, i) =>
        i === index ? { ...link, active: !link.active } : { ...link, active: false }
      )
    );
    console.log('Button Clicked');
  }

  const linkstyles = {
    color: "#535353",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: "700",
    fontFamily: "Inter",
    textDecoration: "none",
    
    backgroundColor: "transparent",
    borderBottom: "2px solid transparent",
  }

  const navbar = {
    display:"inline-flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    margin: "4% 2% 2% 4%",
  }

  const logout = {
    display: "inline-flex",
    flexDirection: "row",
    display: "flex",

    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    paddingRight: "9%",
    }

  const logouticon = {
    width: "40px",
    height: "40px",
    color: "#535353",

    marginRight:"10px"
  }

  return (
    <div>
      <div style={navbar}>
        {linkState.map((link, index) => (
          <p key={index}>
            <a
              onClick={() => handleLinkClick(index)}
              onMouseOver={() => handleMouseOver(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{
                ...linkstyles,
                color: link.active
                  ? '#418EFF' // Active background color
                  : link.hovered
                  ? '#418EFF' // Hovered background color
                  : '#535353', // Default background color

                  // link.active not working.
                borderBottom: link.active 
                  ? "2px solid #418EFF" 
                  : "2px solid transparent",

                borderBottom: link.hovered 
                ? "2px solid #418EFF" 
                : "2px solid transparent",
              }}
            >
              {link.label}
            </a>
          </p>
        ))}

        <div style = {logout}>
          <a href="#signin">
          <IoLogOutOutline style = {logouticon}/>
          </a>
          <p>
            <a style = {linkstyles} href = "#signin">
              Log Out
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}

export default SecondNavBar;