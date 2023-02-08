import React, { memo } from 'react'
import '../../styles/bookItem.scss'
const BookItem = ({data}) => {
    // console.log(data)
  return (
    <div className='item-book'>
        <div className='item-top'>
            <img src={data.imageUrl} alt="none" />
        </div>
        <div className='item-title'>
            <div className='title'>{data.title}</div>

        </div>
        <div className='item-bottom'>
        <div>Categories :<span style={{color:'lightcoral'}}> {data?.cateCode?.value}</span></div>

            <button>Buy Now</button>
                <div className='price'>{data.price}$</div>
                <div className='available'>Item left : <span style={{color:'orange'}}>{data.available}</span></div>
        </div>
    </div>
  )
}

export default memo(BookItem)