import { Divider, Menu } from "antd";
import React from "react";

function UserProfileSidebarCmp({ activeTab, setActiveTab }) {
  return (
    <div id="user-profile-action-list">
      <Menu>
        <Menu.Item onClick={() => setActiveTab("orders")} key={"orders"}>
          <div className="nav-item">
            <h5>შეკვეთები</h5>
          </div>
        </Menu.Item>
        <Menu.Item
          onClick={() => setActiveTab("my-products")}
          key={"my-products"}
        >
          <div className="nav-item">
            <h5>განცხადებები</h5>
          </div>
        </Menu.Item>
        <Menu.Item onClick={() => setActiveTab("adresses")} key={"adresses"}>
          <div className="nav-item">
            <h5>მისამართები</h5>
          </div>
        </Menu.Item>
        <Menu.Item onClick={() => setActiveTab("use-edit")} key={"use-edit"}>
          <div className="nav-item">
            <h5>ანგარიშის რედაქტირება</h5>
          </div>
        </Menu.Item>
        <Divider />
        <Menu.Item onClick={() => setActiveTab("logout")} key={"logout"}>
          <div className="nav-item">
            <h5>გასვლა</h5>
          </div>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default UserProfileSidebarCmp;
