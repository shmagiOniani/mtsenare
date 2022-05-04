import React, { createRef, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Col, Row, Select, Form, Slider, Pagination } from 'antd'
import useTranslation from "../../components/translation/useTranslation";
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
  const { trans } = useTranslation();
  const { Option } = Select;
  const [form] = Form.useForm();
  const formRef = createRef();

  let history = useHistory();

  const [maxPrice, setMaxPrice] = useState(0)
  const [minPrice, setMinPrice] = useState(0)

  const onPriceChange = (val) => {
    setMaxPrice(val[0])
    setMinPrice(val[1])
  }

  const handleProductClick = (id) => {
    history.push(`/product/${id}`);
  }

  return (
    <div className='page-wrapper'>
      <div className=' page-container'>
        <Row >
          <Col xs={24}>
            <Navbar />
          </Col>

          <Col xs={24} className={"page-header"}>
            <h1>Product List</h1>
            <p>Where flowers are our inspiration</p>
          </Col>
          <Col xs={24}>

            <Row gutter={[20, 20]} className="list">

              <Col className="product-list-sidebar" xs={5}>
                <div className="product-sidebar-wrapper">
                  <ul className="product-sidebar-category ">
                    <h6 className="category-header">CATEGORIES</h6>
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
                    <h6 className="category-header">CATEGORIES</h6>
                    <li className='range-input' >       <Slider range onChange={onPriceChange} defaultValue={[150, 350]} max={350} min={150} handleStyle={{ backgroundColor: "black", border: "none" }} trackStyle={{ backgroundColor: "black" }} />   </li>
                    <li>
                      Price: ${minPrice} - ${maxPrice}
                    </li>
                  </ul>
                </div>
              </Col>
              <Col xs={19}>
                <Row gutter={[30, 30]} className="product-list">
                  <Col className='product-list-sort' xs={24}>
                    <div>Showing 1–9 of 14 results</div>
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
                    return <ProductItem  xsSize={24} smSize={8} mdSize={8} key={ind} id={ind} imgSrc={category} />;
                    // return (
                    //   <Col
                    //     xs={24}
                    //     sm={8}
                    //     md={8}
                    //     key={ind}
                    //     className="product-item item"

                    //   >
                    //     <div className="img-container" onClick={() => handleProductClick(ind)}>
                    //       <img src={category} alt="sasas" />
                    //     </div>
                    //     <div className="product-desc">
                    //       <h6>WINTER</h6>
                    //       <span>{ind}00$</span>
                    //     </div>
                    //   </Col>
                    // );
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