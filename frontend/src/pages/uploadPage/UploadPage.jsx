import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

import SecondNavBar from '../../components/secondNavBar/SecondNavBar';

import { MdUploadFile , MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";

import {
  fileupload,
  fileinfo,
  uploading,
  alluploads,
  uploadconfirm,
  documentTypeStyle,
  documentTypeTextStyle,
  documentTypeSOATextStyle,
  uploadsubmitbutton,
  uploadcancelbutton,
} from "./UploadPageStyle"

const UploadPage = () => {

  //VALIDATION
  const [upload, setUpload] = useState('');

  const [error, setError] = useState({
    upload: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // END OF VALIDATION

  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState ("No File Selected")
  const [selectedType, setSelectedType] = useState("INVOICE");

  const handleDocumentTypeClick = (type) => {
    setSelectedType(type);
  };

  const selectedButtonStyle = {
    ...documentTypeTextStyle,
    color: '#5995CD',
  };

  const unselectedButtonStyle = {
    ...documentTypeTextStyle,
    color: '#3A3A3A',
  };

  //specifically for SOA styling

  const selectedSOAButtonStyle = {
    ...documentTypeSOATextStyle,
    color: '#5995CD',
  };

  const unselectedSOAButtonStyle = {
    ...documentTypeSOATextStyle,
    color: '#3A3A3A',
  };


   // // // // // // // /
  // START OF BACKEND //
 /// // // // // // ///


  const handleFileUploadInvoice = () => {
    
    const formData = new FormData();
    formData.append("pdfFile", image);
    //console.log("isInvoiceActive:", isInvoiceActive);
    console.log("image:", image);
    console.log('Invoice is clicked')
    axios
      .post("http://localhost:8000/invoice/uploadDataInvoice", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Handle the successful response from the backend if needed.
        console.log("File uploaded successfully!");
      })
      .catch((error) => {
        // Handle any error that occurred during the file upload.
        console.error("Error uploading file:", error);
      });
  };


  const handleFileUploadSOA = () => {
      
      const formData = new FormData();
      formData.append("pdfFile", image);
      //console.log("isInvoiceActive:", isInvoiceActive);
      console.log("image:", image);
      console.log('Soa is clicked')
      axios
        .post("http://localhost:8000/soa/uploadDataSOA", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // Handle the successful response from the backend if needed.
          console.log("File uploaded successfully!");
        })
        .catch((error) => {
          // Handle any error that occurred during the file upload.
          console.error("Error uploading file:", error);
        });
  };

    const handleConditionalButtonClick = () =>{
      if(selectedType == "INVOICE"){
        // this.handleFileUploadInvoice();
        console.log(1);
      }
      else if(selectedType == "STATEMENT"){
        // this.handleFileUploadSOA();
        console.log(2);
      }
      else if(selectedType == "PAYMENT"){
        // this.handleFileUploadReceipt();
        console.log(3);
      }
      else{
        // this.handleFileUploadCreditNote();
        console.log(4);
      }
  }

  return (
    <div>
      <div>
        <SecondNavBar />
      </div>

      <div className="alluploads" style = {alluploads}>

        <div style={documentTypeStyle}>
          <h1 style={documentTypeTextStyle}>DOCUMENT TYPE:</h1>
          <button
            style={selectedType === "INVOICE" ? selectedButtonStyle : unselectedButtonStyle}
            onClick={() => handleDocumentTypeClick("INVOICE")}
          >
            INVOICE
          </button>
          <button
            style={selectedType === "STATEMENT" ? selectedSOAButtonStyle : unselectedSOAButtonStyle}
            onClick={() => handleDocumentTypeClick("STATEMENT")}
          >
            STATEMENT OF{'\n'}ACCOUNT
          </button>
          <button
            style={selectedType === "PAYMENT" ? selectedButtonStyle : unselectedButtonStyle}
            onClick={() => handleDocumentTypeClick("PAYMENT")}
          >
            PAYMENT
          </button>
        </div>

        <div style={uploading}>

          <form style = {fileupload} 
          onClick={() => document.querySelector(".input-field").click()}>
            <input type="file" accept="png/*" className ="input-field" hidden
            onChange={({ target: {files}}) => {
            files[0] && setFileName(files[0].name)
            if (files) {
              setImage(URL.createObjectURL(files[0]))
            }}}></input>

            {image ?
            <img src={image} alt={"Error"} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}/>
            :
            <MdUploadFile color="#535353" size={130}/>
            }
          </form>

          <section style={fileinfo}>
            <AiFillFileImage color="#535353"/>
            <span>
              {fileName}
              <MdDelete color="#535353" 
              onClick = {() => {
                setFileName('No File Selected')
                setImage(null)
              }}/>
            </span>
          </section>
        </div>

      </div>

      <div style={uploadconfirm}>
        <Link to="/editdocumentpage">
          <button style={uploadcancelbutton} onClick={() => handleConditionalButtonClick()}>Submit</button>;
        </Link>
          <button style={uploadcancelbutton} 
                onClick = {() => {
                setFileName('No File Selected')
                setImage(null)
              }}>Cancel</button>
      </div>
      
  </div>
  )
}

export default UploadPage