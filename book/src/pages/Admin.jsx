import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../styles/admin/admin.scss";
import { NavLink } from "react-router-dom";
import logo from "../assets/imgs/logo.svg";
import { useSelector } from "react-redux";
const Admin = () => {
  const navigate = useNavigate();
  const userAdmin = useSelector((state) => state.user.currentUser);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const links = [
    {
      id: 1,
      path: "/admin/user",
      name: "User Manager",
    },
    {
      id: 2,
      path: "admin/book-manager",
      name: "Book Manager",
    },
  ];
  return (
    <div className="admin-container">
      <section className="sidebar">
        <div className="logo" style={{cursor:'pointer'}} onClick={() => navigate('/')}>
          <img src={logo} alt="logo" />
        </div>
        <div className="user-layout">
          <span>
            <img src={userAdmin?.avatar} alt="avatar" />
          </span>
          <div className="name-user">
            <p>{userAdmin?.name}</p>
            <span>Admin</span>
          </div>
        </div>
        <div className="list-manager">
          <p onClick={() => navigate('/admin')} style={{cursor:'pointer'}}>General</p>
          {links.map((item) => {
            return (
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "item-list active" : 'item-list')}
              >
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </section>
      <section className="content">
        <Outlet />
      </section>
    </div>
  );
};

export default Admin;
