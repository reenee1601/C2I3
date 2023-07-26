import React from 'react'
import { SecondNavBar } from '../../components/secondNavBar/SecondNavBar';
import './compareDocumentPage.css';
const CompareDocumentPage = () => {
  return (
    <div className="container">
        <div className="second-navbar">
            <SecondNavBar /> 
        </div>

        <div className="split-container">
          <div className="split left">
              <p>left side</p>
          </div>

          <div className="split right">
              <p>right side</p>
          </div>
        </div>
        

    </div>
  )
}

export default CompareDocumentPage