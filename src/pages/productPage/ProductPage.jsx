import React from 'react'
import SecondNavBar from '../../components/secondNavBar/SecondNavBar'
import { useState, useEffect } from 'react'
import { AiFillPlusCircle } from "react-icons/ai"
import { Swiper, SwiperSlide } from 'swiper/react';
import {Scrollbar} from 'swiper/modules';

import GridLoader from "react-spinners/GridLoader";
import backgroundImage from '../../asserts/ProductBackground.png';

import 'swiper/css/bundle';
import AddProduct from '../../components/addProduct/AddProduct';

import {
  productslider,
  productheader,
  productcompany,
  productstyle,
  h1product,
  pproduct,
  imgproduct,
  imgBarcodeStyle,
  imgContainerStyle,
  barcodeContainerStyle,
  deleteButtonStyle,
  loadingStyle

} from "./ProductPageStyle"

const ProductPage = () => {

  // LOADING FUNCTIONALITY
  const [loading, setLoading] = useState(false)

  //API CALL HERE: Replace SetTimeOut to fetching of data
  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
    }, 1000);

  }, []);

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
      <>
      {loading ? (
        <div style={loadingStyle}>
          <GridLoader 
          color={"#3A3A3A"} 
          loading={loading} 
          size={20} />
        </div>
      ) : (
        <div
        style={{
          backgroundImage: `url(${backgroundImage})`, // Set the background image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh', 
        }}>
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
        </div>
      )}
    </>
  );
};


export default ProductPage