import React, { useState, useEffect } from "react";
import {  useTable, useSortBy, useGlobalFilter } from "react-table";
// import "./invoicePage.css";
import { SecondNavBar } from "../../components/secondNavBar/SecondNavBar";
import { Link } from "react-router-dom";
import mockData from "../../data/mock_data.json";
import { GlobalFilter } from "../../components/globalFilter/GlobalFilter";
import { FaShareSquare } from 'react-icons/fa';
import { searchBar, tableContainer, scrollable, customTable, 
  td, th, invoiceIDLink, supplierLink, issuedDateLink, dueDateLink, amountLink,
  exportButton, bottomPart, dropdownContainer, popupButton, popupButtonp } from './InvoicePageStyle'

const InvoicePage = () => {
  
  useEffect(() => {
    // Fetch Invoice data from the backend when the component mounts
    fetchInvoiceData();
  }, []);

  const fetchInvoiceData = async () => {
    try {
      // Make an API call to your backend to fetch Invoice data
      const response = await fetch("http://localhost:8000/Invoice/getData", {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
      // Update the state with the fetched data
      // TODO: escape this error of empty array cannot be mapped when no data is fetched. 
      setInvoiceData(data);

      console.log("Invoice data fetched successfully!");

      console.log(response);
    } catch (error) {
      console.error("Error fetching Invoice data:", error);
    }
  };
  const [InvoiceData, setInvoiceData] = useState([]);
  console.log(InvoiceData);

  // hold array of column objects
  // useMemo is React hook for memoization
  const columns = React.useMemo(
    () => [
      // first argument that returns the value we want to memoize
      // each object represents a single column
      {
        Header: "Invoice ID",
        accessor: "invoiceID", // key to access the data row
        Cell: (
          { row } // how the content of the cell should be rendered
        ) => (
          <Link to={`/detailedinvoicepage`} style={invoiceIDLink}>
            {row.original.invoiceID}
          </Link>
        ),
      },
      {
        Header: "Supplier",
        accessor: "supplier",
        Cell: ({ row }) => (
          <Link to={`/detailedinvoicepage`} style={supplierLink}>
            {row.original.supplier}
          </Link>
        ),
      },
      {
        Header: "Issued Date",
        accessor: "issuedDate",
        Cell: ({ row }) => (
          <Link to={`/detailedinvoicepage`} style={issuedDateLink}>
            {row.original.issuedDate}
          </Link>
        ),
      },
      {
        Header: "Due Date",
        accessor: "dueDate",
        Cell: ({ row }) => (
          <Link to={`/detailedinvoicepage`} style={dueDateLink}>
            {row.original.dueDate}
          </Link>
        ),
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ row }) => (
          <Link to={`/detailedinvoicepage`} style={amountLink}>
            {row.original.amount}
          </Link>
        ),
      },
    ],
    [] // empty dependency array: value ill be memoized and not recalculated
  );

  const tableInstance = useTable(
    { columns, data: mockData.invoiceDetails},
    useGlobalFilter, useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } =
    tableInstance;
  
  const { globalFilter } = state;

// bottom-part buttons  
const [isDropdownVisible, setIsDropdownVisible] = useState(false);

const handleDropdownItemClick = (option) => {
  console.log("Selected option:", option);

  // Perform actions based on the selected option (e.g., export Excel, CSV, or generate tax report)
  // ...

  setIsDropdownVisible(false); // Close the dropdown after selecting an option
}

return (
  <div>
    <div className="second-navbar">
      <SecondNavBar />
    </div>

    {/* <div style={buttonContainer}>
      <button style={buttonStyles}>Generate Yearly Tax Record</button>
    </div> */}

    {/* search bar */}
    <div style={searchBar}>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
    </div>

       {/* table */}
    <div style={tableContainer}>
      <div style={scrollable}>
        <table style={customTable} {...getTableProps()}>
          <thead className="sticky-top">
            <tr>
              <th style={th}>Invoice ID</th>
              <th style={th}>Supplier</th>
              <th style={th}>Total</th>
              
            </tr>
          </thead>
          <tbody>
          {(
            (InvoiceData.length > 0 ? ( // Check if data has been fetched
              InvoiceData.map((item) => (
                <tr key={item._id}>
                  <td style={td}>
                    <Link to={`/detailedInvoicepage/${item._id}`} className="InvoiceID-link">
                      {item.invoiceID}
                      
                    </Link>
                    
                  </td>
                  <td style={td}>
                    <Link to={`/detailedInvoicepage/${item._id}`} className="supplier-link">
                      {item.supplierID}
                    </Link>
                  </td>
                  <td style={td}>
                    <Link to={`/detailedInvoicepage/${item._id}`} className="amount-link">
                      {item.totalAfterGST}
                    </Link>
                  </td>
                  {/* ... Table cell JSX code ... */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>Loading data...</td>
              </tr>
            ))
          )}
            
          </tbody>
        </table>
        </div>
      </div>

      <div style={bottomPart}>
        {/* "Export" button */}
        <button style={exportButton} onClick={() => setIsDropdownVisible((prevState) => !prevState)}>
          <FaShareSquare size ={30}/>
        </button>

        <div style={dropdownContainer}>
          {/* Render the dropdown menu */}
          {isDropdownVisible && (
            <div style={popupButton}>
              <p style={popupButtonp} onClick={() => handleDropdownItemClick("Export Excel")}>Export Excel</p>
              <p style={popupButtonp} onClick={() => handleDropdownItemClick("Export CSV")}>Export CSV</p>
              <p style={popupButtonp} onClick={() => handleDropdownItemClick("Generate Tax Report")}>Generate Tax Report</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default InvoicePage;
