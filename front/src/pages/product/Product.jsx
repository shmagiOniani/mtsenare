import React, {  useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import OwlCarousel from "react-owl-carousel";
import { Col, Row, Tabs, InputNumber, Button } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import TextArea from 'antd/lib/input/TextArea';
import Navbar from '../../components/navbar/Navbar'
import Footer from '../footer/Footer';
import ProductItem from '../../components/productItem/ProductItem';
import useTranslation from '../../hooks/useTranslation';
import useCurrentWidth from '../../hooks/useCurrentWidth';
import "./Product.scss";




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
  // {
  //   name: "DSd",
  //   image: "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-6.jpg",
  // },
];


const related = [
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
];

function Product() {
  const { trans } = useTranslation();
  const { width } = useCurrentWidth();
  const { TabPane } = Tabs;

  const [quantity, setQuantity] = useState(1)

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

  useEffect(()=> {
    window.scrollTo(0, 0)
  },[])

  return (
    <div className='product-page-wrapper'>
      <Row className="page-container">

        <Col xs={24}>
          <Navbar />
        </Col>
        {/* <Col xs={24} className={"page-header"}>
          <h1>Product Description</h1>
          <p>Where flowers are our inspiration</p>
        </Col> */}
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
                        <img src={img.image} alt="product img" />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div className="product-details">
                <h2>სატესტო დასახელება</h2>
                <div className="price">$259</div>
                <p className='product-description'>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc.</p>
                <div className="add-product-cart">


                  <InputNumber value={quantity} min={1} max={20} onChange={handleChange} />
                  <div className="up-down">
                    <div className="up" onClick={handleMinus}><CaretLeftOutlined /></div>
                    <div className="amount" onClick={() => console.log(quantity)}>{quantity}</div>
                    <div className="down" onClick={handlePlus}><CaretRightOutlined /></div>
                  </div>
                  <Button className='add-button' htmlType='submit'>კალათაში დამატება</Button>

                </div>

              </div>
            </Col>
          </Row>
        </Col>
        <Col className="details-wrapper" xs={24}>
          <div className="details-container">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 32 }}>
              <TabPane tab="აღწერა" key="1">
                <div className="desc-tab-container">
                  <h2>The power of flowers</h2>
                  <p>Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante</p>
                </div>
              </TabPane>
              <TabPane tab="დამატებითი მახასიათებლები" key="2">
                <div className="info-tab-container">
                  <div className="key"></div>
                  <div className="value"></div>
                </div>
              </TabPane>
              <TabPane tab="შეფასებები და კომენტარები (22)" key="3">
                <div className="reviews-tab-container">
                  <div className="review-container">
                    <div className="review-item">
                      <div className="icon">R</div>
                      <div className="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro minus saepe explicabo ullam maxime nisi corrupti ratione quidem temporibus dolores.</div>
                    </div>
                    <div className="review-item">
                      <div className="icon">R</div>
                      <div className="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro minus saepe explicabo ullam maxime nisi corrupti ratione quidem temporibus dolores.</div>
                    </div>
                  </div>
                  <Row>
                    <Col xs={24}>
                      <div className='comment-iinput'>
                        <TextArea  placeholder={trans("product_desc")} rows={5} />
                      </div>
                      <div className='comment-button'>
                        <Button >კომენტარის დამატება</Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </Col>
        {/* relative products */}
        <Col xs={24}>
          <div className="related-product">
            <h5>მსგავსი პროდუქტი</h5>
            <div className="featured-slider">
                <OwlCarousel
                  className="owl-theme"
                  dots={true}
                  items={width > 1000 ? "3" : width > 700 ? "2" : "2"}
                  loop
                  margin={10}
                  nav
                >
              {related.map((product, ind) => {
                return (
                  <ProductItem product={product} key={ind} id={ind} imgSrc={product.image} />
                );
              })}
              </OwlCarousel>
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

export default Product