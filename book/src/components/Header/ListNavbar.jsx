import React from "react";
import "../../styles/listNavbar.scss";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const list = [
  {
    id: 1,
    name: "Book",
  },
  {
    id: 2,
    name: "Fiction",
  },
  {
    id: 3,
    name: "Nonfiction",
  },
  {
    id: 4,
    name: "eBooks",
  },
  {
    id: 5,
    name: "AudioBook",
  },
  {
    id: 6,
    name: "Teens & YA",
  },
  {
    id: 7,
    name: "Kids",
  },
  {
    id: 8,
    name: "Toy & Games",
  },
  {
    id: 9,
    name: "Music and Movies",
  },
];
const ListNavbar = ({ setIsMobile, isMobile }) => {
  const navigate = useNavigate();
  const handleMenu = () =>{
    navigate("/api/books/all")
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
                onClick={handleMenu}
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
