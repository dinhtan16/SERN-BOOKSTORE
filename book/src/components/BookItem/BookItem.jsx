import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../../store/slices/cartSlice";
import "../../styles/bookItem.scss";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
const BookItem = ({ data, right ,isLoading}) => {
  // console.log(data)
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <div className={`${rightt ? "item-top right" : "item-top"}`}>
        <Skeleton variant="rounded" width={250} height={300} />
      </div>
      <div className={`${rightt ? "item-bottom right" : "item-bottom"}`}>
        <div className="item-title" style={{ cursor: "pointer" }}>
          <div className="title">
            {" "}
          </div>
        </div>
        <div>
          <span>
            {" "}
          </span>
        </div>

        {/* <button ><Skeleton /></button> */}
        <div className="price">
          {" "}
          <Skeleton width={250}/>
        </div>
        <div className="available">
          <span>
            {" "}
            <Skeleton width={250}/>
          </span>
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
