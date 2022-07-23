import React, { createRef, useState } from 'react'
import { useHistory, Link, useLocation } from 'react-router-dom'
import { Col, Row, Select, Form, Slider, Pagination } from 'antd'
import useTranslation from '../../hooks/useTranslation';
import Navbar from '../../components/navbar/Navbar'
import Footer from '../footer/Footer';
import "./NotFound.scss"



function NotFound() {
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
      <Col xs={24}>
      
      </Col>
      <Col xs={24}>
        <Footer />
      </Col>
    </Row>
    </div>
  )
}

export default NotFound