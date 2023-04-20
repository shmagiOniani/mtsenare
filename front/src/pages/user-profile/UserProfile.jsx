import React, { createRef, useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import { Col, Row, Select, Form, Slider, Pagination } from "antd";
import useTranslation from "../../hooks/useTranslation";
import Footer from "../footer/Footer";
import "./UserProfile.scss";

function UserProfile() {
  const { trans } = useTranslation();
  const { Option } = Select;

  let history = useHistory();
  const location = useLocation();

  // history.push('/home');
  // location.pathname

  return (
    <>
    <div className="page-wrapper">
      <Row className="page-container">
        <Col xs={24} className={"page-header"}>
          <h1>Page Header</h1>
          <p>Page Description</p>
        </Col>
        <Col xs={24} className="user-profile-container">

        
        </Col>
        <Col xs={24}>
          <Footer />
        </Col>
      </Row>
    </div>
    </>
  );
}

export default UserProfile;
