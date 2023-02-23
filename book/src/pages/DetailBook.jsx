import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllBooksDefault, getOneBook } from "../store/slices/bookSlice";
import "../styles/detailBook.scss";
import { RiVipCrownLine } from "react-icons/ri";
import { BsCoin } from "react-icons/bs";
import { MdOutlineLocalShipping, MdPlaylistAddCheck } from "react-icons/md";
import { addCart } from "../store/slices/cartSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import BookItem from "../components/BookItem/BookItem";
const DetailBook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const bookData = useSelector((state) => state.books.bookDetail);
  const allBookMayLike = useSelector(state => state.books.allBook)
  // setMayLike(allBookMayLike?.slice(0,6))
  console.log(allBookMayLike)
  React.useEffect(() => {
    const fetch = async () => {
     let ramdom =   Math.floor(Math.random() * 10);
     await  dispatch(getAllBooksDefault({ page:  +ramdom }));
    }
    fetch()
  }, [id]);
  useEffect(() => {
    const fetch = async () => {
      await dispatch(getOneBook(id));
    };
    fetch();
  }, [id]);
  const handleCart = () => {
    dispatch(addCart(bookData));
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
  return (
    <div className="book-detail">
      <section className="book-detail-img">
        <img src={bookData?.imageUrl} alt="" />
      </section>
      <section className="book-detail-info">
        <p className="book-detail-info-name">{bookData?.title}</p>
        <div className="book-detail-info-category">
          Category :
          <span style={{ color: "orange", marginLeft: 3, fontWeight: "bold" }}>
            {bookData?.cateCode?.value}
          </span>
        </div>
        <div className="book-detail-info-border"></div>
        <div>Paperback(Reprint)</div>
        <div className="book-detail-info-price">${bookData?.price}</div>
        <div className="book-detail-info-premium">
          <div>
            <RiVipCrownLine size={24} />
          </div>
          <div>
            {" "}
            Premium Members Get an Additional 10% Off.
            <span style={{ color: "#295A34", textDecoration: "underline" }}>
              Learn more
            </span>
          </div>
        </div>
        <button className="book-detail-info-add" onClick={handleCart}>
          ADD TO CART
        </button>
        <div className="book-detail-info-more">
          <span>
            <BsCoin size={18} />
          </span>
          <span>
            B&N Rewards Members earn 1 stamp for every $10 spent in a
            purchase!10 stamps = $5 reward
          </span>
        </div>
        <div className="book-detail-info-more">
          <span>
            <MdOutlineLocalShipping size={18} />
          </span>
          <span>
            Choose Expedited Shipping at checkout for delivery by Monday,
            February 27
          </span>
        </div>
      </section>
      <section className="book-detail-description">
        <div className="overview">Overview</div>
        <div className="content">
          <p className="content-seller-note">Notes From Your Bookseller</p>
          <p className="content-seller-note-content">
            Glamorous enough to enchant any reader, {bookData?.title} is a glimpse into the life of a Hollywood starlet better known
            for her romantic endeavors off the screen. At the heart of this
            scandalous novel is the bond between two lovers fated to keep their
            romance behind the scenes and the forces keeping them apart. Reid’s
            writing is worthy of a standing ovation.
          </p>

          <p>{bookData?.description}</p>
        </div>
      </section>
      <section className="more-like">
        <h1>You May Like</h1>
        <div className="list-like">
          {
            allBookMayLike?.bookData?.rows.slice(0,5).map(item => {
              return <BookItem data={item}/>
            })
          }
        </div>
      </section>
    </div>
  );
};

export default DetailBook;
