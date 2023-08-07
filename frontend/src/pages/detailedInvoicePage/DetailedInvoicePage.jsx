import React from 'react';
import { SecondNavBar } from '../../components/secondNavBar/SecondNavBar';
import './detailedInvoicePage.css';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import mockData from "../../data/mock_data.json";
import { IoChevronBack } from 'react-icons/io5';
import { topPart, invoiceTitle, supplierName, issuedDate, dueDate,
  tableContainer, scrollable, customTable, td, th, bottomPart,
  rightBottom, totalAmount, goBackButtonStyle, goBackStyle} from './DetailedInvoicePageStyle';

const DetailedInvoicePage = () => {

  const {id}  = useParams();

    useEffect(() => {
      if (id) {
          fetchInvoiceDataById(id);
          console.log("here")
      } else {
        console.log("Invalid ID. Cannot make the fetch request.");
      }
  }, [id]);


  const [specificInvoiceData, setSpecificInvoiceData] = useState([]);
  const [InvoiceTitle, setInvoiceTitle] = useState("");
  const [totalAmount, setTotalAmount] = useState("");


  const fetchInvoiceDataById = async (id) => {
    try {
      // Make an API call to fetch specific data for the given _id
      console.log('WELPX3');
      const response = await fetch(`http://localhost:8000/Invoice/getData/${id}`,{
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      // Update the state with the fetched data
      setSpecificInvoiceData(data);
      console.log(specificInvoiceData);
      // Update the Invoice title and total amount with the specific data
      setInvoiceTitle(`Invoice #${data.invoiceID}`);
      console.log("WELP");
      setTotalAmount(`Total Amount: ${data.totalAfterGST}`);
      console.log("WELP");

    } catch (error) {
      console.error('Error fetching specific Invoice data:', error);
    }
  };



  return (
    <div>
      <div className="second-navbar">
          <SecondNavBar />
      </div>

      <div style={topPart}>
        <div style={goBackStyle}>
          <Link to="/Invoicepage">
            <IoChevronBack size={50} color={"#3A3A3A"}/>
            <button style={goBackButtonStyle}>GO BACK</button>
          </Link>
        </div>

        <div className="Invoice-detail">
            <h1 style={{InvoiceTitle}}>{InvoiceTitle}</h1>
            <p style={{supplierName}}>Bakers Room</p>
            <p style={{dueDate}}>Due Date: 13/07/23</p>
        </div>
      </div>

      {/* table */}
      <div style={tableContainer}>
        <div style={scrollable}>
          {/* <Table style={customTable}>
            <thead className="sticky-top">
              <tr>
                <th style={th}>Product</th>
                <th style={th}>Quantity</th>
                <th style={th}>Amount</th>
              </tr>
            </thead>
            <tbody>
            {
              mockData.InvoiceProductDetails.map((item, id) => 
              <tr key={id}>
                <td style={td}>{item.product}</td>
                <td style={td}>{item.quantity}</td>
                <td style={td}>{item.amount}</td>
              </tr>      
              )  
            }
            </tbody>
          </Table> */}

        <Table style={customTable}>
              <thead className="sticky-top">
                <tr>
                  <th style={th}>Invoice ID</th>
                  <th style={th}>Supplier</th>
                  <th style={th}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {(console.log(specificInvoiceData))}
            {(
                Object.keys(specificInvoiceData).map((item) => (
                  <tr key={item}>
                    <td style={td}>
                        {specificInvoiceData[item]}                     
                    </td>
                    <td style={td}>
                        {item.supplierID}
                    </td>
                    <td style={td}>
                        {item.issuedDate}
                    </td>
                    <td style={td}>
                        {item.invoiceID}
                    </td>
                  </tr>
                ))
              )}
           </tbody>
          </Table>
        </div>
      </div>

      <div style={bottomPart}>
        <div style={rightBottom}>
          {/* sum of all amounts */}
          <p style={{totalAmount}}>{totalAmount}</p>
          {/* if clicked go to compare doc page */}
          <button style={paymentButton}>
            <Link to="/comparedocumentpage">
              <LiaWalletSolid size ={30} style={paymentButtonImg}/>
            </Link>
          </button>
        </div>
      </div>

    </div>
  )
}
export default DetailedInvoicePage