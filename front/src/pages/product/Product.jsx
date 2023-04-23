import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import OwlCarousel from "react-owl-carousel";
import {
  Col,
  Row,
  Tabs,
  InputNumber,
  Button,
  Tooltip,
  Divider,
  Breadcrumb,
} from "antd";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import Footer from "../footer/Footer";
import ProductItem from "../../components/productItem/ProductItem";
import useTranslation from "../../hooks/useTranslation";
import useCurrentWidth from "../../hooks/useCurrentWidth";
import "./Product.scss";
import CustomButton from "../../components/elements/button/CustomButton";

const imgs = [
  {
    name: "DSd",
    image:
      "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-1.jpg",
  },
  {
    name: "DSd",
    image:
      "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-2.jpg",
  },
  {
    name: "DSd",
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
  // {
  //   name: "DSd",
  //   image: "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-6.jpg",
  // },
];

const related = [
  {
    name: "DSd",
    image:
      "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-1.jpg",
  },
  {
    name: "DSd",
    image:
      "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-2.jpg",
  },
  {
    name: "DSd",
    image:
      "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-3.jpg",
  },
  {
    name: "DSd",
    image:
      "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-4.jpg",
  },
];

function Product() {
  const { trans } = useTranslation();
  const { width } = useCurrentWidth();
  const { TabPane } = Tabs;

  const [quantity, setQuantity] = useState(1);

  const handlePlus = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleChange = (val) => {
    console.log(val);
    if (val) {
      setQuantity(val);
    } else {
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="product-page-wrapper">
      <Row className="page-container">
        {/* <Col xs={24} className={"page-header"}>
          <h1>Product Description</h1>
          <p>Where flowers are our inspiration</p>
        </Col> */}
        <Col xs={24}>
          <Row justify={"space-between"}>
            <Col xs={24} sm={13}>
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
            <Col xs={24} sm={9}>
              <div className="product-details">
                <div style={{ "margin-bottom": "7px" }}>
                  <Breadcrumb separator=">">
                    <Breadcrumb.Item href="sdsd">{`Home`}</Breadcrumb.Item>
                    <Breadcrumb.Item href="sdsd">{`Application Center`}</Breadcrumb.Item>
                    <Breadcrumb.Item href="sdsd">{`Application List`}</Breadcrumb.Item>
                    <Breadcrumb.Item href="sdsd">{`An Application`}</Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                <h3>სატესტო დასახელება</h3>
                <h4>$259</h4>
                <Divider />
                <p className="product-description">
                  შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და
                  ტიპოგრაფიული ნაწარმის შემქმნელებს, რეალურთან მაქსიმალურად
                  მიახლოებული შაბლონი წარუდგინონ შემფასებელს. ხშირადაა
                  შემთხვევა, როდესაც დიზაინის შესრულებისას საჩვენებელია, თუ
                  როგორი იქნება ტექსტის ბლოკი. სწორედ ასეთ დროს არის
                  მოსახერხებელი 
                </p>
                <div className="add-product-cart">
                  {/* <InputNumber value={quantity} min={1} max={20} onChange={handleChange} /> */}
                  <div className="up-down">
                    <div className="up" onClick={handleMinus}>
                      <CaretLeftOutlined />
                    </div>
                    {/* <div className="amount" onClick={() => console.log(quantity)}>{quantity}</div> */}
                    <InputNumber
                      className="amount"
                      value={quantity}
                      min={1}
                      max={20}
                      onChange={handleChange}
                    />

                    <div className="down" onClick={handlePlus}>
                      <CaretRightOutlined />
                    </div>
                  </div>
                  <CustomButton
                    className="add-button"
                    htmlType={"submit"}
                    type={"primary"}
                    size={"large"}
                  >
                    კალათაში დამატება
                  </CustomButton>
                  <Tooltip title="ფავორიტებში დამატება">
                    <CustomButton
                      size={"large"}
                      type={"default"}
                      className={"favorite-btn"}
                    >
                      <HeartOutlined />
                    </CustomButton>
                  </Tooltip>
                </div>
                <CustomButton
                  className="buy-button"
                  htmlType={"submit"}
                  type={"primary"}
                  size={"large"}
                >
                  შეიძინეთ ახლავე
                </CustomButton>
                <Divider />
                <div className="product-ident">
                  <div>
                   <span> SKU:</span> D2300-2
                  </div>
                  <div>
                   <span> Category:</span> <CustomButton type={"link"}>Air Purifying</CustomButton>
                  </div>
                  <div>
                   <span> Tags:</span> <CustomButton type={"link"}>Hot</CustomButton>,<CustomButton type={"link"}>Trend</CustomButton> 
                  </div>
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
                  <p>
                    Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
                    tellus. Phasellus viverra nulla ut metus varius laoreet.
                    Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel
                    augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.
                    Etiam rhoncus. Maecenas tempus, tellus eget condimentum
                    rhoncus, sem quam semper libero, sit amet adipiscing sem
                    neque sed ipsum. Nam quam nunc, blandit vel, luctus
                    pulvinar, hendrerit id, lorem. Maecenas nec odio et ante
                  </p>
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
                      <div className="content">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Porro minus saepe explicabo ullam maxime nisi corrupti
                        ratione quidem temporibus dolores.
                      </div>
                    </div>
                    <div className="review-item">
                      <div className="icon">R</div>
                      <div className="content">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Porro minus saepe explicabo ullam maxime nisi corrupti
                        ratione quidem temporibus dolores.
                      </div>
                    </div>
                  </div>
                  <Row>
                    <Col xs={24}>
                      <div className="comment-iinput">
                        <TextArea
                          placeholder={trans("product_desc")}
                          rows={5}
                        />
                      </div>
                      <div className="comment-button">
                        <Button>კომენტარის დამატება</Button>
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
                dots={false}
                items={
                  width > 1700
                    ? "5"
                    : width > 1500
                    ? "4"
                    : width > 1000
                    ? "3"
                    : width > 700
                    ? "2"
                    : "2"
                }
                loop
                margin={10}
                nav
              >
                {related.map((product, ind) => {
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
          </div>
        </Col>
        <Col xs={24}>
          <Footer />
        </Col>
      </Row>
    </div>
  );
}

export default Product;
