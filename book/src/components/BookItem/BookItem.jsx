import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCart } from '../../store/slices/cartSlice'
import '../../styles/bookItem.scss'
const BookItem = ({data}) => {
    // console.log(data)
    const dispatch=useDispatch()
  return (
    <div className='item-book'>
        <div className='item-top'>
            <img src={data.imageUrl} alt="none" />
        </div>
        <div className='item-bottom'>
        <div className='item-title' title={data.title}>
            <div className='title'>{data.title}</div>

        </div>
        <div>Categories :<span style={{color:'lightcoral'}}> {data?.cateCode?.value}</span></div>

            <button onClick={() => dispatch(addCart(data))}>Buy Now</button>
                <div className='price'>{data.price}$</div>
                <div className='available'>Item left : <span style={{color:'orange'}}>{data.available}</span></div>
        </div>
    </div>
  )
}

export default memo(BookItem)