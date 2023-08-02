import React from 'react'
import SecondNavBar from '../../components/secondNavBar/SecondNavBar'
import { useState } from 'react'
import { AiFillPlusCircle } from "react-icons/ai"
import { Swiper, SwiperSlide } from 'swiper/react';
import {Scrollbar} from 'swiper/modules';

import 'swiper/css/bundle';
import AddProduct from '../../components/addProduct/AddProduct';

const ProductPage = () => {

    const productslider = {
        marginLeft: "150px",
        marginRight: "150px",

        marginTop: "40px",
    }

    const productheader = {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",

        marginLeft: "40%", //not a permeanant solution. texts of different sizes may enter.
        marginRight: "15%",
    }

    const productcompany = {
        color: "#418EFF",
        fontFamily: "Inter",
        fontSize: "25px",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "normal",
    }

    let productInfo = [
        { 
            image: require("../../asserts/whitefabric.png" ),
            header: "White Silk Fabric",
            description: "Product Description",
            measurement: "Unit of Measurement",
            cost: "Product Cost",
            quantity: "Minimum Quantity",

            barcode: require("../../asserts/barcode.png" ),
            sku: "124284928491497"
        },

        { 
            image: require("../../asserts/whitefabric.png" ),
            header: "White Silk Fabric",
            description: "Product Description",
            measurement: "Unit of Measurement",
            cost: "Product Cost",
            quantity: "Minimum Quantity",

            barcode: require("../../asserts/barcode.png" ),
            sku: "124284928491497"
        },

        { 
            image: require("../../asserts/whitefabric.png" ),
            header: "White Silk Fabric",
            description: "Product Description",
            measurement: "Unit of Measurement",
            cost: "Product Cost",
            quantity: "Minimum Quantity",

            barcode: require("../../asserts/barcode.png" ),
            sku: "124284928491497"
        },

        { 
            image: require("../../asserts/whitefabric.png" ),
            header: "White Silk Fabric",
            description: "Product Description",
            measurement: "Unit of Measurement",
            cost: "Product Cost",
            quantity: "Minimum Quantity",

            barcode: require("../../asserts/barcode.png" ),
            sku: "124284928491497"
        },

        { 
            image: require("../../asserts/whitefabric.png" ),
            header: "White Silk Fabric",
            description: "Product Description",
            measurement: "Unit of Measurement",
            cost: "Product Cost",
            quantity: "Minimum Quantity",

            barcode: require("../../asserts/barcode.png" ),
            sku: "124284928491497"
        },
      ]

      const productSlide = (product, index) => {

        const productstyle = {
          width: "120px",
          height: "450px",
          marginRight: "30px",
          marginLeft: "30px",
          textAlign: "center",
    
          backgroundColor: "rgba(65, 142, 255, 0.10)",
          borderRadius: "12px",
          border: "none",
          scrollSnapAlign: "start",
          transition: "all 0.2s",
          boxShadow: "-2px 4px 30px 0px rgba(0, 0, 0, 0.25)",
          

          borderRadius: "12px",
          background: "linear-gradient(180deg, rgba(243, 243, 243, 0.70) 0%, rgba(218, 213, 219, 0.00) 100%)",
          shadow: ""
         };

         const h1product = {
            color: "#535353",
            fontFamily: "Inter",
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "normal",
        }

        const pproduct = {
            color: "#000",
            fontFamily: "Inter",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight:"normal",
        }

        const imgproduct = {

            margin: "30px",
        }
        
    
        return(
    
            <SwiperSlide key = {index} style = {productstyle}>
              <div>
                <img style={imgproduct} src={product.image} alt="Error"></img>
                <h1 style={h1product}>{product.header}</h1>
                <p style={pproduct}>{product.description}</p>
                <p style={pproduct}>{product.measurement}</p>
                <p style={pproduct}>{product.cost}</p>
                <p style={pproduct}>{product.quantity}</p>
                <img src={product.barcode} alt="Error"></img>
                <p style={pproduct}>{product.sku}</p>
              </div>
            </SwiperSlide>
        )
      }

      const pluscirclestyle = {
        background: "transparent",
        border: "none",
        marginLeft: "300px",
    }

    const productpopupstyle = {
        zIndex: "2",
      }

    const [addPopUp, setAddPopUp] = useState(false);

  return (
    <div>
        <SecondNavBar />

        <div style = {productheader}>
            <h1 style={productcompany}>Textile Centre Fabric</h1>

            <button style={pluscirclestyle} onClick={ () => setAddPopUp(true)}>
            < AiFillPlusCircle color="#418EFF" size="50px"/>
            </button>

            <div style={productpopupstyle}>
            <AddProduct trigger={addPopUp} setTrigger={setAddPopUp}>
            </AddProduct>
          </div>

        </div>

        <div style={productslider}>
          <Swiper
          modules={[Scrollbar]}
          spaceBetween={50}
          slidesPerView={4}
          scrollbar={{draggable: true }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}>
          
          {productInfo.map(productSlide)}

          </Swiper>
        </div>

    </div>
  )
}

export default ProductPage