import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import DocumentType from '../../components/documentType/DocumentType';
import SecondNavBar from '../../components/secondNavBar/SecondNavBar';
import { Navigation } from 'swiper/modules';

const EditDocumentPage = () => {

    let allInfo = [
        {image: require("../../asserts/ProfilePicture.png" ),
        scanned: "Profile Picture"},

        {image: require("../../asserts/LogOut.png" ),
        scanned: "Log Out"},

        {image: require("../../asserts/superhero.png" ),
        scanned: "SuperHero"},
    ]

    const renderSlidePair = (slidePair, index) => {
        return (
          <SwiperSlide key={`slide_pair_${index}`} style={slidePairContainerStyle}>
            <div style={imageContainerStyle}>
              <img src={slidePair.image} alt={`Image ${index}`} />
            </div>
            <div className="slidecontent" style={textContainerStyle}>
              <h4>{slidePair.scanned}</h4>
            </div>
          </SwiperSlide>
        );
      };
    
      const slidePairContainerStyle = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      };
    
      const imageContainerStyle = {
        flex: 1,
        display: "flex",
        justifyContent: "center",
    
        background: "#F3F3F3"
      };
    
      const textContainerStyle = {
        flex: 1,
        display: "flex",
        justifyContent: "center",
      };
      

  return (
    <div>

        <div>
            <SecondNavBar />
            <DocumentType />
        </div> 

        <Swiper
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={true}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {allInfo.map((slidePair, index) => renderSlidePair(slidePair, index))}
        </Swiper>

    </div>
  );
};

export default EditDocumentPage;