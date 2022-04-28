import React, { createRef, useState, useEffect } from 'react'
import { useHistory, Link, useLocation } from 'react-router-dom'
import { Col, Row, Select, Form, Slider, Pagination } from 'antd'
import useTranslation from "../../components/translation/useTranslation";
import Navbar from '../../components/navbar/Navbar'
import Footer from '../footer/Footer';
import "./Faq.scss"

const category = ["Cactus", "Exotic", "Greens", "Popular", "Various", "Winter"]

function Faq() {
  const { trans } = useTranslation();
  const { Option } = Select;

  let history = useHistory();
  const location = useLocation();

  // history.push('/home');
  // location.pathname

  useEffect(() => {
    console.log("here");
  })

  return (
    <div className='faq-wrapper'>

      <Row className='page-container'>
        <Col xs={24}>
          <Navbar />
        </Col>
        <Col xs={24} className={"page-header"}>
          <h1>Page Header</h1>
          <p>Page Description</p>
        </Col>
        <Col xs={24}>
          <Row>
            <Col xs={24} sm={5}>
              <div className="product-sidebar-wrapper">
                <ul className="product-sidebar-category ">
                  <h6 className="category-header">CATEGORIES</h6>
                  {category.map((item, ind) => {
                    return (
                      <li key={ind}>
                        <Link to={item}>
                          {item}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Col>
            <Col xs={24} sm={19}></Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Footer />
        </Col>
      </Row>
    </div>
  )
}

export default Faq