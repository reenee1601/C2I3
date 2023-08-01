import React, { useState } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
// import "./soaPage.css";
import { SecondNavBar } from "../../components/secondNavBar/SecondNavBar";
import { Link } from "react-router-dom";
import mockData from "../../data/mock_data.json";
import { GlobalFilter } from "../../components/globalFilter/GlobalFilter";
import { FaShareSquare } from 'react-icons/fa';
import { searchBar, tableContainer, scrollable, customTable, 
          td, th, soaIDLink, supplierLink, dueDateLink, amountLink,
          exportButton, bottomPart, popupButton, popupButtonp, dropdownContainer, exportButtonIcon } from './SoaPageStyle';

const SoaPage = () => {

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
          <table
            style={customTable}
            {...getTableProps()}
          >
            <thead className="sticky-top">
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
          <FaShareSquare size ={30} style={exportButtonIcon}/>
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

export default SoaPage;
