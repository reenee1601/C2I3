import React, { useState, useEffect } from 'react'

import { RxCross2 } from "react-icons/rx"

import {
    addRowContainerStyle,
    addRowStyle,
    crossIconStyle,
    addRowInputStyle,
    addStyle,
    addLabelStyle,
    addInputStyle,
    addSubmitStyle,
    addSubmitContainerStyle,
    errorStyle
  } from './EditPopUpStyle';

  const EditPopUp = ({ closeEditPopUp, onSubmit, defaultProduct, defaultQuantity, defaultAmount, isAddMode }) => {
    const [formState, setFormState] = useState({
      product: isAddMode ? '' : defaultProduct || '',
      quantity: isAddMode ? '' : defaultQuantity || '',
      amount: isAddMode ? '' : defaultAmount || ''
    });
  
    useEffect(() => {
      if (isAddMode) {
        // If it's Add mode, reset the form fields
        setFormState({
          product: '',
          quantity: '',
          amount: '',
        });
      } else {
        // If it's Edit mode, set the form fields with default values
        setFormState({
          product: defaultProduct || '',
          quantity: defaultQuantity || '',
          amount: defaultAmount || '',
        });
      }
    }, [defaultProduct, defaultQuantity, defaultAmount, isAddMode]);

  const [errors, setErrors] = useState("")

  const validateForm = () => {
    if(formState.product && formState.amount && formState.quantity) {
      setErrors("")
      return true;
    }
    else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if(!value) {
          errorFields.push(key)
        }
      }
      setErrors(errorFields.join(", "))
      return false;
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    onSubmit(formState); // Pass the form data to the parent component
  
    // For Add mode, don't reset the formState, just close the popup
    if (isAddMode) {
      closeEditPopUp(); // Close the popup after submitting
    } else {
      // For Edit mode, set the formState to the default values for the current row
      setFormState({
        product: defaultProduct || "",
        quantity: defaultQuantity || "",
        amount: defaultAmount || "",
      });
    }
  };

  return (
    <div>
        <div style={addRowContainerStyle}>
          <div style={addRowStyle}>

            <button onClick = {closeEditPopUp} style={crossIconStyle}>
            <RxCross2 size={20}/>
            </button>

            <form>

              <div style={addRowInputStyle}>

                <div style={addStyle}>
                  <label style={addLabelStyle} htmlFor='product'>PRODUCT:  </label>
                  <input style= {addInputStyle} name="product" value={formState.product} onChange={handleChange}/>
                </div>

                <div style={addStyle}>
                  <label style={addLabelStyle} htmlFor='quantity'>QUANTITY:</label>
                  <input style= {addInputStyle} name="quantity" value={formState.quantity} onChange={handleChange}/>
                </div>

                <div style={addStyle}>
                  <label style={addLabelStyle} htmlFor="amount">AMOUNT:</label>
                  <input style= {addInputStyle} name="amount" value={formState.amount} onChange={handleChange}/>
                </div>

              </div>

              <div style={addSubmitContainerStyle}>
                {errors && <div style={errorStyle}>{`Please include: ${errors}`}</div>}
                <button onClick={handleSubmit} style={addSubmitStyle}>Submit</button>
              </div>

            </form>
          </div>
        </div>
    </div>
  )
}

export default EditPopUp