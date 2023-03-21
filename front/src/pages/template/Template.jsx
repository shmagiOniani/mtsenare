import React, { createRef, useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import { Col, Row, Select, Form, Slider, Pagination } from "antd";
import useTranslation from "../../hooks/useTranslation";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../footer/Footer";
import "./Template.scss";

function Test() {
  const { trans } = useTranslation();
  const { Option } = Select;

  let history = useHistory();
  const location = useLocation();

  // history.push('/home');
  // location.pathname

  return (
    <div className="page-wrapper">
      <Row className="page-container">
        <Col xs={24}>
          <Navbar />
        </Col>
        <Col xs={24} className={"page-header"}>
          <h1>Page Header</h1>
          <p>Page Description</p>
        </Col>
        <Col xs={24} className="view-testing-container">

          <h1>h1 Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
          <h2>h2 Lorem ipsum dolor sit amet consectetur adipisicing elit</h2>
          <h3>h3 Lorem ipsum dolor sit amet consectetur adipisicing elit</h3>
          <h4>h4 Lorem ipsum dolor sit amet consectetur adipisicing elit</h4>
          <h5>h5 Lorem ipsum dolor sit amet consectetur adipisicing elit</h5>
          <h6>h6 Lorem ipsum dolor sit amet consectetur adipisicing elit</h6>
          <p>p Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
        </Col>
        <Col xs={24}>
          <Footer />
        </Col>
      </Row>
    </div>
  );
}

export default Test;
