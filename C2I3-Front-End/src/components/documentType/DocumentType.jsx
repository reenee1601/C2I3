import React, { useState } from 'react'

import "./documentType.css"

const DocumentType = () => {

    const documentbutton = {
        color: "#535353",
        fontFamily: "KoHo",
        fontSize: "15px",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "26px",

        width: "13%",
        height: "45px",

        borderRadius: "12px",
        background: "#F2F4F8",
        boxShadow: "none",

        border: "none",
}

// Creating states for each individual Button
const [buttonsState, setButtonsState] = useState([
  { label: 'Invoice', active: false, hovered: false },
  { label: 'Statement Of Account', active: false, hovered: false },
  { label: 'Product', active: false, hovered: false },
  { label: 'Payment', active: false, hovered: false },
]);

// Function to handle onMouseOver
function handleMouseOver(index) {
  setButtonsState((prevButtonsState) =>
    prevButtonsState.map((button, i) =>
      i === index ? { ...button, hovered: true } : button
    )
  );
}

// Function to handle onMouseLeave
function handleMouseLeave(index) {
  setButtonsState((prevButtonsState) =>
    prevButtonsState.map((button, i) =>
      i === index ? { ...button, hovered: false } : button
    )
  );
}

// Function to handle onClick
function handleButtonClick(index) {
  setButtonsState((prevButtonsState) =>
    prevButtonsState.map((button, i) =>
      i === index ? { ...button, active: !button.active } : { ...button, active: false }
    )
  );
  console.log('Button Clicked');
}

return (
  <div>
    <div className="document">
      <h1>Document Type</h1>

      {buttonsState.map((button, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(index)}
          onMouseOver={() => handleMouseOver(index)}
          onMouseLeave={() => handleMouseLeave(index)}
          style={{
            ...documentbutton,
            backgroundColor: button.active
              ? 'rgba(65, 142, 255, 0.50)' // Active background color
              : button.hovered
              ? 'rgba(65, 142, 255, 0.50)' // Hovered background color
              : '#F3F3F3', // Default background color
          }}
        >
          {button.label}
        </button>
      ))}
    </div>
  </div>
);
};

export default DocumentType;