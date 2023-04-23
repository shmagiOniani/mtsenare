import React, { useRef, useState } from "react";
import { Button, Col, Modal, Rate, Row } from "antd";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import ProductItem from "../../components/productItem/ProductItem";
import one from "../../assets/img/category-icon/categories-1.jpg";
import two from "../../assets/img/category-icon/categories-2.jpg";
import three from "../../assets/img/category-icon/categories-3.jpg";
import four from "../../assets/img/category-icon/categories-4.jpg";
import five from "../../assets/img/category-icon/categories-5.jpg";
import six from "../../assets/img/category-icon/categories-6.jpg";
import delivery from "../../assets/img/icon/delivery.png";
import payment from "../../assets/img/icon/payment.png";
import recall from "../../assets/img/icon/recall.png";
import support from "../../assets/img/icon/support.png";
import instagram from "../../assets/img/icon/instagram.svg";
import wappPaper from "../../assets/img/product/cut_bg_01.png";
import CloseButton from "../../components/elements/button/CloseButton";
import useCurrentWidth from "../../hooks/useCurrentWidth";
import "./Home.scss";
import CustomButton from "../../components/elements/button/CustomButton";

const products = [
  {
    name: "Pine Tree",
    image:
      "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-1.jpg",
  },
  {
    name: "Echeveria Succulent",
    image:
      "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-2.jpg",
  },
  {
    name: "Jade Succulent",
    image:
      "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-3.jpg",
  },
  {
    name: "DSd",
    image:
      "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-4.jpg",
  },
  {
    name: "DSd",
    image:
      "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-5.jpg",
  },
  {
    name: "DSd",
    image:
      "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-6.jpg",
  },
];
const imgs = [
  {
    name: "Air Purifying",
    image: one,
  },
  {
    name: "Ceramic Pots",
    image: two,
  },
  {
    name: "Herb Seeds",
    image: three,
  },
  {
    name: "Indoor Plants",
    image: four,
  },
  {
    name: "Low Maintenance",
    image: five,
  },
  {
    name: "Plant Bundle",
    image: six,
  },
];

