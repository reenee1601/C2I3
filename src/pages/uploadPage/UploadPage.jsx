import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

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
  documentTypeH1TextStyle,
  labelStyle,
} from "./UploadPageStyle"

const UploadPage = () => {

  //START VALIDATION
  const [upload, setUpload] = useState('');

  const [error, setError] = useState({
    upload: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileName || fileName === "No File Selected") {
      setError({ upload: true });
    } else {
      setError({ upload: false });
      if (image) {
        window.location.href = "/editdocumentpage";
      }
    }
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
  

  return (
    <div>
      <div>
        <SecondNavBar />
      </div>

      <div className="alluploads" style = {alluploads}>

        <div style={documentTypeStyle}>
          <h1 style={documentTypeH1TextStyle}>DOCUMENT TYPE:</h1>
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
          <button
            style={selectedType === "CREDIT NOTE" ? selectedButtonStyle : unselectedButtonStyle}
            onClick={() => handleDocumentTypeClick("CREDIT NOTE")}
          >
            CREDIT NOTE
          </button>
        </div>

        <div style={uploading}>

          <form onSubmit={handleSubmit} style = {fileupload} 
          onClick={() => document.querySelector(".input-field").click()}>
            <input
              type="file"
              accept="pdf/*"
              className="input-field"
              hidden
              onChange={(e) => {
                setUpload(e.target.value);
                const files = e.target.files;
                if (files[0]) {
                  setFileName(files[0].name);
                  setImage(URL.createObjectURL(files[0]));
                }
              }}
            />

          {image ? (
                <img src={image} alt={"Error"} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
              ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <MdUploadFile color="#535353" size={130} />
                  {error.upload && !image && <label style={labelStyle}>No image uploaded</label>}
                </div>
              )}
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
        <Link to={image ? "/editdocumentpage" : "#"}>
          <button style={uploadsubmitbutton} onClick={handleSubmit}>Submit</button>
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