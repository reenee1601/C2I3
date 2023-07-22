import React, { useState } from 'react';
import { SecondNavBar } from '../../components/secondNavBar/SecondNavBar';
import './detailedSoaPage.css';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const DetailedSoaPage = () => {

  const [isExportClicked, setIsExportClicked] = useState(false);

  const handleExportClick = () => {
    setIsExportClicked((prevState) => !prevState);
  }

  const product_details = [
    { product: "Hot Dog Bun", quantity: "200", amount: "$4000.50"},
    { product: "Hot Dog Bun", quantity: "200", amount: "$4000.50"},
    { product: "Hot Dog Bun", quantity: "200", amount: "$4000.50"},
    { product: "Hot Dog Bun", quantity: "200", amount: "$4000.50"},
    { product: "Hot Dog Bun", quantity: "200", amount: "$4000.50"},
    { product: "Hot Dog Bun", quantity: "200", amount: "$4000.50"},
  ]

  
  return (
    <div>
      <div className='second-navbar'>
          <SecondNavBar />
      </div>

      <div className="top-part">
        <div className="go-back-container">
          <Link to="/soapage">
            <img className="go-back" src = {require("../../asserts/GoBack.png")} alt = "GoBack" />
          </Link>
        </div>
        <div className="soa-detail">
            <h1 className="soa-title">SOA #3379</h1>
            <p className="supplier-name">Bakers Room</p>
            <p className="issued-date">Issued Date: 13/06/23</p>
            <p className="due-date">Due Date: 13/07/23</p>
        </div>
      </div>
      
      {/* table */}
      <div className="table-container">
        <div className="scrollable">
          <Table className="custom-table transparent-table">
            <thead className="sticky-top">
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
            {
              product_details.map((item, id) => 
              <tr key={id}>
                <td>{item.product}</td>
                <td>{item.quantity}</td>
                <td>{item.amount}</td>
              </tr>      
              )  
            }
            </tbody>
          </Table>
        </div>
      </div>
        
      <div className="bottom-part">
        {/* if clicked another 2 button appears */}
        <div className="export">
          <button className="export-button">
            <img src = {require("../../asserts/ExportButton.png")} alt = "ExportButton" onClick={handleExportClick}/>
          </button>

          {isExportClicked && (
            <div className="popup-button">
              <button className="excel-button">
                <img src = {require("../../asserts/ExcelButton.png")} alt = "ExcelButton" />
              </button>

              <button className="csv-button">
                <img src = {require("../../asserts/CSVButton.png")} alt = "CSVButton" />
              </button>
            </div>
          )}
        </div>

        <div className="right-bottom">
          {/* sum of all amounts */}
          <p className="total-amount">Total Amount: $4000.50</p>
          {/* if clicked go to compare doc page */}
          <button className="payment-button">
            <Link to="/comparedocumentpage">
              <img src = {require("../../asserts/PaymentButton.png")} alt = "PaymentButton"/>
            </Link>
          </button>
        </div>
      </div>

    </div>
  )
}

export default DetailedSoaPage