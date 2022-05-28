import React, {  useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'antd'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../footer/Footer';
import "./Faq.scss"

const category = ["Cactus", "Exotic", "Greens", "Popular", "Various", "Winter"]

function Faq() {

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