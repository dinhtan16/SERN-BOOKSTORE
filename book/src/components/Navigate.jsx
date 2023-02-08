import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,

  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";
import "../styles/navigate.scss";
import {  Modal } from "antd";
import { Link, NavLink } from "react-router-dom";
// import { useDispatch } from "react-redux";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect } from "react";
import { searchBooks } from "../services/books";
import useDebounce from "./hooks/useDebounce";

export default function Navigate() {
  const [showBasic, setShowBasic] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [searchData, setSearchData] = useState([]);

  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [searchParams,setSearchParams] = useSearchParams()
  // const page = searchParams.get('page')
  const debounce = useDebounce(searchInput, 300);

  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setIsLoading(true)
    let delay
    const fetch = async () => {
      const res = await searchBooks({ name: debounce });
      setSearchData(res.data.bookData.rows);

       delay = setTimeout(() => {
        setIsLoading(false)
        // console.log(123)
      },1000)
    
    };
    fetch();

    return () => {
      delay &&  clearTimeout(delay)
    }
  }, [debounce]);
  const handleChange = (e) => {
    // console.log(e.target.value)
    setSearchInput(e.target.value);
  };
 
  return (
    <MDBNavbar
      expand="lg"
      light
      bgColor="light"
      style={{ zIndex: 1 }}
      sticky="top"
    >
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">Brand</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav
            className="mr-auto mb-2 mb-lg-0"
            style={{ alignItems: "center", gap: "2rem" }}
          >
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current="page" href="/">
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <NavLink to="login">Login</NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <NavLink to={`api/books/all`}>Shop</NavLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link" role="button">
                  Dropdown
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link>Action</MDBDropdownItem>
                  <MDBDropdownItem link>Another action</MDBDropdownItem>
                  <MDBDropdownItem link>Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <form className="d-flex input-group w-auto" method="POST">
            <input
              onClick={showModal}
              type="text"
              className="form-control"
              placeholder="Search book"
              aria-label="Search"
            />
            {/* <MDBBtn color='primary' type='submit'>Search</MDBBtn> */}
          </form>
        </MDBCollapse>
        <>
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
                onChange={handleChange}
                name="name"
                placeholder="Type to search"
                aria-label="Search"
              />
              {/* <MDBBtn color='primary' type='submit'>Search</MDBBtn> */}
            </form>
            <div className="data-search" >
              {isLoading ? 
               <div  className="item-render">
               <div className="item-render-left">
                <Skeleton circle width={80} height={80} />
                 <div className="left-column">
                   <Link to="#">  <Skeleton  width={150} /></Link>
                   <div>  <Skeleton width={150}/></div>
                 </div>
               </div>
               <div className="item-render-right">  <Skeleton  width={30} /></div>
             </div>
              
              : searchData?.length > 1 ? searchData?.map((item) => {
                return (
                  <div key={item.id} className="item-render">
                    <div className="item-render-left">
                      <img
                        src={item.imageUrl}
                        alt="none"
                      />
                      <div className="left-column">
                        <Link to="#">{item.title}</Link>
                        <div>{item.cateCode.value}</div>
                      </div>
                    </div>
                    <div className="item-render-right">{item.price}$</div>
                  </div>
                );
              } ) : <div> not found, please type again</div>}
            </div>
          </Modal>
        </>
      </MDBContainer>
    </MDBNavbar>
  );
}
