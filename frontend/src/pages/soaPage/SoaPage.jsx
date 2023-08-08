import React, { useEffect, useState } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
// import "./soaPage.css";
import { SecondNavBar } from "../../components/secondNavBar/SecondNavBar";
import { Link } from "react-router-dom";
import mockData from "../../data/mock_data.json";
import { GlobalFilter } from "../../components/globalFilter/GlobalFilter";
import { Table } from "react-bootstrap";
import { FaShareSquare } from 'react-icons/fa';
import axios from 'axios';
import { searchBar, tableContainer, scrollable, customTable, 
          td, th, soaIDLink, supplierLink, dueDateLink, amountLink,
          exportButton, bottomPart, popupButton, popupButtonp, dropdownContainer, exportButtonIcon } from './SoaPageStyle';

const SoaPage = () => {


  useEffect(() => {
    // Fetch SOA data from the backend when the component mounts
    fetchSOAData();
  }, []);

  const fetchSOAData = async () => {
    try {
      // Make an API call to your backend to fetch SOA data
      const response = await fetch("http://localhost:8000/soa/getSOAData", {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
      // Update the state with the fetched data
      // TODO: escape this error of empty array cannot be mapped when no data is fetched. 
      setSoaData(data);

      console.log("SOA data fetched successfully!");

      console.log(response);
    } catch (error) {
      console.error("Error fetching SOA data:", error);
    }
  };
  const [soaData, setSoaData] = useState([]);
  console.log(soaData);

  const handleExportToCSV = () => {
    // Make a GET request to the backend endpoint for exporting data to CSV
    axios.get('http://localhost:8000/soa/exportToCSV')
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
    axios.get('http://localhost:8000/soa/exportToExcel')
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

    const columns = React.useMemo(
    () => [
      // first argument that returns the value we want to memoize
      // each object represents a single column
      {
        Header: "SOA ID",
        accessor: "soaID", // key to access the data row
        Cell: (
          { row } // how the content of the cell should be rendered
        ) => (
          <Link to={`/detailedsoapage`} style={soaIDLink}>
            {row.original.soaID}
          </Link>
        ),
      },
      {
        Header: "Supplier",
        accessor: "supplier",
        Cell: ({ row }) => (
          <Link to={`/detailedsoapage`} style={supplierLink}>
            {row.original.supplier}
          </Link>
        ),
      },
      {
        Header: "Due Date",
        accessor: "dueDate",
        Cell: ({ row }) => (
          <Link to={`/detailedsoapage`} style={dueDateLink}>
            {row.original.dueDate}
          </Link>
        ),
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ row }) => (
          <Link to={`/detailedsoapage`} style={amountLink}>
            {row.original.amount}
          </Link>
        ),
      },
    ],
    [] // empty dependency array: value ill be memoized and not recalculated
  );


  const tableInstance = useTable(
    // { columns, data: mockData.soaDetails},
    { columns, data: mockData.soaDetails},
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
          <Table style={customTable} {...getTableProps()}>
            <thead className="sticky-top">
              <tr>
                <th style={th}>SOA ID</th>
                <th style={th}>Supplier</th>
                <th style={th}>Amount</th>
              </tr>
            </thead>
            <tbody>
            {(
              (soaData.length > 0 ? ( // Check if data has been fetched
                soaData.map((item) => (
                  <tr key={item._id}>
                    <td style={td}>
                      <Link to={`/detailedsoapage/${item._id}`} className="soaID-link">
                        {item._id}
                        
                      </Link>
                      
                    </td>
                    <td style={td}>
                      <Link to={`/detailedsoapage/${item._id}`} className="supplier-link">
                        {item.supplierID}
                      </Link>
                    </td>
                    <td style={td}>
                      <Link to={`/detailedsoapage/${item._id}`} className="amount-link">
                        {item.totalAmount}
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
          </Table>
        </div>
      </div>
      <div style={bottomPart}>
        {/* "Export" button */}
        <button style={exportButton} onClick={() => setIsDropdownVisible((prevState) => !prevState)}>
          <FaShareSquare size ={30} style={exportButtonIcon}/>
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
  );
};

export default SoaPage;
