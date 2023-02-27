import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import '../styles/swiper_comp.scss'
import {  Navigation, Autoplay } from "swiper";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';

import { addCart } from '../store/slices/cartSlice';
import {toast} from 'react-toastify'
const SwiperComponent = ({data}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleCart = (item) =>  {
    // console.log(item)
    dispatch(addCart(item))
    toast.success('Added to Cart', {
        position: "bottom-center",
        autoClose: 300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
}
  return (
    <Swiper
            spaceBetween={20}
            navigation={true}
            // slidesPerView='auto'
            
            // slidesPerColumn={2}
            slidesOffsetAfter={0}
            slidesPerGroup ={1}
            loopFillGroupWithBlank={false}
            grabCursor={true}
            breakpoints={{
                400: {
                    slidesPerView: 2 ,
                  },
                // when window width is >= 640px
                640: {
                  slidesPerView: 3,
                },
                // when window width is >= 768px
                768: {
                  slidesPerView: 4,
                },
                1024: {
                  slidesPerView: 6,
                },
              }}
            // autoplay={{ delay: 3000 }}
            modules={[ Navigation, Autoplay]}
            className="mySwiper"
            id="swiper-cate-comp"
          >
            { 
            !data ?  
            <div  id='slide-cate-comp' style={{display:'flex'}}>
              {
                <div style={{display:'flex',gap:'1em'}}>
                {  [1,2,3,4,5].map(item =>
                <div style={{display:'flex',flexDirection:'column',gap:'1em'}}>
                      <Skeleton variant="rounded" width={210} height={200}/>
                    <Skeleton variant="rounded" width={210} height={20}/>
                </div>
                    )}
                </div>
              }
          </div>
           :
            data?.map((item,i) => {
              return (
                <SwiperSlide key={item.id} id='slide-cate-comp'>
                  <img src={item.imageUrl} alt="hero" className="img-slide" onClick={() => navigate(`/detail/${item.id}`)}/>
                  {item?.name}
                  <button className='btn-slider-add-cart' onClick={() => handleCart(item)}><span>QUICK ADD</span></button>
                </SwiperSlide>
              );
            })}
          </Swiper>
  )
}

export default SwiperComponent