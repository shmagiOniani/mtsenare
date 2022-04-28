import { Row, Col } from 'antd'
import React from 'react'
import payment from "../../assets/img/footer-bottom-1.png";
import "./Footer.scss"


function Footer() {
  return (
    <>
      <Row className='footer-container'>
        <Col xs={12} sm={6}>
          <ul className="footer-col">
            <li className="col-title"><h6>CUSTOMER SERVICE</h6></li>
            <li className="col-item"><a>Help & Contact Us</a></li>
            <li className="col-item"><a>Returns & Refunds</a></li>
            <li className="col-item"><a>Online Stores</a></li>
            <li className="col-item"><a>Terms & Conditions</a></li>
          </ul>
        </Col>
        <Col xs={12} sm={6}>
          <ul className="footer-col">
            <li className="col-title"><h6>CUSTOMER SERVICE</h6></li>
            <li className="col-item"><a>Help & Contact Us</a></li>
            <li className="col-item"><a>Returns & Refunds</a></li>
            <li className="col-item"><a>Online Stores</a></li>
            <li className="col-item"><a>Terms & Conditions</a></li>
          </ul>
        </Col>
        <Col xs={12} sm={6}>
          <ul className="footer-col">
            <li className="col-title"><h6>CUSTOMER SERVICE</h6></li>
            <li className="col-item"><a>Help & Contact Us</a></li>
            <li className="col-item"><a>Returns & Refunds</a></li>
            <li className="col-item"><a>Online Stores</a></li>
            <li className="col-item"><a>Terms & Conditions</a></li>
          </ul>
        </Col>
        <Col xs={12} sm={6}>
          <ul className="footer-col">
            <li className="col-title"><h6>CUSTOMER SERVICE</h6></li>
            <li className="col-item"><a>Help & Contact Us</a></li>
            <li className="col-item"><a>Returns & Refunds</a></li>
            <li className="col-item"><a>Online Stores</a></li>
            <li className="col-item"><a>Terms & Conditions</a></li>
          </ul>
        </Col>

      </Row>
      <Row className='footer-container'>
        <Col xs={24}>
          <Row className="footer-bottom">
            <Col sm={8}>
              <p>© 2018 Qode Interactive, All Rights Reserved</p>
            </Col>
            <Col sm={8}>
              <div className="img-container">
                <img src={payment}/>
              </div>
              {/* Payment Methods */}
            </Col>
            <Col sm={8}>
              <a href="#">INSTAGRAM</a>
              <a href="#">FACEBOOK</a>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default Footer