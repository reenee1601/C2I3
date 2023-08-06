import React, { useState } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { Link } from "react-router-dom";

import { SecondNavBar } from "../../components/secondNavBar/SecondNavBar";
import { GlobalFilter } from "../../components/globalFilter/GlobalFilter";
import  InvoiceQueryBar  from "../../components/invoiceQueryBar/InvoiceQueryBar";

import mockData from "../../data/mock_data.json";
import { FaShareSquare } from 'react-icons/fa';
import { HiOutlineFilter } from 'react-icons/hi';

import { searchBar, tableContainer, scrollable, customTable, 
  td, th, invoiceIDLink, supplierLink, issuedDateLink, dueDateLink, amountLink,
  exportButton, bottomPart, dropdownContainer, popupButton, popupButtonp, filterStyle, 
  filterIconStyle, filterTextStyle, searchFilterStyle } from './InvoicePageStyle'

const InvoicePage = () => {

  // CREATE TABLE

  // hold array of column objects
  // useMemo is React hook for memoization
  const columns = React.useMemo(
    () => [
      // first argument that returns the value we want to memoize
      // each object represents a single column
      {
        Header: "INVOICE ID",
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
        Header: "SUPPLIER",
        accessor: "supplier",
        Cell: ({ row }) => (
          <Link to={`/detailedinvoicepage`} style={supplierLink}>
            {row.original.supplier}
          </Link>
        ),
      },
      {
        Header: "ISSUED DATE",
        accessor: "issuedDate",
        Cell: ({ row }) => (
          <Link to={`/detailedinvoicepage`} style={issuedDateLink}>
            {row.original.issuedDate}
          </Link>
        ),
      },
      {
        Header: "DUE DATE",
        accessor: "dueDate",
        Cell: ({ row }) => (
          <Link to={`/detailedinvoicepage`} style={dueDateLink}>
            {row.original.dueDate}
          </Link>
        ),
      },
      {
        Header: "AMOUNT",
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

  // QUERY METHOD

  // queryBar states
  const [queryBar, setQueryBar] = useState(false);

  // issueDate states (start and end)
  const [issuedStartDate, setIssuedStartDate] = useState(null);
  const [issuedEndDate, setIssuedEndDate] = useState(null);

  // dueDate states
  const [dueStartDate, setDueStartDate] = useState(null);
  const [dueEndDate, setDueEndDate] = useState(null);

  // // amount states
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);

  // invoice states
  const [invoice, setInvoice] = useState(null);

  // supplierName states
  const [supplierName, setSupplierName] = useState("")

  // function: handle table filtering
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

  // Create the table instance using the filteredData
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

  // Perform actions based on the selected option (e.g., export Excel, CSV, or generate tax report)
  // ...

    setIsDropdownVisible(false); // Close the dropdown after selecting an option
  }

  return (
    <div>
      <div className="second-navbar">
        <SecondNavBar />
      </div>

      {/* search bar */}
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

          <table
            style={customTable}
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())} style={th}>
                      {column.render("Header")}

                      <span>
                        {/* check whether column is sorted in descending order */}
                        {column.isSorted ? (column.isSortedDesc ? ' ↓':' ↑'):''}
                      </span>

                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()} style={td}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
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
            </div>
          )}
       </div>

      </div>
    </div>
  );
};

export default InvoicePage;
