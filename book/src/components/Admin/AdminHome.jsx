import React from "react";
import hero from "../../assets/imgs/at-work.svg";
import '../../styles/admin/admin.scss'
const AdminHome = () => {
  return (
  <div className="admin">
      <div className="admin-container-welcome">
      <div className="admin-welcome">
          <div>ADMIN PANEL</div>
          <div>WELCOME</div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem itaque
            perferendis, minus voluptate consequatur corrupti cumque impedit
            architecto dolorem dolores iure ipsa quaerat ducimus earum error illum.
            Hic, qui nam.
          </p>
      </div>
        <div className="admin-img"><img src={hero} alt="" /></div>
      </div>
  </div>
  );
};

export default AdminHome;
