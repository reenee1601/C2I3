import React from 'react'
import "./submitPopUp.css"

function SubmitPopUp(props) {
  // Props element. --? Prop triggered? Do what...
  // Contains all the elements in the SubmitPopUp

    const closebtn = {
        color: "#F3F3F3",
        fontFamily: "KoHo",
        fontSize: "15px",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "normal",
    
        border: "none",
        backgroundColor: "transparent",

    }
  return (props.trigger) ? (
    <div className = "popup">
        <div className="popup-inner">
            <button style={closebtn} className = "close-btn" onClick={() => props.setTrigger(false)}>Close</button>
            <h1>Submit Successfully</h1>
            { props.children }
        </div>
    </div>
  ) : ""
}

export default SubmitPopUp