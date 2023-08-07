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

        marginTop: "10px",
        marginLeft: "40%", //not a permeanant solution. texts of different sizes may enter.
        marginRight: "15%",
    }

    const productcompany = {
        color: "#6D479E",
        fontFamily: "Inter",
        fontSize: "25px",
        fontStyle: "normal",
        fontWeight: "800",
        lineHeight: "normal",
        whiteSpace: "nowrap"
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
            sku: "124284928491491"
        },

        { 
            image: require("../../asserts/whitefabric.png" ),
            header: "White Silk Fabric",
            description: "Product Description",
            measurement: "Unit of Measurement",
            cost: "Product Cost",
            quantity: "Minimum Quantity",

            barcode: require("../../asserts/barcode.png" ),
            sku: "124284928491492"
        },

        { 
            image: require("../../asserts/whitefabric.png" ),
            header: "White Silk Fabric",
            description: "Product Description",
            measurement: "Unit of Measurement",
            cost: "Product Cost",
            quantity: "Minimum Quantity",

            barcode: require("../../asserts/barcode.png" ),
            sku: "124284928491493"
        },

        { 
            image: require("../../asserts/whitefabric.png" ),
            header: "White Silk Fabric",
            description: "Product Description",
            measurement: "Unit of Measurement",
            cost: "Product Cost",
            quantity: "Minimum Quantity",

            barcode: require("../../asserts/barcode.png" ),
            sku: "124284928491494"
        },

        { 
            image: require("../../asserts/whitefabric.png" ),
            header: "White Silk Fabric",
            description: "Product Description",
            measurement: "Unit of Measurement",
            cost: "Product Cost",
            quantity: "Minimum Quantity",

            barcode: require("../../asserts/barcode.png" ),
            sku: "124284928491495"
        },

        { 
            image: require("../../asserts/whitefabric.png" ),
            header: "White Silk Fabric",
            description: "Product Description",
            measurement: "Unit of Measurement",
            cost: "Product Cost",
            quantity: "Minimum Quantity",

            barcode: require("../../asserts/barcode.png" ),
            sku: "124284928491496"
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
          boxShadow: "0 5px 5px rgba(0, 0, 0, 0.4)",
          

          borderRadius: "12px",
          background: "linear-gradient(180deg, rgba(243, 243, 243, 0.70) 0%, rgba(242, 232, 255, 0.00) 100%)",
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
          objectFit: "cover",
          marginTop: "20px",
        }

        const imgBarcodeStyle = {
          maxWidth: "80%",
          objectFit: "cover",
          marginBottom: "20px",
        }
        
        const imgContainerStyle = {
          width: "100%",
          height: "100px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
        };

        const barcodeContainerStyle = {
          width: "100px",
          height: "100px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
        };

        const deleteButtonStyle = {
          color: "#3A3A3A",
          border: "None",
          borderRadius: "5px",
          fontSize: "14px",
          background: "#F2E8FF",

        };

        // delete product card
        const handleDeleteProduct = (sku) => {
          const updatedProducts = products.filter((product) => product.sku !== sku);
          setProducts(updatedProducts);
          
        };
    
        return(
    
            <SwiperSlide key = {index} style = {productstyle}>
              <div>
                <div style={imgContainerStyle}>
                  <img style={imgproduct} src={product.image} alt="Error" />
                </div>
                <h1 style={h1product}>{product.header}</h1>
                <p style={pproduct}>{product.description}</p>
                <p style={pproduct}>{product.measurement}</p>
                <p style={pproduct}>{product.cost}</p>
                <p style={pproduct}>{product.quantity}</p>
                <div style={barcodeContainerStyle}>
                  <img style={imgBarcodeStyle} src={product.barcode} alt="Error" />
                </div>
                <p style={pproduct}>{product.sku}</p>
                <button style={deleteButtonStyle} onClick={() => handleDeleteProduct(product.sku)}>Delete</button>
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

    // ADDING OF NEW CARD
    const [products, setProducts] = useState(productInfo);

    const handleAddProduct = (newProduct) => {
      setProducts([...products, newProduct]);
    };
    // END of ADDING OF NEW CARD


  return (
    <div>
        <SecondNavBar />

        <div style = {productheader}>
            <h1 style={productcompany}>TEXTILE FABRIC CENTER</h1>

            <button style={pluscirclestyle} onClick={ () => setAddPopUp(true)}>
            < AiFillPlusCircle color="#6D479E" size="50px"/>
            </button>

            <div style={productpopupstyle}>
              <AddProduct trigger={addPopUp} setTrigger={setAddPopUp} onAddProduct={handleAddProduct}>
              </AddProduct>
            </div>

        </div>

        <div style={productslider}>
          {/* <Swiper
          modules={[Scrollbar]}
          spaceBetween={50}
          slidesPerView={4}
          scrollbar={{draggable: true }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}>
          
          {products.map((product, index) => productSlide(product, index))}

          </Swiper> */}

          {products.length > 0 ? (
            <Swiper
              modules={[Scrollbar]}
              spaceBetween={50}
              slidesPerView={4}
              scrollbar={{ draggable: true }}
              // onSlideChange={() => console.log('slide change')}
              // onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={(swiper) => console.log('Slide changed. Current slide index:', swiper.activeIndex)}
              onSwiper={(swiper) => console.log('Swiper instance:', swiper)}
            >
              {products.map((product) => productSlide(product))}
            </Swiper>
          ) : (
            <p>No products available.</p>
          )}
        </div>

    </div>
  )
}

export default ProductPage