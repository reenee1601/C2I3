import React, { useState } from "react";
// import Swiper from 'react-id-swiper';
import "../../../node_modules/swiper/swiper-bundle.css";
import "./soaPage.css";
import { SecondNavBar } from "../../components/secondNavBar/SecondNavBar";
import DropDownMenu from "../../components/dropDownMenu/DropDownMenu";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const SoaPage = () => {
  const [selected_amount, setSelected_amount] = useState("");
  const [selected_date, setSelected_date] = useState("");
  const [selected_soanum, setSelected_soanum] = useState("");
  const [selected_suppliername, setSelected_suppliername] = useState("");
  const [isOpen, setIsOpen] = useState({
    dropdown_amount: false,
    dropdown_date: false,
    dropdown_soanum: false,
    dropdown_suppliername: false,
  });

  const amount_options = ["Amount", "Most to Least", "Least to Most"];
  const date_options = ["Date", "Latest to Oldest", "Oldest to Latest"];
  const soanum_options = [
    "SOA Number",
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
      soaID: "#3379",
      supplier: "Bakers Room",
      issuedDate: "13/06/2023",
      dueDate: "13/07/2023",
      amount: "$4000.50",
    },
    {
      soaID: "#3028",
      supplier: "Amy's Market",
      issuedDate: "08/06/2023",
      dueDate: "08/07/2023",
      amount: "$4370.00",
    },
    {
      soaID: "#1342",
      supplier: "Mom's Shop",
      issuedDate: "08/02/2023",
      dueDate: "08/08/2023",
      amount: "$4340.50",
    },
    {
      soaID: "#1342",
      supplier: "Mom's Shop",
      issuedDate: "08/02/2023",
      dueDate: "08/08/2023",
      amount: "$4340.50",
    },
    {
      soaID: "#1342",
      supplier: "Mom's Shop",
      issuedDate: "08/02/2023",
      dueDate: "08/08/2023",
      amount: "$4340.50",
    },
    {
      soaID: "#1342",
      supplier: "Mom's Shop",
      issuedDate: "08/02/2023",
      dueDate: "08/08/2023",
      amount: "$4340.50",
    },
  ];

  return (
    <div>
      <div className="second-navbar">
        <SecondNavBar />
      </div>

      <div className="filtering-options">
        <p>Manage SOA</p>
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

          <div className="soanum-dropdown">
            <div
              className="soanum-btn"
              onClick={() => handleToggleDropdown("dropdown_soanum")}
            >
              SOA Number: {selected_soanum}
            </div>
            <div>
              {isOpen.dropdown_soanum && (
                <DropDownMenu
                  options={soanum_options}
                  selected={selected_soanum}
                  setSelected={setSelected_soanum}
                  setIsOpen={() => handleToggleDropdown("dropdown_soanum")}
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
                <th>SOA ID</th>
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
                    <Link to={`/detailedsoapage`} className="soaID-link">
                      {item.soaID}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/detailedsoapage`} className="supplier-link">
                      {item.supplier}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/detailedsoapage`} className="issuedDate-link">
                      {item.issuedDate}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/detailedsoapage`} className="dueDate-link">
                      {item.dueDate}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/detailedsoapage`} className="amount-link">
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

export default SoaPage;
