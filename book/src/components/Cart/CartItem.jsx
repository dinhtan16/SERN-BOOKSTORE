import React from "react";
import { memo } from "react";
import {HiPlusSm,HiMinusSm} from 'react-icons/hi'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCart, deleteCart } from "../../store/slices/cartSlice";
import '../../styles/cartItem.scss'
const CartItem = ({ data }) => {
//   console.log(data);
const dispatch = useDispatch()
const navigate = useNavigate()
  return (
    <div className="cart-item">
      <section className="cart-item-left">
        <div  className="cart-item-left-img">
            <img src={data?.imageUrl} alt="" />
        </div>
        <div  className="cart-item-left-info">
            <p title={data?.title} style={{cursor:'pointer'}} onClick={() => navigate(`/detail/${data.id}`)}>{data?.title}</p>
            <p>{data?.cateCode?.value}</p>
            <p>{data?.price}$</p>

        </div>
      </section>
      <section  className="cart-item-right">
            <HiMinusSm  size={24}  onClick={() => dispatch(deleteCart(data))}/>
            <span>{data?.quantity}</span>
            <HiPlusSm size={24} onClick={() => dispatch(addCart(data))}/>
      </section>
    </div>
  );
};

export default memo(CartItem);
