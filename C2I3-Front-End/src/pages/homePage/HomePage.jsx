import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Scrollbar} from 'swiper/modules';

import './homePage.css';

import 'swiper/css/bundle';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

import { SecondNavBar } from '../../components/secondNavBar/SecondNavBar';

const HomePage = () => {

  // Requires fetching from Database
  let slideInfo = [
    { company: "OATSIDE", 
      name: "Tan Min Yi", 
      contact: "+65 9876 5432", 
      address: "Blk 123 Ang Mo Kio Ave 2 #12-34 S(567890)" },

    { company: "MUJI", 
      name: "Renee Ki Meiee", 
      contact: "+65 8667 5643", 
      address: "Blk 12 Seng Kang Street #01-39 S(125640)" },

    { company: "COTTON ON", 
      name: "Swee Heng Sean", 
      contact: "+65 9007 2345", 
      address: "12 Toa Payoh Road #03-67 S(987654)" },

    { company: "POPULAR",
      name: "Rebecca Chan",
      contact: "+65 8456 3401",
      address: "blk 67 Paya Lebar SingPost"}
  ]

  const renderSlide = (slide, index) => {

    const slidestyle = {
      width: "200px",
      height: "230px",
      marginRight: "20px",

      backgroundColor: "rgba(65, 142, 255, 0.10)",
      borderRadius: "12px",
      border: "none",
      scrollSnapAlign: "start",
      transition: "all 0.2s",
     };

    return(

        <SwiperSlide key = {index} style = {slidestyle}>
          <div className="slidecontent">
            <h4>{slide.company}</h4>
            <p>Name: {slide.name}</p>
            <p>Contact: {slide.contact}</p>
            <p>Address: {slide.address}</p>
          </div>
        </SwiperSlide>
      
    )
  }

  const profilepic = {
    borderRadius: "50%", 
    border: "10px solid #F3F3F3",
    height: "180px",
    weight: "180px",
  };

  return (
    <div>

      <div>
        <SecondNavBar />
      </div>

      <div className = "firstrow">
        <img style={profilepic} 
        src= {require("../../asserts/ProfilePicture.png" )}
        alt="ProfilePicture"/>
        

        <div className = "profileinfo">
          <h1>Welcome,</h1>
          <h2>Matthew Swee Jing Kai !</h2>
          <p>Textile Fabric Centre</p>
        </div>
      </div>

        <div className ="gridheader">
          <h3>Companies Involved:</h3>
        </div>

        <div className="slider">
          <Swiper
          modules={[Scrollbar]}
          spaceBetween={50}
          slidesPerView={3}
          scrollbar={{draggable: true }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          >
          
          {slideInfo.map(renderSlide)}

          </Swiper>
        </div>

    </div>
    
  )
}

export default HomePage