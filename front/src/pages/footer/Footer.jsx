import { Row, Col } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';
import payment from "../../assets/img/footer-bottom-1.png";
import "./Footer.scss"


function Footer() {
  return (
    <>
      {/* <Row className='footer-container'>
        <Col xs={12} sm={6}>
          <ul className="footer-col">
            <li className="col-title"><h6>CUSTOMER SERVICE</h6></li>
            <li className="col-item"><Link to="/home">Help & Contact Us</Link></li>
            <li className="col-item"><Link to="/home">Returns & Refunds</Link></li>
            <li className="col-item"><Link to="/home">Online Stores</Link></li>
            <li className="col-item"><Link to="/home">Terms & Conditions</Link></li>
          </ul>
        </Col>
        <Col xs={12} sm={6}>
          <ul className="footer-col">
            <li className="col-title"><h6>CUSTOMER SERVICE</h6></li>
            <li className="col-item"><Link to="/home">Help & Contact Us</Link></li>
            <li className="col-item"><Link to="/home">Returns & Refunds</Link></li>
            <li className="col-item"><Link to="/home">Online Stores</Link></li>
            <li className="col-item"><Link to="/home">Terms & Conditions</Link></li>
          </ul>
        </Col>
        <Col xs={12} sm={6}>
          <ul className="footer-col">
            <li className="col-title"><h6>CUSTOMER SERVICE</h6></li>
            <li className="col-item"><Link to="/home">Help & Contact Us</Link></li>
            <li className="col-item"><Link to="/home">Returns & Refunds</Link></li>
            <li className="col-item"><Link to="/home">Online Stores</Link></li>
            <li className="col-item"><Link to="/home">Terms & Conditions</Link></li>
          </ul>
        </Col>
        <Col xs={12} sm={6}>
          <ul className="footer-col">
            <li className="col-title"><h6>CUSTOMER SERVICE</h6></li>
            <li className="col-item"><Link to="/home">Help & Contact Us</Link></li>
            <li className="col-item"><Link to="/home">Returns & Refunds</Link></li>
            <li className="col-item"><Link to="/home">Online Stores</Link></li>
            <li className="col-item"><Link to="/home">Terms & Conditions</Link></li>
          </ul>
        </Col>

      </Row> */}
      <Row className='footer-container'>
        <Col xs={24}>
          <Row className="footer-bottom">
            <Col sm={8}>
              <p>© 2018 Qode Interactive, All Rights Reserved</p>
            </Col>
            <Col sm={8}>
              <div className="img-container">
                <img src={payment} alt="description" />
              </div>
              {/* Payment Methods */}
            </Col>
            <Col sm={8}>
              <Link to="/home">INSTAGRAM</Link>
              <Link to="/home">FACEBOOK</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default Footer