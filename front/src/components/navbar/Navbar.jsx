import React, { useState } from "react";
import { Row, Col, Badge, Form, Input, Dropdown, Menu } from "antd";
import {
  ShoppingOutlined,
  CloseOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useHistory } from "react-router-dom";

import logo from "../../assets/img/logo.png";
import "./Navbar.scss";
import AuthModal from "../modal/authModal/AuthModal";

const token = localStorage.getItem("token");

function Navbar() {
  const location = useLocation();

  let history = useHistory();

  const [authModal, setAuthModal] = useState(false);

  const toHome = () => {
    history.push("/home");
  };

  const handleNavigate = (e, target) => {
    if (target === "remove") {
      console.log("remove");
      return true;
    } else if (target === "relocate") {
      console.log("relocate");
    }
  };

  const shopDropdown = <div>shop</div>;

  const cartItem = (
    <div className="cart-item">
      <div onClick={(e) => handleNavigate(e, "relocate")} className="cart-img">
        <img
          alt="cart icon"
          src="https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-12-img-300x400.jpg"
        />
      </div>
      <div
        onClick={(e) => handleNavigate(e, "relocate")}
        className="cart-name-price"
      >
        <div>SCARLET SAGE</div>
        <div>1 X $ 159</div>
      </div>
      <div className="close-icon">
        <CloseOutlined onClick={(e) => handleNavigate(e, "remove")} />
      </div>
    </div>
  );

  const onSearch = (data) => {
    console.log(data);
  };

  const navArr = [
    {
      name: "მთავარი",
      link: "/home",
      multy: false,
    },
    {
      name: "პროდუქტის გვერდი",
      link: "/product-list",
      multy: true,
      options: shopDropdown,
    },
    {
      name: "მაღაზიები",
      link: "/shop-list",
      multy: false,
    },
    // {
    //   name: "About Us",
    //   link: "/about-us",
    //   multy: false,
    // },
    {
      name: "კონტაქტი",
      link: "/contact",
      multy: false,
    },
  ];

  const userMenu = (
    <Menu >
      <Menu.Item key="Order Tracking">Order Tracking</Menu.Item>
      <Menu.Item key="My Acount"><Link to={"my-acount"}>My Acount</Link></Menu.Item>
      <Menu.Item key="Checkout">Checkout</Menu.Item>
      <Menu.Item key="Whishlist">Whishlist</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Row className="navbar-wrapper" justify={"center"}>
        {/* {location.pathname === "/home" ? (
          <Col sm={24}>
            <div className="logo-container">
              <div className="logo">
                <img src={logo} alt={"logo"} />
              </div>
            </div>
          </Col>
        ) : (
          ""
        )} */}
        <Col sm={24}>
          <Row justify={"space-around"} align={"middle"} gutter={[30, 30]}>
            <Col xs={6}>
              {true ? (
                <div className="search-container">
                  <Form
                    layout={"horizontal"}
                    // form={form}
                    initialValues={{
                      layout: "horizontal",
                    }}
                    onFinish={onSearch}
                  >
                    <SearchOutlined />
                    <Form.Item name={"search"}>
                      <Input placeholder="ძებნა" />
                    </Form.Item>
                  </Form>
                </div>
              ) : (
                <div className="small-logo" onClick={toHome}>
                  <div className="logo">
                    <img src={logo} alt={"logo"} />
                  </div>
                </div>
              )}
            </Col>
            <Col xs={12}>
              <div className="navigation-container">
                <ul>
                  {/* {navArr.map((item, index) => {
                    return (
                      <li key={index}>
                        <Link to={item.link}>{item.name}</Link>
                      </li>
                    );
                  })} */}
                  <li>
                    <Link to={navArr[0].link}>{navArr[0].name}</Link>
                  </li>
                  <li>
                    <Link to={navArr[1].link}>{navArr[1].name}</Link>
                  </li>
                  <div className="small-logo" onClick={toHome}>
                    <div className="logo">
                      <img src={logo} alt={"logo"} />
                    </div>
                  </div>
                  <li>
                    <Link to={navArr[2].link}>{navArr[2].name}</Link>
                  </li>
                  <li>
                    <Link to={navArr[3].link}>{navArr[3].name}</Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xs={6}>
              <Row justify={"end"}>
                <Col className={"cartside-search"}>
                  {location.pathname !== "/home" ? (
                    <div className="search-container">
                      {/* <SearchOutlined onClick={() => setSearchOpen(!searchOpen)} /> */}

                      {/* <Form
                        className={`search-form ${
                          searchOpen ? "active-form" : ""
                        }`}
                        layout={"horizontal"}
                        form={form}
                        initialValues={{
                          layout: "horizontal",
                        }}
                        onFinish={onSearch}
                      >
                        <Form.Item name={"search"}>
                          <Input placeholder="Search" />
                        </Form.Item>
                      </Form> */}
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
                <Col xs={12} style={{ display: "flex" }}>
                  <div className="cart-wrapper">
                    <Badge count={5} size={"small"}>
                      {/* <Avatar shape="square" size="large" /> */}
                      <ShoppingOutlined />
                    </Badge>
                    {/* <div className="car-count">
                      <span>CART</span>
                      <span>(150$)</span>
                    </div> */}
                    <div className={`cart-container `}>
                      <div>
                        <div className="item-container">
                          {cartItem}
                          {cartItem}
                          {cartItem}
                          {cartItem}
                        </div>
                        <div className="cart-footer">
                          <div className="total">
                            <span></span>
                            <b>
                              სულ: <b>150$</b>
                            </b>
                          </div>
                          <div className="cart-buttons">
                            <div onClick={() => history.push("/shopping-cart")}>
                              <Link to={"/shopping-cart"}>შეკვეთა</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="profile-wrapper">
                    <div
                      className="profile-container"
                      onClick={() => !token && setAuthModal(true)}
                    >
                      <Dropdown overlay={userMenu} placement="bottomLeft">
                        <UserOutlined />
                        {/* <Button>bottomLeft</Button> */}
                      </Dropdown>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <input type="checkbox" id="menu-toggle" />
      <label id="trigger" htmlFor="menu-toggle"></label>
      <label id="burger" htmlFor="menu-toggle"></label>
      <ul id="menu">
        <li>
          <Link to="/auth">ავტორიზაცია</Link>
        </li>
        <li>
          <Link to="/home">მთავარი</Link>
        </li>
        <li>
          <Link to="/product-list">პროდუქტის გვერდი</Link>
        </li>
        <li>
          <Link to="/shop-list">მაღაზიები</Link>
        </li>
        <li>
          <Link to="/contact">კონტაქტი</Link>
        </li>
      </ul>

      <div id="fixed-bar"></div>

      <AuthModal open={authModal} setOpen={(data) => setAuthModal(data)} />
    </>
  );
}

export default Navbar;
