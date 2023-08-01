import React, { useEffect, useState } from 'react';
import { SecondNavBar } from '../../components/secondNavBar/SecondNavBar';
import './detailedSoaPage.css';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
var cors = require('cors');

const DetailedSoaPage = () => {

  const [isExportClicked, setIsExportClicked] = useState(false);

  const { id } = useParams();

  const [specificSoaData, setSpecificSoaData] = useState({});
  const [soaTitle, setSoaTitle] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  useEffect(() => {
    fetchSOADataById(id);
    
  }, [id]);

  const fetchSOADataById = async (id) => {
    try {
      // Make an API call to fetch specific data for the given _id
      
      const response = await fetch(`http://localhost:3000/getSOAData/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      // Update the state with the fetched data
      setSpecificSoaData(data);
      // Update the SOA title and total amount with the specific data
      setSoaTitle(`SOA #${data._id}`);
      setTotalAmount(`Total Amount: ${data.totalAmount}`);
    } catch (error) {
      console.error('Error fetching specific SOA data:', error);
    }
  };

  const handleExportClick = () => {
    setIsExportClicked((prevState) => !prevState);
  }

  // const product_details = [
  //   { invoice: "200", issueddate: "17/07/2023", duedate: "17/08/2023", amount: "$4000.50"},
  //   { invoice: "200", issueddate: "17/07/2023", duedate: "17/08/2023", amount: "$4000.50"},
  //   { invoice: "200", issueddate: "17/07/2023", duedate: "17/08/2023", amount: "$4000.50"},
  //   { invoice: "200", issueddate: "17/07/2023", duedate: "17/08/2023", amount: "$4000.50"},
  //   { invoice: "200", issueddate: "17/07/2023", duedate: "17/08/2023", amount: "$4000.50"},
  // ]

  const handleExportToCSV = () => {
    // Make a GET request to the backend endpoint for exporting data to CSV
    axios.get('http://localhost:3000/exportToCSV')
        // Make a GET request to the backend endpoint for exporting data to Excel
        .then((response) => {
          console.log("data exported to excel fetched successfully");
          console.log(response.data.message);
          // Optionally, you can display a success message to the user
        })
        .catch((error) => {
          console.error('Error exporting data to Excel:', error);
          // Display an error message to the user if needed
        });
  };

  const handleExportToExcel = () => {
    // Make a GET request to the backend endpoint for exporting data to Excel
    axios.get('http://localhost:3000/exportToExcel')
      .then((response) => {
        console.log("data exported to excel fetched successfully");
        console.log(response.data.message);
        // Optionally, you can display a success message to the user
      })
      .catch((error) => {
        console.error('Error exporting data to Excel:', error);
        // Display an error message to the user if needed
      });
  };
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
            <h1 className="soa-title">{soaTitle}</h1>
            
        </div>
      </div>
      
      {/* table */}
      <div className="table-container">
        <div className="scrollable">
          <Table className="custom-table transparent-table">
            <thead className="sticky-top">
              <tr>
                {/*<th>Product</th>*/}
                <th>Invoice ID</th>
                <th>Issued Date</th>
                <th>Due Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            {specificSoaData?.invoiceID?.length > 0 ? (
              <tbody>
                {specificSoaData.invoiceID.map((invoice, index) => (
                  <tr key={index}>
                    <td>{invoice}</td>
                    <td>{specificSoaData.issuedDate?.[index]}</td>
                    <td>{specificSoaData.dueDate?.[index]}</td>
                    <td>{specificSoaData.amount?.[index]}</td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="4">No data available</td>
                </tr>
              </tbody>
            )}
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
              <button className="excel-button" onClick={handleExportToExcel}>
                <img src = {require("../../asserts/ExcelButton.png")} alt = "ExcelButton" />
              </button>

              <button className="csv-button" onClick={handleExportToCSV}>
                <img src = {require("../../asserts/CSVButton.png")} alt = "CSVButton" />
              </button>
            </div>
          )}
        </div>

        <div className="right-bottom">
          {/* sum of all amounts */}
          <p className="total-amount">{totalAmount}</p>
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

export default DetailedSoaPage;