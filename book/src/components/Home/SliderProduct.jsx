import React from 'react'
import MiniSlider from './MiniSlider'
import {Link} from 'react-router-dom'
const SliderProduct = ({page,title}) => {
  return (
  <>
      <div className='one-get-one' style={{marginTop:'3rem'}}>
        <div className='one-get-one-title' style={{padding:'0 40px',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <p style={{fontSize:'1.2em',fontWeight:'bold',fontStyle:'italic'}}>{title}</p>
          <Link to='/api/books/all' style={{color:'black',textDecoration:'underline',flexShrink:0}}>See all</Link>
        </div>
        <MiniSlider page={page} />
      </div>
     
  </>
  )
}

export default SliderProduct