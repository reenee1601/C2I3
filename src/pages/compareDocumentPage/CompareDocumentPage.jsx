import React, { useState } from 'react'
import { useTable, useSortBy } from "react-table";
import { SecondNavBar } from '../../components/secondNavBar/SecondNavBar';
import mockData from "../../data/mock_data.json";
import { layout, tables, listOfInvoices, missingInvoices, soaDisplay,
          tableContainer, scrollable, customTable, td, th, button, buttonContainer } from './CompareDocumentPageStyle';
import { useNavigate } from 'react-router-dom';

const CompareDocumentPage = () => {

  // hover button functionality
  const [buttonHover, setButtonHover] = useState(false);

  const handleMouseEnter = () => {
    setButtonHover(true);
  };

  const handleMouseLeave = () => {
    setButtonHover(false);
  };

  const navigate=useNavigate();

  const handleOnClick = () => {
    navigate("/uploadpage")
  }

  // checkbox
  const [checkboxState1, setCheckboxState1] = useState({});
    
  const columns1 = React.useMemo(
    () => [
      // first argument that returns the value we want to memoize
      // each object represents a single column
      {
        Header: "Invoice ID",
        accessor: "invoiceID", // key to access the data row
        Cell: (
          { row } // how the content of the cell should be rendered
        ) => (
          <span>{row.original.invoiceID}</span>
        ),
      },
      {
        Header: "Issued Date",
        accessor: "issuedDate",
        Cell: ({ row }) => (
          <span>{row.original.issuedDate}</span>
        ),
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ row }) => (
          <span>{row.original.amount}</span>
        ),
      },
      {
        Header: "Recorded in SOA",
        accessor: "checkbox",
        Cell: ({ row }) => (
          <span className="checkbox-cell"
          
            onClick={() =>
              setCheckboxState1((prevState) => ({
                ...prevState,
                [row.id]: !prevState[row.id],
              }))
            }
            style={{ cursor: "pointer", fontSize:"20px"}}
          >
            {checkboxState1[row.id] ? " ☑" : "☐"}
          </span>
        ),
      },
    ],
    [checkboxState1] // empty dependency array: value ill be memoized and not recalculated
  );

  const columns2 = React.useMemo(
    () => [
      // first argument that returns the value we want to memoize
      // each object represents a single column
      {
        Header: "Invoice ID",
        accessor: "invoiceID", // key to access the data row
        Cell: (
          { row } // how the content of the cell should be rendered
        ) => (
          <span>{row.original.invoiceID}</span>
        ),
      },
      {
        Header: "Issued Date",
        accessor: "issuedDate",
        Cell: ({ row }) => (
          <span>{row.original.issuedDate}</span>
        ),
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ row }) => (
          <span>{row.original.amount}</span>
        ),
      },
    ],
    [] // empty dependency array: value ill be memoized and not recalculated
  );

  const tableInstance = useTable(
    { columns: columns1, data: mockData.listInvoices},useSortBy
  );

  const tableInstance2 = useTable(
    { columns: columns2, data: mockData.missingInvoices},useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const {
    getTableProps: getTableProps2,
    getTableBodyProps: getTableBodyProps2,
    headerGroups: headerGroups2,
    rows: rows2,
    prepareRow: prepareRow2,
  } = tableInstance2
  

  return (
    <div>
        <div>
          <SecondNavBar />
        </div>
      
        <div style={layout}>
          <div style={tables}>
            {/* list of invoices table */}
            <h1 style={listOfInvoices}>LIST OF INVOICES</h1>
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

            {/* missing invoices table */}
            <h1 style={missingInvoices}>MISSING INVOICES</h1>
            {/* <p>Invoices that are in the Statement Of Account but not recorded in the List of Invoices </p> */}
            <div style={tableContainer}>
              <div style={scrollable}>
                <table style={customTable} {...getTableProps2()}>
                  <thead className="sticky-top">
                    {headerGroups2.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th {...column.getHeaderProps(column.getSortByToggleProps())} style={th}>
                            {column.render("Header")}
                            <span>
                              {/* check whether column is sorted in descending order */}
                              {column.isSorted ? (column.isSortedDesc ? " ↓" : " ↑") : ""}
                            </span>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps2()}>
                    {rows2.map((row) => {
                      prepareRow2(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return <td {...cell.getCellProps()} style={td}>{cell.render("Cell")}</td>;
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>  

          <div style={soaDisplay}>
            <div>
              <img src="not-found.png" alt="not-found" />
            </div>
          </div>
        </div>
        
        <div style={buttonContainer}>
            <button 
              style={{
                ...button,
                backgroundColor: buttonHover ? '#A1A1A1' : '#FFF',
                color: buttonHover ? '#FFF' : 'rgba(71, 71, 71, 0.80)',
              }}
              type="button"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleOnClick}
            >
                Proceed to Upload Payment
            </button>
        </div>

    </div>
  )
}


export default CompareDocumentPage