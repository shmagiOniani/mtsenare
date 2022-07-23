import React, { createRef, useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import { Col, Row, Select, Form, Slider, Pagination } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import useTranslation from "../../hooks/useTranslation";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../footer/Footer";
import "./ShoppingCart.scss";


function ShoppingCart() {
  const { trans } = useTranslation();
  const { Option } = Select;

  let history = useHistory();
  const location = useLocation();

  const handleNavigate =(id)=>{
    history.push(`product/${id}`)
  }

  // history.push('/home');
  // location.pathname

  return (
    <div className="page-wrapper">
      <Row className="page-container">
        <Col xs={24}>
          <Navbar />
        </Col>
        <Col xs={24} className={"page-header"}>
          <h1>Shopping Cart</h1>
          <p>Filter Selected Staff</p>
        </Col>
        <Col xs={24} className={"cart-list-wrapper"}>
          <div className={`cart-container `}>
            <div>
              <div className="cart-item" onClick={()=> handleNavigate(3)}>
                <div className="cart-img">
                  <img
                    alt="cart icon"
                    src="https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-12-img-300x400.jpg"
                  />
                </div>
                <div className="cart-name-price">
                  <div>SCARLET SAGE</div>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates numquam perferendis, eum autem doloremque nisi delectus blanditiis sint neque dolorem.</p>
                  <div>1 X $ 159</div>
                </div>
                <div className="close-icon">
                  <CloseOutlined />
                </div>
              </div>
              <div className="cart-item" onClick={()=> handleNavigate(3)}>
                <div className="cart-img">
                  <img
                    alt="cart icon"
                    src="https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-12-img-300x400.jpg"
                  />
                </div>
                <div className="cart-name-price">
                  <div>SCARLET SAGE</div>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates numquam perferendis, eum autem doloremque nisi delectus blanditiis sint neque dolorem.</p>
                  <div>1 X $ 159</div>
                </div>
                <div className="close-icon">
                  <CloseOutlined />
                </div>
              </div>
              <div className="cart-footer">
                <div className="total">
                  <span>{trans("total")}:</span>
                  <span>150$</span>
                </div>
                <div className="cart-buttons">
                  <div>
                    <Link to={"/shopping-cart"}>{trans("order_now")}</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} className="cart-footer-wrapper">
          <Footer />
        </Col>
      </Row>
    </div>
  );
}

export default ShoppingCart;
