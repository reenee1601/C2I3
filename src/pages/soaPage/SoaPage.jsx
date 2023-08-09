import React, { useState, useEffect } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { Link } from "react-router-dom";

import { SecondNavBar } from "../../components/secondNavBar/SecondNavBar";
import { GlobalFilter } from "../../components/globalFilter/GlobalFilter";
import SoaQueryBar from "../../components/soaQueryBar/SoaQueryBar";

import mockData from "../../data/mock_data.json";
import { FaShareSquare } from 'react-icons/fa';
import { HiOutlineFilter } from 'react-icons/hi';

import GridLoader from "react-spinners/GridLoader";
import backgroundImage from '../../asserts/SOABackground.png';

import { searchBar, tableContainer, scrollable, customTable, 
          td, th, soaIDLink, supplierLink, dueDateLink, amountLink,
          exportButton, bottomPart, popupButton, popupButtonp, dropdownContainer, exportButtonIcon,
          filterStyle, filterIconStyle, filterTextStyle, searchFilterStyle, loadingStyle,
        } from './SoaPageStyle';

const SoaPage = () => {

  // LOADING FUNCTIONALITY
  const [loading, setLoading] = useState(false)

  //API CALL HERE: Replace SetTimeOut to fetching of data
  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
    }, 1000);

  }, []);


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
          <Link to={`/detailedsoapage`} style={soaIDLink} data-testid="soa-id-link">
            {row.original.soaID}
          </Link>
        ),
      },
      {
        Header: "SUPPLIER",
        accessor: "supplier",
        Cell: ({ row }) => (
          <Link to={`/detailedsoapage`} style={supplierLink}>
            {row.original.supplier}
          </Link>
        ),
      },
      {
        Header: "DUE DATE",
        accessor: "dueDate", 
        Cell: ({ row }) => (
          <Link to={`/detailedsoapage`} style={dueDateLink}>
            {row.original.dueDate}
          </Link>
        ),
      },
      {
        Header: "AMOUNT",
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

  // QUERY METHOD

  // queryBar states
  const [soaQueryBar, setSoaQueryBar] = useState(false);

  // dueDate states
  const [dueStartDate, setDueStartDate] = useState(null);
  const [dueEndDate, setDueEndDate] = useState(null);

  // // amount states
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);

  // invoice states
  const [soa, setSoa] = useState(null);

  // supplierName states
  const [supplierName, setSupplierName] = useState("")

  // function: handle table filtering
  const handleApplyFilters = ({

    dueStartDate,
    dueEndDate,

    minAmount,
    maxAmount,

    soa,

    supplierName,

  }) => {

    let filteredData = mockData.soaDetails;

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

  // FILTERING: "Soa" filtering
  if (soa  !== null) {
    const soaValue = parseFloat(soa);

    filteredData = filteredData.filter((row) => {
      const number = parseFloat(row.soaID);
      return number === soaValue
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
  const [filteredData, setFilteredData] = useState(mockData.soaDetails);

  const tableInstance = useTable(
    { columns, data: filteredData},
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

      {/* <div style={buttonContainer}>
        <button style={buttonStyles}>Generate Yearly Tax Record</button>
      </div> */}

      {/* search bar */}
      <div style={searchFilterStyle}>
        <div style={searchBar} data-testid="global-filter">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
        </div>

        <button style={filterStyle} onClick={ () => setSoaQueryBar(true)} data-testid="filter-button">
          <span style={filterTextStyle}>Filter</span>
          <HiOutlineFilter style={filterIconStyle}/>
        </button>

          <div data-testid="soa-querybar">
          <SoaQueryBar 
            trigger={soaQueryBar}
            setTrigger={setSoaQueryBar}

            dueStartDate={dueStartDate}
            setDueStartDate={setDueStartDate}
            dueEndDate={dueEndDate}
            setDueEndDate={setDueEndDate}

            minAmount={minAmount}
            setMinAmount={setMinAmount}
            maxAmount={maxAmount}
            setMaxAmount={setMaxAmount}

            soa={soa}
            setSoa={setSoa}

            supplierName={supplierName}
            setSupplierName={setSupplierName}

            handleApplyFilters={handleApplyFilters}
          />
          </div>

      </div>

      {/* table */}
      <div style={tableContainer} data-testid="table-container">
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
          <FaShareSquare 
            size ={30} 
            style={exportButtonIcon}
            data-testid="export-button"/>
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
      )}
    </>
  );
};

export default SoaPage;
