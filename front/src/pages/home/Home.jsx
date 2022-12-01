import React from "react";
import { Col, Row, Button, Carousel } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import OwlCarousel from "react-owl-carousel";
import wappPaper from "../../assets/img/product/cut_bg_01.png";
import avatar from "../../assets/img/avatar.png";
import aboutImg from "../../assets/img/home-about.jpg";
import Footer from "../footer/Footer";
import "./Home.scss";
import { Link } from "react-router-dom";

const imgs = [
  {
    name: "DSd",
    image: "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-1.jpg",
  },
  {
    name: "DSd",
    image: "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-2.jpg",
  },
  {
    name: "DSd",
    image: "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-3.jpg",
  },
  {
    name: "DSd",
    image: "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-4.jpg",
  },
  {
    name: "DSd",
    image: "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-5.jpg",
  },
  {
    name: "DSd",
    image: "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-6.jpg",
  },
];

function Home() {

  const onChange = (a, b, c) => {
    console.log(a, b, c);
  };

  return (
    <div className="page-wrapper home-page">
      <div className="page-container">
        <Row className="home-wrapper">
          <Col xs={24}>
            <Row className="wall-paper">
              <Col xs={12}  className="img-container">
              <div className="img-wrapper">
                <img src={wappPaper} alt={"wall paper"} />
              </div>
              </Col>
              <Col xs={12}>
              <div className="headline">
                <h1>იპოვნე შენი მცენარე.</h1>
                <Link to="/product-list">Start Shopping</Link>
              </div>
              </Col>
            </Row>
          </Col>
          <Col xs={24}>
            <div className="featured-container">
              <div className="featured-header"></div>
              <div className="featured-slider">
                <OwlCarousel
                  className="owl-theme"
                  dots={false}
                  items={"6"}
                  loop
                  margin={10}
                  nav
                >
                  {/* {imgs.map((product, ind) => {
                    return <ProductItem product={product} key={ind} id={ind} imgSrc={product.image} />;
                  })} */}
                </OwlCarousel>
              </div>
            </div>
          </Col>
          <Col xs={24}>
            <Row gutter={[30, 30]} className="category-list"></Row>
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
                          tincidunt. Cras dapibus lingua.
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
            <div className="home-about-section">
              <Row>
                <Col md={24} xl={12}>
                  <h1>
                    We take flowers personally <br />& we bring you happiness
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                    natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Donec quam felis, ultricies nec.
                  </p>
                </Col>
                <Col md={24} xl={12}>
                  <div className="img-container">
                    <img src={aboutImg} alt="product-img" />
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
              <Col xs={24}>
                <div className="sub-input">
                  <input placeholder="ელ. ფოსტა..." />
                  <div>
                    <Button
                      className="sub-input"
                      type="primary"
                      icon={<DownloadOutlined />}
                    >
                      გამოწერა
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={24}>
            <Footer />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Home;
