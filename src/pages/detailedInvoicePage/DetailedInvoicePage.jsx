import React, { useState } from 'react';
import { SecondNavBar } from '../../components/secondNavBar/SecondNavBar';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import mockData from "../../data/mock_data.json";
import { IoChevronBack } from 'react-icons/io5';
import { LuEdit3 } from 'react-icons/lu';
import { topPart, invoiceTitle, supplierName, issuedDate, dueDate,
  tableContainer, scrollable, customTable, td, th, bottomPart,
  rightBottom, totalAmount, goBackButtonStyle, goBackStyle, editInput, goBackLinkStyle} from './DetailedInvoicePageStyle';

const DetailedInvoicePage = () => {

  const [editableRows, setEditableRows] = useState([]);
  const [invoiceProductDetails, setInvoiceProductDetails] = useState(mockData.invoiceProductDetails);

  // Function to handle editing of a row
  const handleEditRow = (rowIndex) => {
    setEditableRows((prevEditableRows) => {
      const updatedRows = [...prevEditableRows];
      updatedRows[rowIndex] = true;
      return updatedRows;
    });
  };

  // Function to handle saving changes and exit editing mode
  const handleSaveRow = (rowIndex) => (event) => {
    if (event.key === 'Enter') {
      setEditableRows((prevEditableRows) => {
        const updatedRows = [...prevEditableRows];
        updatedRows[rowIndex] = false;
        return updatedRows;
      });
      saveChanges(); // Call the function to save changes whenever Enter is pressed.
    }
  };

  // Function to handle changes in the input fields and update the state
  const handleInputChange = (rowIndex, field, value) => {
    const updatedProductDetails = [...invoiceProductDetails];
    updatedProductDetails[rowIndex][field] = value;
    setInvoiceProductDetails(updatedProductDetails);
  };

    
  // Function to save the changes and update the mockData
  const saveChanges = () => {
    mockData.invoiceProductDetails = [...invoiceProductDetails];
  };

  return (
    <div>
      <div>
          <SecondNavBar />
      </div>

      <div style={topPart}>
        
        <Link style={goBackLinkStyle} to="/invoicepage">
          <div style={goBackStyle}>
            <IoChevronBack size={50} color={"#3A3A3A"}/>
            <button style={goBackButtonStyle}>GO BACK</button>
          </div>
        </Link>

        <div className="invoice-detail">
            <h1 style={invoiceTitle} data-testid="invoiceTitle">Invoice #1111</h1>
            <p style={supplierName} data-testid="supplierName">Bakers Room</p>
            <p style={issuedDate} data-testid="issuedDate">Issued Date: 13/06/23</p>
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
                <th style={th}>Comment</th>
                <th style={th}> </th>
              </tr>
            </thead>
            <tbody>
            {
              mockData.invoiceProductDetails.map((item, rowIndex) => 
              <tr key={rowIndex}>
                <td style={td}>
                {editableRows[rowIndex] ? (
                      <input style={editInput}
                        type="text"
                        data-testid="productInput"
                        value={item.product}
                        onChange={(e) => handleInputChange(rowIndex, 'product', e.target.value)}
                        onKeyDown={handleSaveRow(rowIndex)}
                      />
                    ) : (
                      <span>{item.product}</span>
                      // to make the text not editable if not in edit mode
                    )}
                </td>
                <td style={td}>
                {editableRows[rowIndex] ? (
                      <input style={editInput}
                        type="text"
                        data-testid="quantityInput"
                        value={item.quantity}
                        onChange={(e) => handleInputChange(rowIndex, 'quantity', e.target.value)}
                        onKeyDown={handleSaveRow(rowIndex)}
                      />
                    ) : (
                      <span>{item.quantity}</span>
                    )}
                </td>
                <td style={td}>
                {editableRows[rowIndex] ? (
                      <input style={editInput}
                        type="text"
                        data-testid="amountInput"
                        value={item.amount}
                        onChange={(e) => handleInputChange(rowIndex, 'amount', e.target.value)}
                        onKeyDown={handleSaveRow(rowIndex)}
                        // onBlur={() => handleSaveRow(rowIndex)}
                      />
                    ) : (
                      <span>{item.amount}</span>
                    )}
                </td>
                <td style={td}>
                {editableRows[rowIndex] ? (
                      <input style={editInput}
                        type="text"
                        data-testid="commentInput"
                        value={item.comment}
                        onChange={(e) => handleInputChange(rowIndex, 'comment', e.target.value)}
                        onKeyDown={handleSaveRow(rowIndex)}
                        // onBlur={() => handleSaveRow(rowIndex)}
                      />
                    ) : (
                      <span>{item.comment}</span>
                    )}
                </td>
                <td style={td}>
                    <button onClick={() => handleEditRow(rowIndex)} style={{backgroundColor: 'transparent', border: 'none' }}>
                      <LuEdit3 style={{fontSize: '18px'}} />
                    </button>
                  </td>
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