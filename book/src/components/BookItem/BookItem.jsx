import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../../store/slices/cartSlice";
import "../../styles/bookItem.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";
const BookItem = ({ data, right }) => {
  // console.log(data)
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    // return () => {
    //   cleanup;
    // };
  }, []);
  const handleCart = () => {
    dispatch(addCart(data));
    toast.success("Added to Cart", {
      position: "bottom-center",
      autoClose: 300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return isLoading ? (
    <div className="item-book">
      {" "}
      <div className={`${right ? "item-top right" : "item-top"}`}>
        <Skeleton height={300}/>
      </div>
      <div className={`${right ? "item-bottom right" : "item-bottom"}`}>
        <div
          className="item-title"
          
          
          style={{ cursor: "pointer" }}
        >
          <div className="title">    <Skeleton /></div>
        </div>
        <div>
       
          <span >     <Skeleton /></span>
        </div>

        {/* <button ><Skeleton /></button> */}
        <div className="price"> <Skeleton /></div>
        <div className="available">
          <span>    <Skeleton /></span>
        </div>
      </div>
      
    </div>
  ) : (
    <div className="item-book">
      {" "}
      <div className={`${right ? "item-top right" : "item-top"}`}>
        <img src={data.imageUrl} alt="none" />
      </div>
      <div className={`${right ? "item-bottom right" : "item-bottom"}`}>
        <div
          className="item-title"
          title={data.title}
          onClick={() => navigate(`/detail/${data.id}`)}
          style={{ cursor: "pointer" }}
        >
          <div className="title">{data.title}</div>
        </div>
        <div>
          Categories :
          <span style={{ color: "lightcoral" }}> {data?.cateCode?.value}</span>
        </div>

        <button onClick={handleCart}>Quick Add</button>
        <div className="price">{data.price}$</div>
        <div className="available">
          Item left : <span style={{ color: "orange" }}>{data.available}</span>
        </div>
      </div>
      
    </div>
  );
};

export default memo(BookItem);
