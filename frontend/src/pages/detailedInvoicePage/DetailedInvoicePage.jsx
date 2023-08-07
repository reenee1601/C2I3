import React from 'react';
import { SecondNavBar } from '../../components/secondNavBar/SecondNavBar';
import './detailedInvoicePage.css';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import mockData from "../../data/mock_data.json";
import { IoChevronBack } from 'react-icons/io5';
import { topPart, invoiceTitle, supplierName, issuedDate, dueDate,
  tableContainer, scrollable, customTable, td, th, bottomPart,
  rightBottom, totalAmount, goBackButtonStyle, goBackStyle} from './DetailedInvoicePageStyle';

const DetailedInvoicePage = () => {

  return (
    <div>
      <div>
          <SecondNavBar />
      </div>

      <div style={topPart}>
      <div style={goBackStyle}>
          <Link to="/soapage">
            <IoChevronBack size={50} color={"#3A3A3A"}/>
            <button style={goBackButtonStyle}>GO BACK</button>
          </Link>
        </div>

        <div className="invoice-detail">
            <h1 style={invoiceTitle}>Invoice #1111</h1>
            <p style={supplierName}>Bakers Room</p>
            <p style={issuedDate}>Issued Date: 13/06/23</p>
            <p style={dueDate}>Due Date: 13/07/23</p>
        </div>
      </div>
      
      {/* table */}
      <div style={tableContainer}>
        <div style={scrollable}>
          <Table style={customTable}>
            <thead className="sticky-top">
              <tr>
                <th style={th}>Product</th>
                <th style={th}>Quantity</th>
                <th style={th}>Amount</th>
                <th style={th}>Comment</th>
              </tr>
            </thead>
            <tbody>
            {
              mockData.invoiceProductDetails.map((item, id) => 
              <tr key={id}>
                <td style={td}>{item.product}</td>
                <td style={td}>{item.quantity}</td>
                <td style={td}>{item.amount}</td>
                <td style={td}>{item.comment}</td>
              </tr>      
              )  
            }
            </tbody>
          </Table>
        </div>
      </div>

      <div style={bottomPart}>
        <div style={rightBottom}>
          {/* sum of all amounts */}
          <p style={totalAmount}>Total Amount: $4000.50</p>
        </div>
      </div>

    </div>
  )
}

export default DetailedInvoicePage