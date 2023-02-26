import React from "react";
import "../styles/footer/footer.scss";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useState } from "react";

const footerItems = [
  {
    title: "B&N Services",
    list: [
      "Affiliate Program",
      "Publisher & Author Guidelines",
      "Bulk Order Discounts",
      "B&N Mobile Apps",
      "B&N Membership",
      "B&N Mastercard",
      "B&N Kids’ Club",
      "B&N Educators",
      "B&N Bookfairs",
    ],
  },
  {
    title: "About Us",
    list: [
      " About B&N",
      "Careers at B&N",
      "  Barnes & Noble, Inc.",
      "  B&N Kitchen",
    ],
  },
  {
    title: "Quick Help",
    list: [
      "  Help Center",
      "  Covid Safety",
      " Shipping & Returns",
      "  Store Pickup",
      "  Order Status",
      " Product Recalls",
      "  Corrections & Updates",
      "Gift Cards",
    ],
  },
  {
    title: "Shop by Category",
    list: [
      "  Books",
      "  Fiction",
      "  Nonfiction",
      " Kids",
      " Teens & YA",
      " eBooks",
      " Audiobooks",
      "  NOOK Tablets & eReaders",
      " Shop Easter Gifts & Books",
    ],
  },
  {
    title: "Make by",
    list: [
     'Hoang Dinh Tan',
     '2023',
     '+84 394700410',
     'hoangdinhtan1611@gmail.com',
     'Ho Chi Minh City',

    ],
  },
];
const Footer = () => {
  const [isExpanded, setIsExpanded] = useState({
    activeIndex: -1,
  });
  const handleExpanded = (index) => {

    setIsExpanded(prev => prev.activeIndex !== index ? index : null)
    setIsExpanded({activeIndex:index})

  };

  return (
    <>
      <div className="footer-container">
        <div className="footer-content">
          {footerItems.map((item, i) => (
            <section key={i}>
              <div
                className="accordion"
                onClick={() => handleExpanded(i)}
              >
                <h6>{item.title}</h6>
                <span className="icon-expand">
                  {isExpanded.activeIndex === i ? (
                    <MdOutlineKeyboardArrowUp size={32} />
                  ) : (
                    <MdOutlineKeyboardArrowDown size={32} />
                  )}
                </span>
              </div>
              <ul
                className={`${
                  isExpanded.activeIndex === i
                    ? "footer-content-item expanded"
                    : "footer-content-item"
                }`}
              >
                {item.list.map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <div className="term">
          <div className="left">
            <span> Terms of Use</span> <span>Copyright & Trademark</span>{" "}
            <span>Privacy</span>{" "}
            <span>Do Not Sell My Personal Information</span>{" "}
            <span>Accessibility </span> <span>Cookie Policy</span>
            <span>Sitemap </span>
          </div>
          <div className="right">
            ©1997-2023 Barnes & Noble Booksellers, Inc. 33 East 17th Street, New
            York, NY 10003
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
