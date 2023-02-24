import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { addCart } from '../../store/slices/cartSlice'
import '../../styles/bookItem.scss'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const BookItem = ({data}) => {
    // console.log(data)
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const handleCart = () =>  {
        dispatch(addCart(data))
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
    <div className='item-book'>
        <div className='item-top' onClick={() => navigate(`/detail/${data.id}`)} style={{cursor:'pointer'}}>
            <img src={data.imageUrl} alt="none" />
        </div>
        <div className='item-bottom'>
        

            <button onClick={handleCart}>Quick Add</button>
        </div>
    </div>
  )
}

export default memo(BookItem)