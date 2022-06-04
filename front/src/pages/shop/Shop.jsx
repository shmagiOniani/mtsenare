import React from 'react'
import { Col, Row } from 'antd'
import Navbar from '../../components/navbar/Navbar'
import ProductItem from '../home/ProductItem';
import avatar from "../../assets/img/avatar.png";

import Footer from '../footer/Footer';
import "./Shop.scss"

const imgs = [
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-1.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-2.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-3.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-4.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-5.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-6.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-1.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-2.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-3.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-4.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-5.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-6.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-1.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-2.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-3.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-4.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-5.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-6.jpg",
];

function Shop() {

  return (
    <div className='page-wrapper'>

      <Row className='page-container'>
        <Col xs={24}>
          <Navbar />
        </Col>
        <Col xs={24} className='shop-wrapper'>
          <Row justify={"center"} align="middle" className="shop-header">
            <Col>
              <div className='img-wrapper'><img src={avatar} alt="bla"/></div>
              <div className='shop-name'> მაღაზიის დასახელება</div>
            </Col>
          </Row>
          <Row gutter={[30,30]} className="product-list">
            {imgs.map((category, ind) => {
              return <ProductItem  xsSize={24} smSize={8} mdSize={4} key={ind} id={ind} imgSrc={category} />;
            })}
          </Row>
        </Col>
        <Col xs={24}>
          <Footer />
        </Col>
      </Row>
    </div>
  )
}

export default Shop