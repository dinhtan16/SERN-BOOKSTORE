import React from 'react'
import { useSelector } from 'react-redux'
import Banner from '../components/Header/Banner'
import Hero from '../components/Home/Hero'
import MiniSlider from '../components/Home/MiniSlider'
import NextRead from '../components/Home/NextRead'
import SliderProduct from '../components/Home/SliderProduct'
import '../styles/home/home.scss'
import big1 from '../assets/imgs/hero/big1.jpg'
import big3 from '../assets/imgs/hero/big3.jpg'
import iconFooter from '../assets/imgs/footer.png'

import AboutUs from '../components/Home/AboutUs'

const Home = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    // <h4>home</h4>
   <div className='home-font'>
      {/* <Banner /> */}
      {/* <ModalSuccess/> */}
      <Hero />
      <SliderProduct page={3} title='Buy One, Get One 50% Off Thousands of Books'/>
      <div className='big-banner-1' style={{maxWidth:'1400px',display:'flex',marginTop:'3rem !important',margin:'3rem auto'}}>
        <img src={big1} alt="big" style={{width:'100%'}}/>
      </div>
      <NextRead />
      <SliderProduct page={12} title='B&N Top 100 Books'/>
      <SliderProduct page={9} title='Believe in a Thing'/>
      <SliderProduct page={16} title='Out of This World Sci-Fi and Fantasy'/>
      <div className='big-banner-1' style={{maxWidth:'1400px',display:'flex',marginTop:'3rem !important',margin:'3rem auto'}}>
        <img src={big3} alt="big" style={{width:'100%'}}/>
      </div>
      <AboutUs />

   </div>
  )
}

export default Home