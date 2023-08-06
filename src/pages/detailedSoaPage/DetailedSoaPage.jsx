import React from 'react';
import { SecondNavBar } from '../../components/secondNavBar/SecondNavBar';
// import './detailedSoaPage.css';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import mockData from "../../data/mock_data.json";
import { IoChevronBack } from 'react-icons/io5';
import { LiaWalletSolid } from 'react-icons/lia';
import { topPart, soaTitle, supplierName, dueDate, tableContainer, scrollable, 
          customTable, td, th, bottomPart, paymentButton, paymentButtonImg,
          rightBottom, totalAmount, goBackStyle, goBackButtonStyle} from './DetailedSoaPageStyle';

const DetailedSoaPage = () => {

  return (
    <div>
      <div className='second-navbar'>
          <SecondNavBar />
      </div>

      <div style={topPart}>
        <div style={goBackStyle}>
          <Link to="/soapage">
            <IoChevronBack size={50} color={"#3A3A3A"}/>
            <button style={goBackButtonStyle}>GO BACK</button>
          </Link>
        </div>

        <div className="soa-detail">
            <h1 style={soaTitle} data-testid="soaTitle">SOA #3379</h1>
            <p style={supplierName} data-testid="supplierName">Bakers Room</p>
            <p style={dueDate} data-testid="dueDate">Due Date: 13/07/23</p>
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
              </tr>
            </thead>
            <tbody>
            {
              mockData.soaProductDetails.map((item, id) => 
              <tr key={id}>
                <td style={td}>{item.product}</td>
                <td style={td}>{item.quantity}</td>
                <td style={td}>{item.amount}</td>
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
          {/* if clicked go to compare doc page */}
          <button style={paymentButton}>
            <Link to="/comparedocumentpage">
              <LiaWalletSolid size ={30} style={paymentButtonImg} data-testid="payment-button"/>
            </Link>
          </button>
        </div>
      </div>

    </div>
  )
}

export default DetailedSoaPage