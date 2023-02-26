import React, { useState } from "react";
// import {
//   MDBContainer,
//   MDBNavbar,
//   MDBNavbarBrand,
//   MDBNavbarToggler,
//   MDBIcon,
//   MDBNavbarNav,
//   MDBNavbarItem,
//   MDBNavbarLink,
//   MDBDropdown,
//   MDBDropdownToggle,
//   MDBDropdownMenu,
//   MDBDropdownItem,
//   MDBCollapse,
// } from "mdb-react-ui-kit";
import "../styles/navigate.scss";
import logo from "../assets/imgs/logo.svg";
import { toast } from "react-toastify";

import { AiOutlineMenu } from "react-icons/ai";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { VscPackage } from "react-icons/vsc";
import { BiUser } from "react-icons/bi";
import { MdAdminPanelSettings } from "react-icons/md";

import { Modal } from "antd";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect } from "react";
import { searchBooks } from "../services/books";
import useDebounce from "./hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { setLogOut } from "../store/slices/authSlice";
import { setLogOutCurrentUser } from "../store/slices/userSlice";
import { adminCheck } from "../services/AdminCheck";
import { Input } from "antd";
import ListNavbar from "./Header/ListNavbar";
export default function Navigate() {
  const currentUser = useSelector((state) => state.user.currentUser);
  // console.log(currentUser?.roleData.code)
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [searchData, setSearchData] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogged = useSelector((state) => state.auth.isLoggedIn);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const orderInfo = useSelector((state) => state.order?.userOrders);

  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [searchParams,setSearchParams] = useSearchParams()
  // const page = searchParams.get('page')
  const debounce = useDebounce(searchInput, 300);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsLoading(true);
    let delay;
    const fetch = async () => {
      const res = await searchBooks({ name: debounce });
      setSearchData(res?.data?.bookData?.rows);

      delay = setTimeout(() => {
        setIsLoading(false);
        // console.log(123)
      }, 1000);
    };
    fetch();

    return () => {
      delay && clearTimeout(delay);
    };
  }, [debounce]);
  const handleChange = (e) => {
    // console.log(e.target.value)
    setSearchInput(e.target.value);
  };

  const handleLogout = () => {
    dispatch(setLogOut());
    dispatch(setLogOutCurrentUser());
    navigate("/login");
  };
  const handleAdmin = async () => {
    try {
      const res = await adminCheck();
      if (res.status === 200) {
        navigate("/admin");
      }
    } catch (err) {
      toast.error("Required Admin!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(err);
    }
  };

  //sticky nav
  const [stickyClass, setStickyClass] = useState('relative');

  useEffect(() => {
    window.addEventListener('scroll', stickNavbar);

    return () => {
      window.removeEventListener('scroll', stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 60 ? setStickyClass('sticky-nav') : setStickyClass('relative');
    }
  };
  return (
    <div className={`headers ${stickyClass}`}>
      <div style={{display:'flex',gap:"1em",padding:10,userSelect:'none'}} className='top-header'>
        <span>Stores & Events</span> <span>|</span>{" "}
        <span>Blog & Podcast</span> <span>| </span>
        <span>Membership</span> <span>| </span>
        <span>Coupons & Deals</span><span>|</span>
        <span>Bestsellers</span> |<span>Gift Cards</span>
      </div>
      <div className="headers-navbar">
        <div className="navbar-brand">
          <span
            class="menu-mobile"
            onClick={() => setIsMobile((prev) => !prev)}
          >
            <AiOutlineMenu size={24} />
          </span>
          <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <img src={logo} alt="" />
          </span>
        </div>
        <div className="navbar-search">
          <Input
            onClick={showModal}
            className="input-search"
            placeholder="Search book"
          ></Input>
          <Modal
            style={{ zIndex: 99999 }}
            title="Search Book"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <form className="d-flex input-group w-auto" method="POST">
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                onChange={handleChange}
                name="name"
                placeholder="Type to search"
                aria-label="Search"
              />
              {/* <MDBBtn color='primary' type='submit'>Search</MDBBtn> */}
            </form>
            <div className="data-search">
              {isLoading ? (
                <>
                  {[1, 2, 3].map((item, i) => (
                    <div className="item-render-mt" key={i}>
                      <div className="item-render-left">
                        <Skeleton circle width={80} height={80} count={1} />
                        <div className="left-column">
                          {" "}
                          <Skeleton width={150} count={1} />
                          <div>
                            {" "}
                            <Skeleton width={150} count={1} />
                          </div>
                        </div>
                      </div>
                      <div className="item-render-right">
                        {" "}
                        <Skeleton count={1} width={30} />
                      </div>
                    </div>
                  ))}
                </>
              ) : searchData?.length > 1 ? (
                searchData?.map((item) => {
                  return (
                    <div key={item.id} className="item-render">
                      <div className="item-render-left">
                        <img src={item.imageUrl} alt="none" />
                        <div className="left-column" title={item.title}>
                          <Link
                            to={`/detail/${item.id}`}
                            onClick={() => setIsModalOpen(false)}
                            title={item.title}
                          >
                            {item.title}
                          </Link>
                          <div>{item.cateCode.value}</div>
                        </div>
                      </div>
                      <div className="item-render-right">{item.price}$</div>
                    </div>
                  );
                })
              ) : (
                <div> not found, please type again</div>
              )}
            </div>
          </Modal>
        </div>
        <div className="navbar-account">
          {
            <div
              className={`${
                isDropdown ? "user-welcome active" : "user-welcome"
              }`}
              onClick={() => setIsDropdown((prev) => !prev)}
            >
              <div className="user-welcome-right">
              {currentUser?.avatar ? <img src={currentUser?.avatar} alt="Your account" /> : <img src='https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg' alt="Your account" />}  
                <span> {currentUser?.name}</span>
              </div>
              <div
                className={`${cartItems.length > 0 ? "notify" : "none"}`}
              ></div>
              <div className="user-welcome-left">
                {!isDropdown ? (
                  <RiArrowDropDownLine size={32} />
                ) : (
                  <RiArrowDropUpLine size={32} />
                )}
              </div>
              <div className="content">
                {currentUser?.roleData?.code === "R1" && (
                  <div
                    className="content-item"
                    id="order"
                    onClick={handleAdmin}
                  >
                    <MdAdminPanelSettings />
                    Admin Panel
                  </div>
                )}
                <div
                  className="content-item"
                  id="order"
                  onClick={() => navigate("/cart")}
                >
                  <VscPackage />
                  Carts{" "}
                  <span className="order-notify">{cartItems.length || 0}</span>
                </div>
                <div
                  className="content-item"
                  id="order"
                  onClick={() => navigate("/your-order")}
                >
                  <VscPackage />
                  Your Orders{" "}
                  <span className="order-notify">{orderInfo?.length || 0}</span>
                </div>
                <div
                  className="content-item"
                  onClick={() => navigate("/user-info")}
                >
                  <BiUser />
                  <span>User Information</span>
                </div>
                <div className="content-auth">
                  <div className={isLogged ? "auth logout" : "auth"}>
                    <div onClick={() => handleLogout()}>
                      {isLogged ? <div>Sign Out</div> : "Sign in"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      <div className="navbar-search-mobile">
        <Input
          onClick={showModal}
          className="input-search"
          placeholder="Search book"
        ></Input>
        <Modal
          style={{ zIndex: 99999 }}
          title="Search Book"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <form className="d-flex input-group w-auto" method="POST">
            <input
              type="text"
              className="form-control"
              autoComplete="off"
              onChange={handleChange}
              name="name"
              placeholder="Type to search"
              aria-label="Search"
            />
            {/* <MDBBtn color='primary' type='submit'>Search</MDBBtn> */}
          </form>
          <div className="data-search">
            {isLoading ? (
              <>
                {[1, 2, 3].map((item, i) => (
                  <div className="item-render-mt" key={i}>
                    <div className="item-render-left">
                      <Skeleton circle width={80} height={80} count={1} />
                      <div className="left-column">
                        <Link to="#">
                          {" "}
                          <Skeleton width={150} count={1} />
                        </Link>
                        <div>
                          {" "}
                          <Skeleton width={150} count={1} />
                        </div>
                      </div>
                    </div>
                    <div className="item-render-right">
                      {" "}
                      <Skeleton count={1} width={30} />
                    </div>
                  </div>
                ))}
              </>
            ) : searchData?.length > 1 ? (
              searchData?.map((item) => {
                return (
                  <div key={item.id} className="item-render">
                    <div className="item-render-left">
                      <img src={item.imageUrl} alt="none" />
                      <div className="left-column" title={item.title}>
                        <Link
                          to={`/detail/${item.id}`}
                          onClick={() => setIsModalOpen(false)}
                        >
                          {item.title}
                        </Link>
                        <div>{item.cateCode.value}</div>
                      </div>
                    </div>
                    <div className="item-render-right">{item.price}$</div>
                  </div>
                );
              })
            ) : (
              <div> not found, please type again</div>
            )}
          </div>
        </Modal>
      </div>
      <ListNavbar isMobile={isMobile} setIsMobile={setIsMobile} />
    </div>
  );
}
