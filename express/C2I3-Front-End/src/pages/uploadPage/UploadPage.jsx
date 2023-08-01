import React from 'react'
import { useState } from 'react'
import { useTable } from 'react-table'
import axios from 'axios';

import DocumentType from '../../components/documentType/DocumentType';
import SecondNavBar from '../../components/secondNavBar/SecondNavBar';

import { MdUploadFile , MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";

const UploadPage = () => {

  const fileupload = {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    
    borderRadius: "30px",
    border: "2px solid rgba(49, 54, 56, 0.33)",
    background: "#F2F4F8",

    width: "400px",
    height: "400px",

    marginTop: "50px",
    marginLeft: "100px"
  }

  const fileinfo = {
    color: "#535353",
    fontFamily: "KoHo",
    fontSize: "15px",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.17px",

    marginTop: "10px",
    marginLeft: "100px"

  }

  const uploading = {
    display: "flex",
    flexDirection: "column",
  }

  const alluploads = {
    display: "flex",
    flexDirection: "row",
  }

  const tablecontainer = {
    position: "absolute",
    top: "33%",
    left: "43%",
    overflowY: "scroll",

    width:"50%",
    height: "50%"
  }

  const tablestyle = {
    width: "100%",
    overflow: "hidden",
    borderCollapse: "separate",
    borderSpacing: "10px",
  }

  const tablehead = {
    color: "#000",
    fontFamily: "KoHo",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "normal",
    letterSpacing: "0.17px",

    borderBottom: "2px solid #535353"
  }

  const tablebody = {
    background: "#F2F4F8",
  }

  const tablerow = {
    // borderRadius: "15px",
    height: "40px",
    justifyContent: "space-between"
  }

  const tablecell = {
    paddingLeft: "10px", 
  }

  const removebuttonstyle = {
    color: "rgba(0, 0, 0, 0.46)",
    fontFamily: "KoHo",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: "600",
    textAlign: "right",

    background: "none",
    backgroundColor: 'transparent',
    shadow: "none",
    border: "none",

    height:"40px",
    width: "100px",

    marginLeft: "auto",

  }

  const uploadconfirm = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",

    marginRight: "7%"

  }

 const uploadconfirmbutton = {
    borderRadius: "12px",
    background: "#F3F3F3",
    border: "none",

    color: "#535353",
    fontFamily: "KoHo",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "26px", 

    boxSizing: "border-box",
    height: "40px",
    width: "150px",

    marginLeft: "30px"
 }

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No File Selected");

  const [uploadcontent, setUploadContent] = useState([
    { "Uploaded": "invoice1.pdf" },
    { "Uploaded": "invoice2.pdf" },
    { "Uploaded": "invoice3.pdf" },
    { "Uploaded": "invoice4.pdf" },
    { "Uploaded": "invoice5.pdf" },
    { "Uploaded": "invoice6.pdf" },
    { "Uploaded": "invoice7.pdf" },
    { "Uploaded": "invoice8.pdf" },
    { "Uploaded": "invoice9.pdf" },
    { "Uploaded": "invoice10.pdf" },
  ])

  const handleFileUpload = () => {
    // if (!image) {
    //   console.log("No file selected.");
    //   return;
    // }

    const formData = new FormData();
    formData.append("pdfFile", image);

    // Replace 'YOUR_BACKEND_UPLOAD_URL' with the actual URL of your backend route for file upload.
    axios
      .post("http://localhost:3000/uploadData", formData, {
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

  // headerGroups: consist of all headers (Uploaded)
  const data = React.useMemo(() => uploadcontent, [uploadcontent]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Uploaded Files",
        accessor: "Uploaded",
      },
    ],
    []
  );


  // headerGroups: consist of all headers (Uploaded)
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <div>
        <SecondNavBar />
        <DocumentType />
      </div>

      <div className="alluploads" style={alluploads}>
        <div style={uploading}>
          <form
            style={fileupload}
            onClick={() => document.querySelector(".input-field").click()}
          >
            <input
              type="file"
              accept="application/pdf"
              className="input-field"
              hidden
              onChange={({ target: { files } }) => {
                files[0] && setFileName(files[0].name);
                if (files[0]) {
                  setImage(files[0]);
                }
              }}
            />
            {image ? (
              <img src={URL.createObjectURL(image)} alt={"Preview"} />
            ) : (
              <MdUploadFile color="#535353" size={130} />
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

        <div style={tablecontainer}>
          <table style={tablestyle} {...getTableProps()}>

            <thead style = {tablehead}>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody style = {tablebody} {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row)
                return(
                  <tr style = {tablerow} {...row.getRowProps()}>

                    {row.cells.map((cell) => (
                      <td style = {tablecell} {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}

                    <button style = {removebuttonstyle} onClick={() => {
                        const dataCopy = [...uploadcontent];
                        dataCopy.splice(row.index, 1);
                        setUploadContent(dataCopy);
                      }}>
                        Remove
                    </button>
                    
                  </tr>
                )
              })}
            </tbody>
            
          </table>
        </div>
      </div>

      <div style={uploadconfirm}>
          <button style={uploadconfirmbutton} onClick={handleFileUpload}>Confirm</button>
          <button style={uploadconfirmbutton} >Cancel</button>
      </div>
      
  </div>
  )
            }
export default UploadPage;