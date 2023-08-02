import React, { useState } from 'react';

import { IoLogOut } from "react-icons/io5";

import { Link, useLocation } from 'react-router-dom';

import {
  linkstyles,
  navbar,
  logouticon,
  navbarContainer,
  logoutStyle
} from "./SecondNavBarStyle"

export const SecondNavBar = () => {

  const location = useLocation();

  const [linkState, setLinkState] = useState([
    { label: 'HOME', active: false, hovered: false, route: "homepage"},
    { label: 'UPLOAD', active: false, hovered: false, route: "uploadpage" },
    { label: 'INVOICE', active: false, hovered: false, route: "invoicepage"},
    { label: 'STATEMENT OF ACCOUNT', active: false, hovered: false, route: "soapage" },
    { label: 'PRODUCT', active: false, hovered: false, route:"productpage" },
  ]);

  return (
    <div style={navbarContainer}>
      <div style={navbar}>
        {linkState.map((link, index) => (
          <p key={index}>
            <Link
              to={`/${link.route.toLowerCase()}`}
              style={{
                ...linkstyles,
                backgroundColor: location.pathname.includes(link.route.toLowerCase())
                  ? link.route.toLowerCase() === "homepage"
                    ? "#EEFFE8"
                    : link.route.toLowerCase() === "uploadpage"
                    ? "#E8F4FF"
                    : link.route.toLowerCase() === "invoicepage"
                    ? "#FFE8E8"
                    : link.route.toLowerCase() === "soapage"
                    ? "#FFF6E8"
                    : link.route.toLowerCase() === "productpage"
                    ? "#F2E8FF"
                    : "#E8F4FF"
                  : "transparent", // Default background color
              }}
            >
              {link.label}
            </Link>
          </p>
        ))}
      </div>

      <div style={logoutStyle}>
        <a href="/signinpage">
          <IoLogOut style = {logouticon}/>
        </a>
      </div>

    </div>
  );
}

export default SecondNavBar;
