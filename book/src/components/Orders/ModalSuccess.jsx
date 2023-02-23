import React from "react";
import "../../styles/modal.scss";
import success from "../../assets/imgs/check.png";
import { SlClose } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOpenModal } from "../../store/slices/modalOpen";

const ModalSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleContinue = () => {
    dispatch(setOpenModal(false));
    navigate("/api/books/all");
  };
  const handleFollow = () => {
    dispatch(setOpenModal(false));

    navigate("/your-order");
  };
  return (
    <div className="modal-order">
      <div className="modal-order-content">
        <img src={success} alt="" />
        <div>
          <h4>Congratulations</h4>
          <p>Your Order is successfully</p>
        </div>
        <div className="what-next">
          <div className="tit">What's next?</div>
          <p>
            Your order will be notify to our warehouse and will be delivery to
            you{" "}
            <span style={{ color: "#25248F", fontWeight: "normal" }}>
              from 2 to 4 days
            </span>
            .Please follow your order in <span>Your Order</span> to follow your
            order.
          </p>
          <div className="order-info-btn">
            <button onClick={handleFollow}>Follow Your Order</button>
            <p>
              or{" "}
              <span
                style={{
                  color: "#2E2D93",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={handleContinue}
              >
                Continue Shopping
              </span>
            </p>
          </div>
        </div>
        <div className="close-modal" onClick={() => dispatch(setOpenModal(false))}>
          <SlClose size={24} />
        </div>
      </div>
    </div>
  );
};

export default ModalSuccess;
