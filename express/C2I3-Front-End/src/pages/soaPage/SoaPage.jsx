import React, { useEffect, useState } from "react";
// import Swiper from 'react-id-swiper';
import "../../../node_modules/swiper/swiper-bundle.css";
import "./soaPage.css";
import { SecondNavBar } from "../../components/secondNavBar/SecondNavBar";
import DropDownMenu from "../../components/dropDownMenu/DropDownMenu";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';

const SoaPage = () => {
  

  useEffect(() => {
    // Fetch SOA data from the backend when the component mounts
    fetchSOAData();
  }, []);

  const fetchSOAData = async () => {
    try {
      // Make an API call to your backend to fetch SOA data
      const response = await axios.get("http://localhost:3000/getSOAData"); // Replace with your backend API endpoint

      // Update the state with the fetched data
      setSoaData(response.data);

      console.log("SOA data fetched successfully!");
    } catch (error) {
      console.error("Error fetching SOA data:", error);
    }
  };
  const [soaData, setSoaData] = useState([]);

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

  console.log(soaData);

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
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
  {soaData.map((item) => (
    <tr key={item._id}>
      <td>
        <a href={`/detailedsoapage/${item._id}`} className="soaID-link">
          {item._id}
        </a>
      </td>
      <td>
        <a href={`/detailedsoapage/${item._id}`} className="supplier-link">
          {item.supplierID}
        </a>
      </td>
      <td>
        <a href={`/detailedsoapage/${item._id}`} className="amount-link">
          {item.totalAmount}
        </a>
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