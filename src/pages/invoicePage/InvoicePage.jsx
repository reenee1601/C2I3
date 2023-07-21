import React, { useState } from "react";
// import Swiper from 'react-id-swiper';
import "../../../node_modules/swiper/swiper-bundle.css";
import "./invoicePage.css";
import { SecondNavBar } from "../../components/secondNavBar/SecondNavBar";
import DropDownMenu from "../../components/dropDownMenu/DropDownMenu";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const InvoicePage = () => {
  const [selected_amount, setSelected_amount] = useState("");
  const [selected_date, setSelected_date] = useState("");
  const [selected_invoicenum, setSelected_invoicenum] = useState("");
  const [selected_suppliername, setSelected_suppliername] = useState("");
  const [isOpen, setIsOpen] = useState({
    dropdown_amount: false,
    dropdown_date: false,
    dropdown_invoicenum: false,
    dropdown_suppliername: false,
  });

  const amount_options = ["Amount", "Most to Least", "Least to Most"];
  const date_options = ["Date", "Latest to Oldest", "Oldest to Latest"];
  const invoicenum_options = [
    "Invoice Number",
    "Smallest to Largest",
    "Largest to Smallest",
  ];
  const suppliername_options = ["Supplier Name", "A - Z", "Z - A"];

  const handleToggleDropdown = (dropdownName) => {
    setIsOpen((prevIsOpen) => ({
      ...prevIsOpen,
      [dropdownName]: !prevIsOpen[dropdownName],
    }));
  };

  // table
  const details = [
    {
      invoiceID: "#1111",
      supplier: "Bakers Room",
      issuedDate: "13/06/2023",
      dueDate: "13/07/2023",
      amount: "$4000.50",
    },
    {
      invoiceID: "#2550",
      supplier: "Amy's Market",
      issuedDate: "08/06/2023",
      dueDate: "08/07/2023",
      amount: "$4370.00",
    },
    {
      invoiceID: "#2090",
      supplier: "Mom's Shop",
      issuedDate: "08/02/2023",
      dueDate: "08/08/2023",
      amount: "$4340.50",
    },
    {
      invoiceID: "#1342",
      supplier: "Mom's Shop",
      issuedDate: "08/02/2023",
      dueDate: "08/08/2023",
      amount: "$40.00",
    },
    {
      invoiceID: "#1342",
      supplier: "Mom's Shop",
      issuedDate: "08/02/2023",
      dueDate: "08/08/2023",
      amount: "$40.00",
    },
    {
      invoiceID: "#1342",
      supplier: "Mom's Shop",
      issuedDate: "08/02/2023",
      dueDate: "08/08/2023",
      amount: "$40.00",
    },
  ];

  return (
    <div>
      <div className="second-navbar">
        <SecondNavBar />
      </div>

      <div className="filtering-options">
        <p>Manage Invoices</p>
        <div className="dropdown">
          <div className="amount-dropdown">
            <div
              className="amount-btn"
              onClick={() => handleToggleDropdown("dropdown_amount")}
            >
              Amount: {selected_amount}
            </div>
            <div>
              {isOpen.dropdown_amount && (
                <DropDownMenu
                  options={amount_options}
                  selected={selected_amount}
                  setSelected={setSelected_amount}
                  setIsOpen={() => handleToggleDropdown("dropdown_amount")}
                />
              )}
            </div>
          </div>

          <div className="date-dropdown">
            <div
              className="date-btn"
              onClick={() => handleToggleDropdown("dropdown_date")}
            >
              Date: {selected_date}
            </div>
            <div>
              {isOpen.dropdown_date && (
                <DropDownMenu
                  options={date_options}
                  selected={selected_date}
                  setSelected={setSelected_date}
                  setIsOpen={() => handleToggleDropdown("dropdown_date")}
                />
              )}
            </div>
          </div>

          <div className="invoicenum-dropdown">
            <div
              className="invoicenum-btn"
              onClick={() => handleToggleDropdown("dropdown_invoicenum")}
            >
              Invoice Number: {selected_invoicenum}
            </div>
            <div>
              {isOpen.dropdown_invoicenum && (
                <DropDownMenu
                  options={invoicenum_options}
                  selected={selected_invoicenum}
                  setSelected={setSelected_invoicenum}
                  setIsOpen={() => handleToggleDropdown("dropdown_invoicenum")}
                />
              )}
            </div>
          </div>

          <div className="suppliername-dropdown">
            <div
              className="suppliername-btn"
              onClick={() => handleToggleDropdown("dropdown_suppliername")}
            >
              Supplier Name: {selected_suppliername}
            </div>
            <div>
              {isOpen.dropdown_suppliername && (
                <DropDownMenu
                  options={suppliername_options}
                  selected={selected_suppliername}
                  setSelected={setSelected_suppliername}
                  setIsOpen={() =>
                    handleToggleDropdown("dropdown_suppliername")
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* search bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>

      {/* table */}
      <div className="table-container">
        <div className="scrollable">
          <Table className="custom-table transparent-table">
            <thead className="sticky-top">
              <tr>
                <th>Invoice ID</th>
                <th>Supplier</th>
                <th>Issued Date</th>
                <th>Due Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {details.map((item, id) => (
                <tr key={id}>
                  <td>
                    <Link
                      to={`/detailedinvoicepage`}
                      className="invoiceID-link"
                    >
                      {item.invoiceID}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/detailedinvoicepage`} className="supplier-link">
                      {item.supplier}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/detailedinvoicepage`}
                      className="issuedDate-link"
                    >
                      {item.issuedDate}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/detailedinvoicepage`} className="dueDate-link">
                      {item.dueDate}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/detailedinvoicepage`} className="amount-link">
                      {item.amount}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
