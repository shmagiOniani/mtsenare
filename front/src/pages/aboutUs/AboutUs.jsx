import React from 'react'
import { Col, Row, Carousel } from 'antd'
import aboutImg from "../../assets/img/home-about.jpg";
import avatar from "../../assets/img/avatar.png";
import Footer from '../footer/Footer';
import "./AboutUs.scss"

const imgs = [
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-1.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-2.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-3.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-4.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-5.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-6.jpg",
];

function AboutUs() {

  const onChange = (a, b, c) => {
    console.log(a, b, c);
  };

  return (
    <div className='about-us-wrapper'>
    <Row className='page-container'>
      <Col xs={24} className={"page-header"}>
        <h1>Add Product</h1>
        <p>Where flowers are our inspiration</p>
      </Col>
      <Col xs={24}>
        <div className="home-about-section">
          <Row>
            <Col xs={24} sm={12}>
              <h1>We take flowers personally <br />& we bring you happiness</h1>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec.</p>
            </Col>
            <Col xs={24} sm={12}>
              <div className="img-container">
                <img src={aboutImg} alt={"bla"}/>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
      <Col xs={24}>
            <div className="slider-container">
              <div className="slider">
                <Carousel afterChange={onChange}>
                  {imgs.map((item, ind) => {
                    return (
                      <div key={ind} className="slider-item">
                        <div className="avatar-container">
                          <img src={avatar} alt={"avatr"} />
                        </div>
                        <p>
                          Nullam dictum felis eu pede mollis pretium. Integer
                          tincidunt. Cras dapibus lingua.{" "}
                        </p>
                        <span>
                          <span>Anna Barnes</span>
                          <span>Florist</span>
                        </span>
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </div>
          </Col>
      <Col xs={24}>
        <Footer />
      </Col>
    </Row>
    </div>
  )
}

export default AboutUs