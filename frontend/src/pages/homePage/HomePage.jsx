import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Scrollbar} from 'swiper/modules';
import axios from 'axios'
import 'swiper/css/bundle';

import { SecondNavBar } from '../../components/secondNavBar/SecondNavBar';
import { useLocation } from 'react-router-dom';


import {
  firstrow,
  profileinfo,
  welcomeStyle,
  nameStyle,
  companyStyle,
  gridheader,
  slider,
  slideCompany,
  slidecontent,
  slideCompanyInfo,

} from "./HomePageStyle"


const HomePage = () => {
  const location = useLocation();
  const userEmail = location.state?.email || '';
  const [userInfo, setUserInfo] = useState({userEmail: '', userName: '', userCompany: '' });

  useEffect(() => {
    axios
      .get('http://localhost:8000/users/getUserInfo', {
        params: {
          email: userEmail,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.error('Error registering user:', error);
        // Handle the error, e.g., show an error message to the user
      });
  }, [userEmail]);
  

  console.log("user info name",userInfo.name);

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

  

  //const userName = userInfo.length > 0 ? userInfo[0].name.toUpperCase() : "";
  const companyName = userInfo.length > 0 ? userInfo[0].company : "";

  const renderSlide = (slide, index) => {

    const slidestyle = {
      width: "200px",
      height: "230px",
      marginRight: "20px",

      backgroundColor: "rgba(238, 255, 232, 0.60)",
      borderRadius: "12px",
      border: "none",
      scrollSnapAlign: "start",
      transition: "all 0.2s",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.3)",
     };

    return(

        <SwiperSlide key = {index} style = {slidestyle}>
          <div style={slidecontent}>
            <h4 style={slideCompany} >{slide.company}</h4>
            <p style={slideCompanyInfo}>Name: {slide.name}</p>
            <p style={slideCompanyInfo}>Contact: {slide.contact}</p>
            <p style={slideCompanyInfo}>Address: {slide.address}</p>
          </div>
        </SwiperSlide>
      
    )
  }

  return (
    <div>

      <div>
        <SecondNavBar />
      </div>

      <div style={firstrow}>        

        <div style={profileinfo}>
          <h1 style={welcomeStyle} >WELCOME, {userInfo.userName}</h1>
        
        </div>

      </div>

        <div>
          <h3 style={gridheader}>Companies Involved: {userInfo.userCompany}</h3>
        </div>

        <div style={slider}>
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
    
  );
};

export default HomePage