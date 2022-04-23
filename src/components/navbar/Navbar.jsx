import React, { useState } from "react";
import { Row, Col, Input, Form, Badge, Button } from "antd";
import { SearchOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import "./Navbar.scss"

function Navbar() {
  const [form] = Form.useForm();

  const [cartOpen, setCartOpen] = useState(false);

  const onSearch = (data) => {
    console.log(data);
  };

  const shopDropdown = <div>shop</div>;
  const navArr = [
    {
      name: "Home",
      link: "/home",
      multy: false,
    },
    {
      name: "Shop",
      link: "/product-list",
      multy: true,
      options: shopDropdown,
    },
    {
      name: "About Us",
      link: "/about",
      multy: false,
    },
    {
      name: "Contact",
      link: "/contact",
      multy: false,
    },
    {
      name: "FAQ",
      link: "/faq ",
      multy: false,
    },
  ];
  return (
    <Row className="navbar-wrapper" justify={"center"}>
      <Col xs={12} sm={24}>
        <div className="logo-container">
          <div className="logo">
            <img src={logo} alt={"logo"} />
          </div>
        </div>
      </Col>
      <Col xs={12} sm={24}>
        <Row justify={"space-around"} align={"middle"}>
          <Col xs={5}>
            <div className="search-container">
              <Form
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

                {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item> */}
              </Form>
            </div>
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
            <div className="cart-wrapper">
              <Badge count={5} size={"small"}>
                {/* <Avatar shape="square" size="large" /> */}
                <ShoppingOutlined />
              </Badge>
              <div className="car-count">
                <span>CART</span>
                <span>(150$)</span>
              </div>
              <div className={`cart-container `}>
                <div>
                  <div className="cart-item">
                    <div className="cart-img">
                      <img src="https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-12-img-300x400.jpg"/>
                    </div>
                    <div className="cart-name-price">
                      <div>SCARLET SAGE</div>
                      <div>1 X $ 159</div>
                    </div>
                    <div className="close-icon">

                    </div>
                  </div>
                  <div className="cart-footer">
                    <div className="total">
                      <span>TOTAL:</span>
                      <span>150$</span>
                    </div>
                    <div className="cart-buttons">
                      <Button>View Cart</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Navbar;
