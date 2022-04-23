import React from "react";
import { Col, Row, Carousel, Image, Input } from "antd";
import OwlCarousel from 'react-owl-carousel';
import useTranslation from "../../components/translation/useTranslation";
import Navbar from "../../components/navbar/Navbar";
import wappPaper from "../../assets/img/wall-paper.jpg";
import avatar from "../../assets/img/avatar.png";
import aboutImg from "../../assets/img/home-about.jpg";
import Footer from "./Footer";
import "./Home.scss";

const imgs = [
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-1.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-2.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-3.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-4.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-5.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-6.jpg",
];

function Home() {
  const { trans } = useTranslation();


  const onChange = (a, b, c) => {
    console.log(a, b, c);
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    )
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    )
  }


  const settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
    <Row className="home-wrapper">
      <Col xs={24}>
        <Navbar />
      </Col>
      <Col xs={24}>
        <div className="wall-paper">
          <div className="img-container">
            <img src={wappPaper} alt={"wall paper"} />
          </div>
          <div className="headline">
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
            <a href="#">Start Shopping</a>
          </div>
        </div>
      </Col>
      <Col xs={24}>
        <Row gutter={[30, 30]} className="category-list">
          {imgs.map((category, ind) => {
            return (
              <Col xs={24} sm={6} md={4} key={ind} className="category-item">
                <div className="img-container">
                  <img src={category} alt="sasas" />
                </div>
                <div className="category-desc">
                  <h6>WINTER</h6>
                  <span>{ind}00$</span>
                </div>
              </Col>
            );
          })}
        </Row>
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
        <div className="featured-container">
          <div className="featured-header"></div>
          <div className="featured-slider">
            <OwlCarousel className='owl-theme' dots={false} items={"4"} loop margin={10} nav>
              {imgs.map((category, ind) => {
                return (
                  <Col
                    // xs={24}
                    // sm={6}
                    // md={6}
                    key={ind}
                    className="category-item item"
                  >
                    <div className="img-container">
                      <img src={category} alt="sasas" />
                    </div>
                    <div className="category-desc">
                      <h6>WINTER</h6>
                      <span>{ind}00$</span>
                    </div>
                  </Col>
                );
              })}
            </OwlCarousel>
          </div>
        </div>
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
                <img src={aboutImg} />
              </div>
            </Col>
          </Row>
        </div>
      </Col>
      <Col xs={24}>
        <Row className="subscribe-container">
          <Col xs={24}>
            <h2>Join The Colorful Bunch!</h2>
          </Col>
          <Col xs={24} sm={12}>
            <div className="sub-input">
              <input placeholder="Email Address" />
              <div>SUBSCRIBE</div>
            </div>
          </Col>
        </Row>
      </Col>
      <Col xs={24}>
        <Footer />
      </Col>
    </Row>
    </>
  );
}

export default Home;
