import React, { createRef, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useHistory, Link, useLocation } from 'react-router-dom';
import { Col, Row, Select, Form, Slider, Tabs, InputNumber, Button } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import useTranslation from "../../components/translation/useTranslation";
import Navbar from '../../components/navbar/Navbar'
import Footer from '../home/Footer';
import "./Product.scss";

const imgs = [
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-1.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-2.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-3.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-4.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-5.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-6.jpg",
];

const related = [
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-1.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-2.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-3.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-4.jpg",
];

function Product() {
  const { trans } = useTranslation();
  const { Option } = Select;
  const { TabPane } = Tabs;

  const [quantity, setQuantity] = useState(1)


  let history = useHistory();
  const location = useLocation();

  const handleProductClick = (id) => {
    history.push(`/product/${id}`);
  }

  const handlePlus = () => {
    setQuantity((prev) => prev + 1)
  }
  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleChange = (val) => {
    console.log(val);
    if (val) {
      setQuantity(val)
    } else {

    }
  }

  // history.push('/home');
  // location.pathname


  return (
    <div className='page-wrapper'>
      <Row className="page-container">

        <Col xs={24}>
          <Navbar />
        </Col>
        <Col xs={24} className={"page-header"}>
          <h1>Product Description</h1>
          <p>Where flowers are our inspiration</p>
        </Col>
        <Col xs={24}>
          <Row justify={"space-between"}>
            <Col xs={24} sm={12}>
              <div className="product-imgs">
                <Carousel
                  autoPlay={false}
                  interval={2000}
                  infiniteLoop={true}
                  emulateTouch={true}
                  showStatus={false}
                  showIndicators={false}
                >
                  {imgs.map((img, ind) => {
                    return (
                      <div key={ind} className="product-slider-item">
                        <img src={img} />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div className="product-details">
                <h1>Orange Amaryllis</h1>
                <div className="price">$259</div>
                <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc.</p>
                <div className="add-product-cart">


                  <InputNumber value={quantity} min={1} max={20} onChange={handleChange} />
                  <div className="up-down">
                    <div className="up" onClick={handleMinus}><CaretLeftOutlined /></div>
                    <div className="amount" onClick={() => console.log(quantity)}>{quantity}</div>
                    <div className="down" onClick={handlePlus}><CaretRightOutlined /></div>
                  </div>
                  <Button className='add-button' htmlType='submit'>ADD TO CART</Button>

                </div>

              </div>
            </Col>
          </Row>
        </Col>
        <Col className="details-wrapper" xs={24}>
          <div className="details-container">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 32 }}>
              <TabPane tab="DESCRIPTION" key="1">
                <div className="desc-tab-container">
                  <h2>The power of flowers</h2>
                  <p>Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante</p>
                </div>
              </TabPane>
              <TabPane tab="ADDITIONAL INFORMATION" key="2">
                <div className="info-tab-container">
                  <div className="key"></div>
                  <div className="value"></div>
                </div>
              </TabPane>
              <TabPane tab="REVIEWS (22)" key="3">
                <div className="reviews-tab-container">
                  <h3>The power of flowers</h3>
                  <p>Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante</p>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </Col>
        <Col xs={24}>
          <div className="related-product">
            <h5>RELATED PRODUCTS</h5>
            <Row gutter={[20, 20]}>
              {related.map((category, ind) => {
                return (
                  <Col
                    xs={24}
                    sm={6}
                    md={6}
                    key={ind}
                    className="product-item item"

                  >
                    <div className="img-container" onClick={() => handleProductClick(ind)}>
                      <img src={category} alt="sasas" />
                    </div>
                    <div className="product-desc">
                      <h6>WINTER</h6>
                      <span>{ind}00$</span>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Col>
        <Col xs={24}>
          <Footer />
        </Col>
      </Row>
    </div>
  )
}

export default Product