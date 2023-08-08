import React, { useState, useEffect } from "react";
import {  useTable, useSortBy, useGlobalFilter } from "react-table";
// import "./invoicePage.css";
import { SecondNavBar } from "../../components/secondNavBar/SecondNavBar";
import { Link } from "react-router-dom";
import mockData from "../../data/mock_data.json";
import { GlobalFilter } from "../../components/globalFilter/GlobalFilter";
<<<<<<< HEAD
import { FaShareSquare } from 'react-icons/fa';
import axios from 'axios';
=======
import { FaShareSquare } from 'react-icons/fa';import GridLoader from "react-spinners/GridLoader";
import { HiOutlineFilter } from 'react-icons/hi';
import  InvoiceQueryBar  from "../../components/invoiceQueryBar/InvoiceQueryBar";
import backgroundImage from '../../asserts/InvoiceBackground.png';

>>>>>>> c90e2f1b4308e0b81b87fa62761119b33ad68890
import { searchBar, tableContainer, scrollable, customTable, 
  td, th, invoiceIDLink, supplierLink, issuedDateLink, dueDateLink, amountLink,
  exportButton, bottomPart, dropdownContainer, popupButton, popupButtonp, filterStyle, 
  filterIconStyle, filterTextStyle, searchFilterStyle, loadingStyle } from './InvoicePageStyle';

  const InvoicePage = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      setLoading(true);
      
      setTimeout(() => {
        setLoading(false);
      }, 1000);
  
      fetchInvoiceData();
    }, []);
  
    const fetchInvoiceData = async () => {
      try {
        const response = await fetch("http://localhost:8000/Invoice/getData", {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json();
        setInvoiceData(data);
  
        console.log("Invoice data fetched successfully!");
  
        console.log(response);
      } catch (error) {
        console.error("Error fetching Invoice data:", error);
      }
    };
    
    const [InvoiceData, setInvoiceData] = useState([]);
    console.log(InvoiceData);
   

<<<<<<< HEAD
      console.log("Invoice data fetched successfully!");

      console.log(response);
    } catch (error) {
      console.error("Error fetching Invoice data:", error);
    }
  };
  const [InvoiceData, setInvoiceData] = useState([]);
  console.log(InvoiceData);

  const handleExportToCSV = () => {
    // Make a GET request to the backend endpoint for exporting data to CSV
    axios.get('http://localhost:8000/invoice/exportInvoiceToCSV')
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
    axios.get('http://localhost:8000/invoice/exportInvoiceToExcel')
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
=======
    const columns = React.useMemo(
      () => [
        {
          Header: "Invoice ID",
          accessor: "invoiceID",
          Cell: ({ row }) => (
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
      []
    );
>>>>>>> c90e2f1b4308e0b81b87fa62761119b33ad68890
  
    const [queryBar, setQueryBar] = useState(false);
  
    const [issuedStartDate, setIssuedStartDate] = useState(null);
    const [issuedEndDate, setIssuedEndDate] = useState(null);
  
    const [dueStartDate, setDueStartDate] = useState(null);
    const [dueEndDate, setDueEndDate] = useState(null);
  
    const [minAmount, setMinAmount] = useState(null);
    const [maxAmount, setMaxAmount] = useState(null);
  
    const [invoice, setInvoice] = useState(null);
  
    const [supplierName, setSupplierName] = useState("");
  
    const handleApplyFilters = ({
      issuedStartDate,
      issuedEndDate,
      dueStartDate,
      dueEndDate,
      minAmount,
      maxAmount,
      invoice,
      supplierName,
    }) => {
      let filteredData = mockData.invoiceDetails;

      // FILTERING: "Issued Date" filtering
      if (issuedStartDate && issuedEndDate) {
        filteredData = filteredData.filter((row) => {
          const issuedDate = new Date(row.issuedDate);
          return issuedDate >= issuedStartDate && issuedDate <= issuedEndDate;
        });
      }
    
      // FILTERING: "Due Date" filtering
      if (dueStartDate && dueEndDate) {
        filteredData = filteredData.filter((row) => {
          const dueDate = new Date(row.dueDate);
          return dueDate >= dueStartDate && dueDate <= dueEndDate;
        });
      }
    
      // FILTERING: "Amount" filtering
      if (minAmount !== null && maxAmount !== null) {
        const minAmountValue = parseFloat(minAmount);
        const maxAmountValue = parseFloat(maxAmount);
    
        filteredData = filteredData.filter((row) => {
          const amount = parseFloat(row.amount);
          return amount >= minAmountValue && amount <= maxAmountValue;
        });
      }
    
      // FILTERING: "Invoice" filtering
      if (invoice  !== null) {
        const invoiceValue = parseFloat(invoice);
    
        filteredData = filteredData.filter((row) => {
          const number = parseFloat(row.invoiceID);
          return number === invoiceValue
        })
      }
    
      // FILTERING: "Supplier Name" filtering
      if (supplierName !== null) {
        filteredData = filteredData.filter((row) => {
          return row.supplier === supplierName;
        });
      }
    
      // Update the state with filtered data
      setFilteredData(filteredData);
    };
    
      // Create a state to hold filtered data
      const [filteredData, setFilteredData] = useState(mockData.invoiceDetails);
      const tableInstance = useTable(
        { columns, data: filteredData },
        useGlobalFilter,
        useSortBy
      );
    
      const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } =
        tableInstance;
      
      const { globalFilter } = state;
    
      // bottom-part buttons  
      const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  
    const handleDropdownItemClick = (option) => {
      console.log("Selected option:", option);
      setIsDropdownVisible(false);
    };
  
  
return (
  <>
    {loading ? (
      <div style={loadingStyle}>
        <GridLoader 
        color={"#3A3A3A"} 
        loading={loading} 
        size={20} />
      </div>
    ) : (
      <div
    style={{
      backgroundImage: `url(${backgroundImage})`, // Set the background image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh', 
    }}>
    <div className="second-navbar">
      <SecondNavBar />
    </div>
    <div style={searchFilterStyle}>
        <div style={searchBar}>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
        </div>

<button style={filterStyle} onClick={ () => setQueryBar(true)}>
  <span style={filterTextStyle}>Filter</span>
  <HiOutlineFilter style={filterIconStyle}/>
</button>

<div>
  <InvoiceQueryBar
    trigger={queryBar}
    setTrigger={setQueryBar}

    issuedStartDate={issuedStartDate}
    setIssuedStartDate={setIssuedStartDate}
    issuedEndDate={issuedEndDate}
    setIssuedEndDate={setIssuedEndDate}

    dueStartDate={dueStartDate}
    setDueStartDate={setDueStartDate}
    dueEndDate={dueEndDate}
    setDueEndDate={setDueEndDate}

    minAmount={minAmount}
    setMinAmount={setMinAmount}
    maxAmount={maxAmount}
    setMaxAmount={setMaxAmount}

    invoice={invoice}
    setInvoice={setInvoice}

    supplierName={supplierName}
    setSupplierName={setSupplierName}

    handleApplyFilters={handleApplyFilters}
  />
</div>
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
              {InvoiceData.length > 0 ? (
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
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div style={bottomPart}>
        {/* "Export" button */}
        <button style={exportButton} onClick={() => setIsDropdownVisible((prevState) => !prevState)}>
          <FaShareSquare size={30} />
        </button>

        <div style={dropdownContainer}>
          {/* Render the dropdown menu */}
          {isDropdownVisible && (
            <div style={popupButton}>
              <p style={popupButtonp} onClick={handleExportToExcel}>Export Excel</p>
              <p style={popupButtonp} onClick={handleExportToCSV}>Export CSV</p>
              <p style={popupButtonp} onClick={() => handleDropdownItemClick("Generate Tax Report")}>Generate Tax Report</p>
            </div>
            
          )}
        </div>
        </div>
        </div>
      )}
    </>
  );
};


export default InvoicePage;