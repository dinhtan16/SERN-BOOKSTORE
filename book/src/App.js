import "./App.css";
import Layout from "./components/Layout";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AdminPage from "./pages/Admin";
import { Route, Routes, useNavigate } from "react-router-dom";
import publicRoutes from "./routes/Routes";
import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import DefaultLayout from "./components/Layout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsArrowBarUp, BsMinecartLoaded } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Button, Modal } from 'antd';
function App() {
  const [visible, setVisible] = useState(false)
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate= useNavigate()
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      setVisible(true)
    } 
    else if (scrolled <= 300){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  
  window.addEventListener('scroll', toggleVisible);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoad] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useLayoutEffect(() => {
    setIsModalOpen(true)

    return () => {
      setIsModalOpen(false)
    }
  },[])
  useEffect(() => {
    setIsModalOpen(true)

    return () => {
      setIsModalOpen(false)
    }
  },[modalLoad])
  return (
    <div>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;

          let Layout = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route path="/" element={<Layout />} key={index}>
              <Route path={route.path} element={<Page />} />
            </Route>
          );
        })}
      </Routes>
      <ToastContainer />
      <div className="float-button" style={{display:`${visible ? 'flex' : 'none'}`}}>
        <button className="to-top"><BsArrowBarUp onClick={scrollToTop} size={24}/></button>
        <button className="to-cart" onClick={() => navigate('/cart')}><BsMinecartLoaded  size={24}/>{cartItems?.length > 0 && <span className="cart-length">{cartItems?.length}</span>}</button>

      </div>
      <Modal title="Notify" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        Admin Account : <p>admin@gmail.vn</p> <p>Pass: 123456</p>
      </Modal>
    </div>
  );
}

export default App;
