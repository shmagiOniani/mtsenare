import React, { useState } from "react";
import { Row, Col, Input, Form, Badge} from "antd";
import { SearchOutlined, ShoppingOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useLocation, useHistory } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import "./Navbar.scss"

function Navbar() {
  const [form] = Form.useForm();

  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation();

  let history = useHistory();

  const onSearch = (data) => {
    console.log(data);
  };

  const toHome = () => {
    history.push("/home")
  }



  const shopDropdown = <div>shop</div>;
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
  return (
    <>
      <Row className="navbar-wrapper" justify={"center"}>
        {location.pathname === "/home" ?
          <Col sm={24}>
            <div className="logo-container">
              <div className="logo">
                <img src={logo} alt={"logo"} />
              </div>
            </div>
          </Col>

          : ""}
        <Col sm={24}>
          <Row justify={"space-around"} align={"middle"} gutter={[30, 30]}>
            <Col xs={5} >
              {location.pathname === "/home" ?
                <div className="search-container">
                  {/* <Form
                    layout={"horizontal"}
                    form={form}
                    initialValues={{
                      layout: "horizontal",
                    }}
                    onFinish={onSearch}
                  >
                    <SearchOutlined />
                    <Form.Item name={"search"}>
                      <Input placeholder="Search" />
                    </Form.Item>

                  </Form> */}
                </div>
                :
                <div className="small-logo" onClick={toHome}>
                  <div className="logo">
                    <img src={logo} alt={"logo"} />
                  </div>
                </div>
              }

            </Col>
            <Col xs={14}>
              <div className="navigation-container">
                <ul>
                  {navArr.map((item, index) => {
                    return (
                      <li key={index}>
                        <Link to={item.link}>{item.name}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Col>
            <Col xs={5}>
              <Row justify={"end"}>
                <Col className={"cartside-search"}>
                  {location.pathname !== "/home" ?
                    <div className="search-container">
                      {/* <SearchOutlined onClick={() => setSearchOpen(!searchOpen)} /> */}

                      <Form
                        className={`search-form ${searchOpen ? "active-form" : ""}`}
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
                      </Form>
                    </div> : ""}
                </Col>
                <Col xs={12} style={{display: "flex"}}>
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
                        <div className="cart-item">
                          <div className="cart-img">
                            <img alt="cart icon" src="https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-12-img-300x400.jpg" />
                          </div>
                          <div className="cart-name-price">
                            <div>SCARLET SAGE</div>
                            <div>1 X $ 159</div>
                          </div>
                          <div className="close-icon">
                            <CloseOutlined />
                          </div>
                        </div>
                        <div className="cart-footer">
                          <div className="total">
                            <span>TOTAL:</span>
                            <span>150$</span>
                          </div>
                          <div className="cart-buttons">
                            <div>View Cart</div>
                            {/* <div>Checkout</div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cart-wrapper">
                  <Badge  size={"small"}>
                      {/* <Avatar shape="square" size="large" /> */}
                     <Link to="/auth">
                        <UserOutlined />
                     </Link>
                    </Badge>
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
        <li><Link  to="/home">მთავარი</Link></li>
        <li><Link  to="/product-list">პროდუქტის გვერდი</Link></li>
        <li><Link  to="/shop-list">მაღაზიები</Link></li>
        <li><Link  to="/contact">კონტაქტი</Link></li>
      </ul>
    </>

  );
}

export default Navbar;
