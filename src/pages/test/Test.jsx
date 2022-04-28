import React, { createRef, useState } from 'react'
import { useHistory, Link, useLocation } from 'react-router-dom'
import { Col, Row, Select, Form, Slider, Pagination } from 'antd'
import useTranslation from "../../components/translation/useTranslation";
import Navbar from '../../components/navbar/Navbar'
import Footer from '../footer/Footer';
import "./Test.scss"



function Test() {
  const { trans } = useTranslation();
  const { Option } = Select;

  let history = useHistory();
  const location = useLocation();

  // history.push('/home');
  // location.pathname

  return (
    <div className='page-wrapper'>

    <Row className='page-container'>
      <Col xs={24}>
        <Navbar />
      </Col>
      <Col xs={24} className={"page-header"}>
          <h1>Page Header</h1>
          <p>Page Description</p>
        </Col>
      <Col xs={24}>
        <Footer />
      </Col>
    </Row>
    </div>
  )
}

export default Test