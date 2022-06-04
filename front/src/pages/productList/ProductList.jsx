import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Form,Input, Select, Slider, Pagination } from 'antd'
import { SearchOutlined } from "@ant-design/icons";
import Navbar from '../../components/navbar/Navbar'
import "./ProductList.scss"
import Footer from '../footer/Footer';
import ProductItem from '../home/ProductItem';

const imgs = [
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-1.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-2.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-3.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-4.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-5.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-6.jpg",
];

const category = ["Cactus", "Exotic", "Greens", "Popular", "Various", "Winter"]

function ProductList() {
  const { Option } = Select;
  const [maxPrice, setMaxPrice] = useState(0)
  const [minPrice, setMinPrice] = useState(0)
  const [form] = Form.useForm();
  
  const onSearch = (data) => {
    console.log(data);
  };
  const onPriceChange = (val) => {
    setMaxPrice(val[0])
    setMinPrice(val[1])
  }

  return (
    <div className='page-wrapper'>
      <div className=' page-container'>
        <Row >
          <Col xs={24}>
            <Navbar />
          </Col>

          <Col xs={24} className={"page-header"}>
            <h2>პროდუქტის გვერდი</h2>
            <p>Where flowers are our inspiration</p>
          </Col>
          <Col xs={24}>

            <Row gutter={[20, 20]} className="list">

              <Col className="product-list-sidebar" sm={5}>
                <div className="product-sidebar-wrapper">
                  <ul className="product-sidebar-category ">
                    <h6 className="category-header">კატეგორიები</h6>
                    {category.map((item, ind) => {
                      return (
                        <li key={ind}>
                          <Link to={item}>
                            {item}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                  <ul className="product-sidebar-category ">
                    <h6 className="category-header">ფასის შუალედი</h6>
                    <li className='range-input' >       <Slider range onChange={onPriceChange} defaultValue={[150, 350]} max={350} min={150} handleStyle={{ backgroundColor: "black", border: "none" }} trackStyle={{ backgroundColor: "black" }} />   </li>
                    <li>
                      ფასი: ${minPrice} - ${maxPrice}
                    </li>
                  </ul>
                </div>
              </Col>
              <Col xs={24} sm={19}>
                <Row>
                  <Col xs={24}>
                    <Form
                      layout={"horizontal"}
                      form={form}
                      initialValues={{
                        layout: "horizontal",
                      }}
                      onFinish={onSearch}
                    >
                      <SearchOutlined />
                      <Form.Item name={"search"}>
                        <Input placeholder="ძებნა" />
                      </Form.Item>

                    </Form>
                  </Col>
                </Row>
                <Row gutter={[30, 30]} justify={'center'} align={'middle'} className="product-list">
                  <Col className='product-list-sort' xs={24}>
                    <div>ნაჩვენებია 1–9;  სულ: 14;</div>
                    <Select
                      placeholder={"Sort by popularity"}
                    // dropdownClassName="new-user-select"
                    >
                      <Option value={"option"}>
                        {"Sort by populariTy"}
                      </Option>
                    </Select>
                  </Col>
                  {imgs.map((category, ind) => {
                    return <ProductItem xsSize={12} smSize={8} mdSize={8} key={ind} id={ind} imgSrc={category} />;
                  })}
                  <Col xs={24} className={"pagination-wrapper"}>
                    <Pagination size="small" total={50} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col xs={24}>
            <Footer />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ProductList