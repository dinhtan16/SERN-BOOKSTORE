import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/Cart/CartItem";
import { Input } from "antd";
import "../styles/order.scss";
import { useNavigate } from "react-router-dom";
import { createCart } from "../services/cart";
import { setEmpty } from "../store/slices/cartSlice";
import ModalSuccess from "../components/Orders/ModalSuccess";
import { setOpenModal } from "../store/slices/modalOpen";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totals);
  const userInfo = useSelector((state) => state.user.currentUser);
  const isOpenModal = useSelector(state => state.modal.isOpenModal)

  let total = +totalAmount
  let number = 13.2
  console.log( +(total + number).toFixed(2))

  const bookId = cartItems?.map((item) => item.id);
  const bookIdList = bookId?.join(",");
  // console.log(cartItems)


  const handleSubmitCart = async () => {
    try {
      const res = await createCart({
        ...cartItems,
        userId: userInfo.id,
        totalPrice: +totalAmount,
        totalQuantity: cartItems.length,
        bookId: bookIdList,
      });
      if(res?.status === 200){
        //TODO: toast,dispatch empty cart, clear storage. 
        dispatch(setEmpty())
        localStorage.removeItem('total')
        localStorage.removeItem('Cart')
        dispatch(setOpenModal(true))
        
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
     {  isOpenModal && <ModalSuccess/> }
      <div className="order-info">
        <section className="delivery">
          <div className="title">
            <span style={{ fontWeight: "bold" }}>Delivery Information.</span> You
            can Edit in{" "}
            <span
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => navigate("/user-info")}
            >
              Your information
            </span>
          </div>
          <div className="delivery-info">
            <div className="name">
              <label> Name</label>
              <Input
                type="text"
                readOnly
                value={userInfo?.name}
                className="input"
              />
            </div>
            <div className="phone">
              <label>Phone</label>
              <Input
                type="text"
                readOnly
                value={userInfo?.phone}
                className="input"
              />
            </div>
            <div className="address">
              <label> Address</label>
              <Input
                type="text"
                readOnly
                value={userInfo?.address}
                className="input"
              />
            </div>
            <div className="email">
              <label> Email</label>
              <Input
                type="text"
                readOnly
                value={userInfo?.email}
                className="input"
              />
            </div>
          </div>
          <div className="payment">
            <div>
              <span style={{ fontWeight: "bold" }}>Payment Method</span>
            </div>
            <div className="payment-info">
              <div>
                <Input type="checkbox" checked />
                <span> Cash On Delivery </span>
              </div>
              <div>
                <Input type="checkbox" disabled />
                <span> Online Payment </span>
              </div>
            </div>
          </div>
        </section>
        <section className="order">
          <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
            Order Summary
          </div>
          <div className="order-detail">
            {cartItems &&
              cartItems?.map((item) => {
                return <CartItem key={item.id} data={item} />;
              })}
            <div className="total">
              <div className="total-detail" id="border">
                <span>SubTotal</span> {+totalAmount}${" "}
              </div>
              <div className="total-detail" style={{ padding: "10px" }}>
                <span>Shipping</span> 13.2${" "}
              </div>
              <div className="total-detail" id="border">
                <span>Total (USD)</span> {`${+(total + number).toFixed(2)}`}${" "}
              </div>
            </div>
            <div className="order-btn">
              <button onClick={handleSubmitCart}>Confirm Order</button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Cart;