function Home() {
  const { width } = useCurrentWidth();

  const [modalOpen, setModalOpen] = useState(true);
  
  const subscribeRef = useRef(null);
  const handleSubscribe = (data) => {
    console.log(data);
  };

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <Row className="wall-paper">
          <Col xs={12} className="img-container">
            <div className="img-wrapper">
              <img src={wappPaper} alt={"wall paper"} />
            </div>
          </Col>
          {/* <Col xs={12}></Col> */}
        </Row>
        <Row className="category-list">
          {imgs.map((category, ind) => {
            return (
              <Col xs={12} md={4} key={ind}>
                <Link to={"/product-list"}>
                  <div className="category-item">
                    <div className="icon">
                      <img
                        src={category.image}
                        alt=""
                        width={178}
                        height={178}
                      />
                    </div>
                    <h5 className="name">{category.name}</h5>
                  </div>
                </Link>
              </Col>
            );
          })}
        </Row>
        <Row className="most-popular">
          <Col xs={6}>
            <div className="header-wrapper">
              <div className="header">
                Most <span>Popular</span>
              </div>
              <p>Meet our most lovable plants.</p>
              <CustomButton className="custom-button" type={'default'}>
                <span>shop best sellers</span>
              </CustomButton>
            </div>
          </Col>
          <Col xs={18}>
            <div className="featured-slider">
              <OwlCarousel
                className="owl-theme"
                dots={false}
                items={
                  width > 1700
                    ? "4"
                    : width > 1300
                    ? "4"
                    : width > 1000
                    ? "3"
                    : width > 700
                    ? "2"
                    : "2"
                }
                loop
                margin={40}
                nav
              >
                {products.map((product, ind) => {
                  return (
                    <ProductItem
                      product={product}
                      key={ind}
                      id={ind}
                      imgSrc={product.image}
                    />
                  );
                })}
              </OwlCarousel>
            </div>
          </Col>
        </Row>
        <Row className="discover-items">
          <div className="header-wrapper">
            <div className="header">
              Discover Our <span>Favorites</span>
            </div>
            <p>
              Seed some happiness with our top picks for smart grow lights,
              gardening kits, accessories and more.
            </p>
            <Link to={"/product-list"} className="custom-button">
              <span>shop all</span>
            </Link>
          </div>
        </Row>
        <Row className="product-type" gutter={[30]}>
          <Col xs={8}>
            <div className="item-wrapper">
              <div className="img-container">
                <img
                  src={
                    "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/banner-4.jpg"
                  }
                  alt="rame"
                />
              </div>
              <Link to={"/product-list"} className="custom-button">
                <span>shop best sellers</span>
              </Link>
            </div>
          </Col>
          <Col xs={8}>
            <div className="item-wrapper">
              <div className="img-container">
                <img
                  src={
                    "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/banner-5.jpg"
                  }
                  alt="rame"
                />
              </div>
              <Link to={"/product-list"} className="custom-button">
                <span>shop best sellers</span>
              </Link>
            </div>
          </Col>
          <Col xs={8}>
            <div className="item-wrapper">
              <div className="img-container">
                <img
                  src={
                    "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/banner-6.jpg"
                  }
                  alt="rame"
                />
              </div>
              <Link to={"/product-list"} className="custom-button">
                <span>shop best sellers</span>
              </Link>
            </div>
          </Col>
        </Row>
        <Row className="most-popular">
          <Col xs={6}>
            <div className="header-wrapper">
              <div className="header">
                Best <span>Sellers</span>
              </div>
              <p>Meet our most lovable plants.</p>
              {/* <Link to={"/product-list"} className="custom-button">
                <span>shop best sellers</span>
              </Link> */}
               <CustomButton className="custom-button" type={'default'}>
                <span>shop best sellers</span>
              </CustomButton>
            </div>
          </Col>
          <Col xs={18}>
            <div className="featured-slider">
              <OwlCarousel
                className="owl-theme"
                dots={false}
                items={"3"}
                loop
                margin={40}
                nav
              >
                {products.map((product, ind) => {
                  return (
                    <ProductItem
                      product={product}
                      key={ind}
                      id={ind}
                      imgSrc={product.image}
                    />
                  );
                })}
              </OwlCarousel>
            </div>
          </Col>
        </Row>
        <hr />
        <Row className="slider-wrapper">
          <Col xs={12}>
            <div className="img-wrapper">
              <img
                width="615"
                height="457"
                alt="some-img"
                src="https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/img-2.jpg"
                className="main-img"
              />
              <img
                width="281"
                height="268"
                alt="sub-image"
                src="https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/img-3.png"
                className="elementor-img"
              />
              <img
                width="106"
                height="106"
                alt="rolling-image"
                src="https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/text-rotate.png"
                className="rolling-stone"
              />
            </div>
          </Col>
          <Col xs={12}>
            <div className="featured-container">
              <div className="featured-slider">
                <OwlCarousel
                  className="owl-theme"
                  items={"1"}
                >
                  {imgs.map((product, ind) => {
                     return(
                      <div className="list-item">
                        <div className="rate">
                          <span>“</span>
                          <Rate  value={3} />
                        </div>
                        <div className="quot">“ Very happy with flacio; plants arrived in <br/> excellent condition, were healthy... </div>
                        <div className="author">Ann Smith</div>
                      </div>
                      )
                   })}
                </OwlCarousel>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="services">
          <Row gutter={[30]} className="service-container">
            <Col xs={6} className="service-item">
              <img width={60} height={60} src={delivery} alt="delivery" />
              <h3>Free delivery</h3>
            </Col>
            <Col xs={6} className="service-item">
              <img width={60} height={60} src={payment} alt="payment" />
              <h3>Secure payments</h3>
            </Col>
            <Col xs={6} className="service-item">
              <img width={60} height={60} src={support} alt="support" />
              <h3>Top-notch support</h3>
            </Col>
            <Col xs={6} className="service-item">
              <img width={60} height={60} src={recall} alt="recall" />
              <h3>180 Days Return</h3>
            </Col>
          </Row>
        </Row>
        <Row className="instagram-section">
          <div className="title">
            <h2>#flaciogreen</h2>
            <p>Our community has a thing for plant styling. Get inspired.</p>
          </div>
          <Row className="container" gutter={[30]}>
            <Col xs={12}>
              <div className="img-container">
                <Link to={"product-list"}>
                  <img className="main-img" src="https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/ig-1.jpg" alt="" />
                  <div className="overflow"/>
                   <img width={30} heigh={30} src={instagram} alt="instagram" className="instagram"/>
                </Link>
              </div>
            </Col>
            <Col xs={12} className="quarter">
              <Row  gutter={[30, 16]}>
                <Col xs={12}>
                  <div>
                   <Link to={"product-list"}>
                    <img className="main-img" src="https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/ig-2.jpg" alt="" />
                   </Link>
                   <div className="overflow"/>
                   <img width={30} heigh={30} src={instagram} alt="instagram" className="instagram"/>
                  </div>
                </Col>
                <Col xs={12}>
                  <div>
                   <Link to={"product-list"}>
                    <img className="main-img" src="https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/ig-2.jpg" alt="" />
                   </Link>
                   <div className="overflow"/>
                   <img width={30} heigh={30} src={instagram} alt="instagram" className="instagram"/>
                  </div>
                </Col>
                <Col xs={12}>
                  <div>
                   <Link to={"product-list"}>
                    <img className="main-img" src="https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/ig-2.jpg" alt="" />
                   </Link>
                   <div className="overflow"/>
                   <img width={30} heigh={30} src={instagram} alt="instagram" className="instagram"/>
                  </div>
                </Col>
                <Col xs={12}>
                  <div>
                   <Link to={"product-list"}>
                    <img className="main-img" src="https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/ig-2.jpg" alt="" />
                   </Link>
                   <div className="overflow"/>
                   <img width={30} heigh={30} src={instagram} alt="instagram" className="instagram"/>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Row>
      </div>
      <Modal
        className="subscribe-modal"
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        title={"sds"}
        visible={modalOpen}
        onCancel={() => setModalOpen(false)}
        width={800}
      >
        <Row>
          <Col xs={12}>
            <div className="img-wrapper">
              <img
                src="https://wpbingosite.com/wordpress/flacio/wp-content/themes/flacio/images/newsletter-image.jpg"
                alt="subscribe-img"
              />
            </div>
          </Col>
          <Col xs={12}>
            <div className="modal-header" onClick={() => setModalOpen(false)}>
              <CloseButton />
            </div>
            <div className="modal-body">
              <div className="header">
                Get <br /> free <span>Shipping</span>
              </div>
              <div className="paragraph">
                on your first order. Offer ends soon.
              </div>
              <div className="input-wrapper">
                <input ref={subscribeRef} placeholder="მიუთითეთ იმეილი ..." />
                <button
                  onClick={() => handleSubscribe(subscribeRef.current.value)}
                >
                  გამოწერა
                </button>
              </div>
              <div className="no-case" onClick={() => setModalOpen(false)}>
                <div>არა მადლობა!</div>
              </div>
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default Home;
