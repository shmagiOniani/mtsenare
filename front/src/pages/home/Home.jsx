import React, {useState} from "react";
import { Button, Col, Modal, Row } from "antd";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import ProductItem from "../../components/productItem/ProductItem";
import one from "../../assets/img/category-icon/categories-1.jpg";
import two from "../../assets/img/category-icon/categories-2.jpg";
import three from "../../assets/img/category-icon/categories-3.jpg";
import four from "../../assets/img/category-icon/categories-4.jpg";
import five from "../../assets/img/category-icon/categories-5.jpg";
import six from "../../assets/img/category-icon/categories-6.jpg";
import wappPaper from "../../assets/img/product/cut_bg_01.png";
import "./Home.scss";
import CloseButton from "../../components/elements/button/CloseButton";

const products = [
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
  const [ modalOpen, setModalOpen ] = useState(true)

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <Row className="wall-paper">
          <Col xs={12} className="img-container">
            <div className="img-wrapper">
              <img src={wappPaper} alt={"wall paper"} />
            </div>
          </Col>
          <Col xs={12}></Col>
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
                    <div className="name">{category.name}</div>
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
              <Link to={"/product-list"} className="custom-button">
                <span>shop best sellers</span>
              </Link>
            </div>
          </Col>
          <Col xs={18}>
            <div className="featured-slider">
              <OwlCarousel
                className="owl-theme"
                dots={false}
                items={"4"}
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
      </div>
      <Modal     
        className="subscribe-modal"
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        title={"sds"}
        visible={modalOpen}
        onCancel={() => setModalOpen(false)}
        width={400}
      > sadasdsd
        <CloseButton></CloseButton>
      
      </Modal>
    </div>

    // <div className="page-wrapper home-page">
    //   <div className="page-container">
    //     <Row className="home-wrapper">
    //       <Col xs={24}>
    //         <Row className="wall-paper">
    //           <Col xs={12}  className="img-container">
    //           <div className="img-wrapper">
    //             <img src={wappPaper} alt={"wall paper"} />
    //           </div>
    //           </Col>
    //           <Col xs={12}>
    //           <div className="headline">
    //             <h1>იპოვნე შენი მცენარე.</h1>
    //             <Link to="/product-list">Start Shopping</Link>
    //           </div>
    //           </Col>
    //         </Row>
    //       </Col>
    //       <Col xs={24}>
    //         <div className="featured-container">
    //           <div className="featured-header"></div>
    //           <div className="featured-slider">
    //             <OwlCarousel
    //               className="owl-theme"
    //               dots={false}
    //               items={"6"}
    //               loop
    //               margin={10}
    //               nav
    //             >
    //               {/* {imgs.map((product, ind) => {
    //                 return <ProductItem product={product} key={ind} id={ind} imgSrc={product.image} />;
    //               })} */}
    //             </OwlCarousel>
    //           </div>
    //         </div>
    //       </Col>
    //       <Col xs={24}>
    //         <Row gutter={[30, 30]} className="category-list"></Row>
    //       </Col>
    //       <Col xs={24}>
    //         <div className="slider-container">
    //           <div className="slider">
    //             <Carousel afterChange={onChange}>
    //               {imgs.map((item, ind) => {
    //                 return (
    //                   <div key={ind} className="slider-item">
    //                     <div className="avatar-container">
    //                       <img src={avatar} alt={"avatr"} />
    //                     </div>
    //                     <p>
    //                       Nullam dictum felis eu pede mollis pretium. Integer
    //                       tincidunt. Cras dapibus lingua.
    //                     </p>
    //                     <span>
    //                       <span>Anna Barnes</span>
    //                       <span>Florist</span>
    //                     </span>
    //                   </div>
    //                 );
    //               })}
    //             </Carousel>
    //           </div>
    //         </div>
    //       </Col>

    //       <Col xs={24}>
    //         <div className="home-about-section">
    //           <Row>
    //             <Col md={24} xl={12}>
    //               <h1>
    //                 We take flowers personally <br />& we bring you happiness
    //               </h1>
    //               <p>
    //                 Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    //                 Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
    //                 natoque penatibus et magnis dis parturient montes, nascetur
    //                 ridiculus mus. Donec quam felis, ultricies nec.
    //               </p>
    //             </Col>
    //             <Col md={24} xl={12}>
    //               <div className="img-container">
    //                 <img src={aboutImg} alt="product-img" />
    //               </div>
    //             </Col>
    //           </Row>
    //         </div>
    //       </Col>
    //       <Col xs={24}>
    //         <Row className="subscribe-container">
    //           <Col xs={24}>
    //             <h2>Join The Colorful Bunch!</h2>
    //           </Col>
    //           <Col xs={24}>
    //             <div className="sub-input">
    //               <input placeholder="ელ. ფოსტა..." />
    //               <div>
    //                 <Button
    //                   className="sub-input"
    //                   type="primary"
    //                   icon={<DownloadOutlined />}
    //                 >
    //                   გამოწერა
    //                 </Button>
    //               </div>
    //             </div>
    //           </Col>
    //         </Row>
    //       </Col>
    //       <Col xs={24}>
    //         <Footer />
    //       </Col>
    //     </Row>
    //   </div>
    // </div>
  );
}

export default Home;
