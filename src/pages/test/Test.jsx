import React, { createRef, useState } from 'react'
import { useHistory, Link, useLocation } from 'react-router-dom'
import { Col, Row, Select, Form, Slider, Pagination } from 'antd'
import useTranslation from "../../components/translation/useTranslation";
import Navbar from '../../components/navbar/Navbar'
import Footer from '../home/Footer';
import "./Test.scss"



function Test() {
  const { trans } = useTranslation();
  const { Option } = Select;

  let history = useHistory();
  const location = useLocation();

  // history.push('/home');
  // location.pathname

  return (
    <Row className='page-wrapper'>
      <Col xs={24}>
        <Navbar />
      </Col>
      <Col xs={24}>
        <Footer />
      </Col>
    </Row>
  )
}

export default Test