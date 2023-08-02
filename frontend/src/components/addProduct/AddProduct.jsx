import React from 'react'
import { useState } from 'react'
import { TbPhoto, TbFileBarcode} from "react-icons/tb";

import "./addProduct.css"

function AddProduct(props) {

const [product, setProduct] = useState(null)
const [productfileName, setProductFileName] = useState ("No File Selected")

const [barcode, setBarcode] = useState(null)
const [barfileName, setBarFileName] = useState ("No File Selected")

const productinputs = {
    backgroundColor: "transparent",
    width: "100%",
    height: "8%",
    
    border: "none",
    borderRadius: "5px",
    marginTop: "8px",
    marginBottom: "8px",

    color: "#535353",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: "400",
    }

    const producttextarea = {
    backgroundColor: "transparent",
    width: "100%",
    height: "15%",
    
    border: "none",
    borderRadius: "5px",
    marginTop: "8px",
    marginBottom: "8px",

    color: "#535353",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: "400",

    outline: "none"
    }

    const productsubmit = {
        color: "#F2F4F8",
        textAlign: "center",
        fontFamily: "Inter",
        fontSize: "15px",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "normal",

        border: "none",
        borderRadius: "12px",
        background: "rgba(65, 142, 255, 0.80)",

        width: "15%",
        height: "7%",

        marginTop: "10px",
        marginBottom: "10px",
    }

  return (props.trigger) ? (
    <div className = "popup2">
        <div className="popup2-inner">

            <form className = "productimage"
            onClick={() => document.querySelector(".product-image").click()}>
                <input type="file" accept="png/*" className ="product-image" hidden
                onChange={({ target: {files}}) => {
                files[0] && setProductFileName(files[0].name)
                if (files) {
                setProduct(URL.createObjectURL(files[0]))
                }}}></input>

                {product ?
                <img src={product} alt={"Error"} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}/>
                :
                <TbPhoto color="#535353" size={30} />
                }
            </form>

            <input style={productinputs} type="text" placeholder="Add Product Name"></input>
            <textArea className= "productTextArea" style={producttextarea} type="text" placeholder="Add Product Description"></textArea>
            <input style={productinputs} type="text" placeholder="Add Units of Measurements"></input>
            <input style={productinputs} type="text" placeholder="Add Product Cost"></input>
            <input style={productinputs} type="text" placeholder="Add Minimum Quantity"></input>

            <form className = "barcodeimage"
            onClick={() => document.querySelector(".barcode-image").click()}>
                <input type="file" accept="png/*" className ="barcode-image" hidden
                onChange={({ target: {files}}) => {
                files[0] && setBarFileName(files[0].name)
                if (files) {
                setBarcode(URL.createObjectURL(files[0]))
                }}}></input>

                {barcode ?
                <img src={barcode} alt={"Error"} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}/>
                :
                <TbFileBarcode color="#535353" size={30}/>
                }
            </form>

            <input style={productinputs} type="text" placeholder="Add SKU Number"></input>

            { props.children }

        </div>

        <button onClick={() => props.setTrigger(false)} style={productsubmit}>Submit</button>
    </div>
  ) : ""
}

export default AddProduct