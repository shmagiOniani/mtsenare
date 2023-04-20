import React, { createRef, useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import { Col, Row, Select, Form, Slider, Pagination } from "antd";
import useTranslation from "../../hooks/useTranslation";
import Footer from "../footer/Footer";
import "./Test.scss";
import CustomInput from "../../components/elements/input/CustomInput";

function Test() {
  const { trans } = useTranslation();
  const { Option } = Select;

  let history = useHistory();
  const location = useLocation();

  // history.push('/home');
  // location.pathname
  const inputArr = [
    {
      name: "inputName",
      type: "text",
      label: "ლეიბლი",
      placeholder: "პლეისჰოლდერი",
      xs: 24,
    },
    {
      name: "inputName",
      type: "number",
      label: "ლეიბლი",
      placeholder: "პლეისჰოლდერი",
      xs: 24,
    },
    {
      name: "password",
      type: "password",
      label: "ლეიბლი",
      placeholder: "პლეისჰოლდერი",
      xs: 24,
    },
    {
      name: "selectName",
      type: "select",
      label: "ლეიბლი",
      placeholder: "პლეისჰოლდერი",
      options: [
        {
          name: "option",
          _id: "asdadsdad",
        },
      ],
      xs: 24,
    },
    {
      name: "date",
      type: "date",
      label: "ლეიბლი",
      placeholder: "პლეისჰოლდერი",
      xs: 24,
    },
  ];
  return (
    <div className="page-wrapper">
      <Row className="page-container">
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
        <Col xs={24} className="view-testing-container">
          <Row gutter={[30, 0]}>
            <CustomInput inputArr={inputArr} />
          </Row>
        </Col>
        <Col xs={24}>
          <Footer />
        </Col>
      </Row>
    </div>
  );
}

export default Test;
