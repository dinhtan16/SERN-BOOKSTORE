import React from 'react'
import '../styles/home/hero.scss'
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {  Navigation, Autoplay } from "swiper";
const SwiperComponent = ({data}) => {
  return (
    <Swiper
            spaceBetween={10}
            navigation={true}
            slidesPerView={5}
            // slidesPerColumn={2}
            slidesOffsetAfter={0}
            slidesPerGroup ={1}
            loopFillGroupWithBlank={false}
            grabCursor={true}
            breakpoints={{
                400: {
                    slidesPerView: 2,
                  },
                // when window width is >= 640px
                640: {
                  slidesPerView: 3,
                },
                // when window width is >= 768px
                768: {
                  slidesPerView: 5,
                },
              }}
            // autoplay={{ delay: 3000 }}
            modules={[ Navigation, Autoplay]}
            className="mySwiper"
            id="swiper-cate"
          >
            {data?.map((item) => {
              return (
                <SwiperSlide key={item.id} id='slide-cate'>
                  {/* <img src={item.path} alt="hero" className="img-slide" /> */}
                  {item?.name}
                  <span style={{fontSize:'0.7em'}}>{item.name}</span>
                </SwiperSlide>
              );
            })}
          </Swiper>
  )
}

export default SwiperComponent