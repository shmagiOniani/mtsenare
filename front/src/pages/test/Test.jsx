import React, { createRef, useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import { Col, Row, Select, Form, Slider, Pagination, Divider } from "antd";
import useTranslation from "../../hooks/useTranslation";
import Footer from "../footer/Footer";
import "./Test.scss";
import CustomInput from "../../components/elements/input/CustomInput";
import CustomButton from "../../components/elements/button/CustomButton";
// import { Box } from "@mui/material";

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
      <Row className="page-container" gutter={[30, 30]}>
        <Col xs={24} className={"page-header"}>
          <h1>Page Header</h1>
          <p>Page Description</p>
        </Col>
        <Col xs={24} className="view-testing-container">
          <h2>
            <u>ტექსტი</u>
          </h2>

          <h1>h1 Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
          <h2>h2 Lorem ipsum dolor sit amet consectetur adipisicing elit</h2>
          <h3>h3 Lorem ipsum dolor sit amet consectetur adipisicing elit</h3>
          <h4>h4 Lorem ipsum dolor sit amet consectetur adipisicing elit</h4>
          <h5>h5 Lorem ipsum dolor sit amet consectetur adipisicing elit</h5>
          <h6>h6 Lorem ipsum dolor sit amet consectetur adipisicing elit</h6>
          <p>p Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
        </Col>
        <Col xs={24} className="view-testing-container">
          <h2>
            <u>ველები</u>
          </h2>

          <Row gutter={[30, 0]}>
            <CustomInput inputArr={inputArr} />
          </Row>
        </Col>
        <Col>
          <h2>
            <u>ღილაკები</u>
          </h2>
          <Row gutter={[10, 10]}>
            <Col>
              <CustomButton type={"ghost"} htmlType="button" size={"small"}>
                ghost
              </CustomButton>
            </Col>
            <Col>
              <CustomButton type={"dashed"} htmlType="button" size={"small"}>
                dashed
              </CustomButton>
            </Col>
            <Col>
              <CustomButton type={"default"} htmlType="button" size={"small"}>
                default
              </CustomButton>
            </Col>
            <Col>
              <CustomButton type={"link"} htmlType="button" size={"small"}>
                link
              </CustomButton>
            </Col>
            <Col>
              <CustomButton type={"primary"} htmlType="button" size={"small"}>
                primary
              </CustomButton>
            </Col>
            <Col>
              <CustomButton type={"text"} htmlType="button" size={"small"}>
                text
              </CustomButton>
            </Col>
          </Row>
          <Divider />
          <Row gutter={[10, 10]}>
            <Col>
              <CustomButton type={"ghost"} htmlType="button" size={"medium"}>
                ghost
              </CustomButton>
            </Col>
            <Col>
              <CustomButton type={"dashed"} htmlType="button" size={"medium"}>
                dashed
              </CustomButton>
            </Col>
            <Col>
              <CustomButton type={"default"} htmlType="button" size={"medium"}>
                default
              </CustomButton>
            </Col>
            <Col>
              <CustomButton type={"link"} htmlType="button" size={"medium"}>
                link
              </CustomButton>
            </Col>
            <Col>
              <CustomButton type={"primary"} htmlType="button" size={"medium"}>
                primary
              </CustomButton>
            </Col>
            <Col>
              <CustomButton type={"text"} htmlType="button" size={"medium"}>
                text
              </CustomButton>
            </Col>
          </Row>
          <Divider />
          <Row gutter={[10, 10]}>
            <Col>
              <CustomButton type={"ghost"} htmlType="button" size={"large"}>
                ghost
              </CustomButton>
            </Col>
            <Col>
              <CustomButton type={"dashed"} htmlType="button" size={"large"}>
                dashed
              </CustomButton>
            </Col>
            <Col>
              <CustomButton type={"default"} htmlType="button" size={"large"}>
                default
              </CustomButton>
            </Col>
            <Col>
              <CustomButton type={"link"} htmlType="button" size={"large"}>
                link
              </CustomButton>
            </Col>
            <Col>
              <CustomButton type={"primary"} htmlType="button" size={"large"}>
                primary
              </CustomButton>
            </Col>
            <Col>
              <CustomButton type={"text"} htmlType="button" size={"large"}>
                text
              </CustomButton>
            </Col>
          </Row>
        </Col>
        <Col></Col>
        <Col xs={24}>
          <Footer />
        </Col>
      </Row>
    </div>
  );
}

export default Test;
