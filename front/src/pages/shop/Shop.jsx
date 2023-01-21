import React from 'react'
import { Col, Row, Button, Rate, Tabs } from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import { MessageOutlined,  FrownOutlined, MehOutlined, SmileOutlined, BellOutlined } from "@ant-design/icons";
import Navbar from '../../components/navbar/Navbar'
import useTranslation from '../../hooks/useTranslation';
import ProductItem from '../../components/productItem/ProductItem';
import avatar from "../../assets/img/avatar.png";

import Footer from '../footer/Footer';
import "./Shop.scss"

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

function Shop() {
  const { trans } = useTranslation();
  const { TabPane } = Tabs;


  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

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
            <Col xs={24}>
                <Row>
                  <Col className="action-wrapper rate-seller" xs={24} md={12}>
                    <div className="action-container">
                      <Rate defaultValue={3} character={({ index }) => customIcons[index + 1]} />
                    </div>
                  </Col>
                  <Col  className="action-wrapper" xs={24} md={12}>
                    <div className="action-container">
                      <Button icon={<MessageOutlined />} size={"large"}>კონტაქტი</Button>
                      <div className="notification-bell">
                        <BellOutlined />
                      </div>
                    </div>
                  </Col>
                </Row>

            </Col>
          </Row>
        </Col>
        <Col className="details-wrapper" xs={24}>
          <div className="details-container">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 32 }}>
                <TabPane tab="აღწერა" key="1">
                  <Row gutter={[30,30]} className="product-list">
                    {imgs.map((product, ind) => {
                      return <ProductItem product={product}  xsSize={24} smSize={8} key={ind} id={ind} imgSrc={product.image} />;
                    })}
                  </Row>
                </TabPane>
                <TabPane tab="შეფასებები და კომენტარები (22)" key="2">
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
        <Col xs={24}>
          <Footer />
        </Col>
      </Row>
    </div>
  )
}

export default Shop