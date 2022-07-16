import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Form,Input, Select, Slider, Pagination } from 'antd'
import { SearchOutlined } from "@ant-design/icons";
import Navbar from '../../components/navbar/Navbar'
import "./ProductList.scss"
import Footer from '../footer/Footer';
import ProductItem from '../home/ProductItem';
const { Search } = Input;
const imgs = [
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-1.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-2.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-3.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-4.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-5.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-6.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-1.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-2.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-3.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-4.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-5.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-6.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-1.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-2.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-3.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-4.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-5.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-6.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-1.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-2.jpg",
];

const category = ["Cactus", "Exotic", "Greens", "Popular", "Various", "Winter"]

function ProductList() {
  const { Option } = Select;
  const [maxPrice, setMaxPrice] = useState(350)
  const [minPrice, setMinPrice] = useState(150)
  const [searchVal, setSearchVal] = useState("")
  
  const onSearch = (data) => {
    console.log(data);
  };

  const handleChange = (e) => {
    setSearchVal(e.target.value)
  } 
  const onPriceChange = (val) => {
    setMaxPrice(val[1])
    setMinPrice(val[0])
  }



  return (
    <div className='page-wrapper'>
      <div className=' page-container'>
        <Row >
          <Col xs={24}>
            <Navbar />
          </Col>
          {/* <Col xs={24} className={"page-header"}>
            <h2>პროდუქტის გვერდი</h2>
            <p>Where flowers are our inspiration</p>
          </Col>*/}
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
              <Col xs={24} sm={19} style={{paddingLeft:"25px", paddingRight:"25px"}}>
                <Row>
                  <Col xs={24} className="search-wrapper">
                      <Search className='search-input' placeholder="ძებნა..." onSearch={onSearch} onChange={handleChange} enterButton />
                      <div className="search-container">
                          <div className="search-list">

                          {imgs.map((category, ind) => {
                            return <ProductItem xsSize={12} smSize={8} mdSize={6} key={ind} id={ind} imgSrc={category} />;
                          })}
                            <div className="search-item">
                              <div className="img-wrapper">
                                <img src='' alt=''/>
                              </div>
                              <div className="item-body">
                                <h4>სატესტო დასახელება</h4>
                                <p>შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის შემქმნელებს</p>
                              </div>
                            </div>
                          </div>
                      </div>
                  </Col>
                </Row>
                <Row gutter={[30, 30]} justify={'center'} align={'middle'} className="product-list">
                  <Col className='product-list-sort' xs={24}>
                    <Select
                      placeholder={"პოპულარობის მიხედვთ"}
                      className="select-input"
                    >
                      <Option value={"option"}>
                        {"პოპულარობის მიხედვთ"}
                      </Option>
                      <Option value={"b"}>
                        {"შეფასების მიხედვით"}
                      </Option>
                    </Select>
                  </Col>
                  {imgs.map((category, ind) => {
                    return <ProductItem xsSize={12} smSize={8} mdSize={6} key={ind} id={ind} imgSrc={category} />;
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