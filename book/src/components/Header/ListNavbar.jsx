import React from "react";
import "../../styles/listNavbar.scss";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
const list = [
  {
    id: 1,
    name: "Book",
    path:'RT6'
  },
  {
    id: 2,
    name: "Fiction",
    path:'UB8'
  },
  {
    id: 3,
    name: "Nonfiction",
    path:'IH17'

  },
  {
    id: 4,
    name: "eBooks",
    path:'YM7'
  },
  {
    id: 5,
    name: "AudioBook",
    path:'UA13'

  },
  {
    id: 6,
    name: "Teens & YA",
    path:'HP10'

  },
  {
    id: 7,
    name: "Kids",
    path:'IF7'

  },
  {
    id: 8,
    name: "Toy & Games",
    path:'AF7'

  },
  {
    id: 9,
    name: "Music and Movies",
    path:'OP6'

  },
];
const ListNavbar = ({ setIsMobile, isMobile }) => {
  const navigate = useNavigate();
  const handleMenu = (item) =>{
    navigate({
      pathname: "/api/books/",
      search: `?${createSearchParams({
        category: item.path,
      })}`,
    });
    setIsMobile(false)
  }
  return (
    <>
      <div className={`${isMobile && "overlay"}`}></div>
      <div
        className={`${
          isMobile ? "categories-list-header active" : "categories-list-header"
        }`}
      >
        {list.map((item) => {
          return (
            <div key={item.id}>
              <span
                
                className="categories-list-item"
                onClick={() => handleMenu(item)}
              >
                {item.name}
                <section className="mega-menu">
                  <ul>
                    {" "}
                    <h4>Lorems</h4>
                    <li>Mauris</li>
                    <li>Sed</li>
                    <li>metus</li>
                    <li>aliquam </li>
                    <li>rutrum </li>
                  </ul>
                
                </section>
              </span>
            </div>
          );
        })}
        <div
          className={`${isMobile ? "close active" : "close"}`}
          onClick={() => setIsMobile(!isMobile)}
        >
          <IoMdClose size={24} />
        </div>
      </div>
    </>
  );
};

export default ListNavbar;
