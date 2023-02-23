import React from "react";
import "../../styles/listNavbar.scss";
import {IoMdClose} from 'react-icons/io'
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
const ListNavbar = ({setIsMobile,isMobile}) => {
  const navigate = useNavigate()
  return (
    <>
        <div className={`${isMobile && 'overlay'}`}></div>
            <div className={`${isMobile ? "categories-list-header active" : "categories-list-header"}`}>
              {list.map((item) => {
                return (
                 <>
                      <span key={item.id} className="categories-list-item" onClick={() => navigate('/api/books/all')}>
                        {item.name} 
                        <section className="mega-menu">
                            <h4>Lorems</h4>
                            <ul>
                                <li>Mauris</li>
                                <li>Sed</li>
                                <li>metus</li>
                                <li>aliquam </li>
                                <li>rutrum </li>
                            </ul>
        
        
                        </section>
                      </span>
                      
                 </>
                );
              })}
              <div className={`${isMobile ? "close active" : "close"}`} onClick={() => setIsMobile(!isMobile)}>
                <IoMdClose size={24}/>
              </div>
            </div>
    </>
  );
};

export default ListNavbar;
