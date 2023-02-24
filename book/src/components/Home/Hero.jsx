import React from "react";
import "../../styles/home/hero.scss";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper";

import { RiNumbersFill } from "react-icons/ri";
import { RxMoon } from "react-icons/rx";
import { GiBookshelf,GiArchiveResearch } from "react-icons/gi";
import { BiCut } from "react-icons/bi";
import { BsPencilFill } from "react-icons/bs";
import {
  FaHeadphonesAlt,
  FaSnapchatGhost,
  FaFantasyFlightGames,
} from "react-icons/fa";
import { HiGiftTop, HiOutlineDevicePhoneMobile } from "react-icons/hi2";

import hero1 from "../../assets/imgs/hero/hero1.jpg";
import hero2 from "../../assets/imgs/hero/hero2.jpg";
import hero3 from "../../assets/imgs/hero/hero3.jpg";
import hero4 from "../../assets/imgs/hero/hero4.jpg";
import hero5 from "../../assets/imgs/hero/hero5.jpg";

const imgs = [
  {
    id: 1,
    path: hero1,
  },
  {
    id: 2,
    path: hero2,
  },
  {
    id: 3,
    path: hero3,
  },
  {
    id: 4,
    path: hero4,
  },
  {
    id: 5,
    path: hero5,
  },
];
const gridSlides = [
  {
    id: 1,
    icon: <RiNumbersFill  size={56}/>,
    name:'BEST SELLERS'
  },
  {
    id: 2,
    icon: <RxMoon size={56} />,
    name:'COMMING SOON'
  },
  {
    id: 3,
    icon: <GiBookshelf  size={56}/>,
    name:'NEW RELEASE'
  },
  {
    id: 4,
    icon: <BsPencilFill  size={56}/>,
    name:'SIGNED EDITION'
  },
  {
    id: 5,
    icon: <FaHeadphonesAlt  size={56}/>,
    name:'AUDIOBOOKS'
  },
  {
    id: 6,
    icon: <BiCut  size={56}/>,
    name:'COUPON AND DEALS'
  },
  {
    id: 7,
    icon: <HiGiftTop  size={56}/>,
    name:'GIFT CARDS'
  },
  {
    id: 8,
    icon: <HiOutlineDevicePhoneMobile  size={56}/>,
    name:'B&N APPS'
  },
  {
    id: 9,
    icon: <GiArchiveResearch  size={56}/>,
    name:'MYSTERY & CRIME'
  },
  {
    id: 10,
    icon: <FaSnapchatGhost  size={56}/>,
    name:'HORROR'
  },
  {
    id: 11,
    icon: <FaFantasyFlightGames  size={56}/>,
    name:'SCI & FANTASY'
  },

];
const Hero = () => {
  return (
    <div className="hero-container">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{ delay: 3000 }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        {imgs.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <img src={item.path} alt="hero" className="img-slide" />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <section className="hero-des">
        FIND YOUR PLACE AT B&N'S ONLINE BOOKSTORE Over 5 million books ready to
        ship, 3.6 million eBooks and 300,000 audiobooks to download right now!
        Curbside pickup available in most stores!
      </section>
      <section className="category-slider">
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
              200: {
                slidesPerView: 1,
              },
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
            {gridSlides.map((item) => {
              return (
                <SwiperSlide key={item.id} id='slide-cate'>
                  {/* <img src={item.path} alt="hero" className="img-slide" /> */}
                  {item.icon}
                  <span style={{fontSize:'0.7em'}}>{item.name}</span>
                </SwiperSlide>
              );
            })}
          </Swiper>
      </section>

    </div>
  );
};

export default Hero;
