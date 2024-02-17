import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import { Helmet } from "react-helmet";
import {
  Col,
  Row,
  Input,
  Select,
  Slider,
  Pagination,
  Tooltip,
  Button,
} from "antd";
import {
  two,
  five,
  seven,
  eight,
  nine,
  ten,
  eleven,
  one,
} from "../../assets/img/product";

import "./ProductList.scss";
import ProductItem from "../../components/productItem/ProductItem";
import AddProduct from "../../components/modal/addProduct/AddProduct";
import "antd/dist/antd.css";
import API from "../../utils/services/API";
import ShopItem from "./ShopItem";
import CustomButton from "../../components/elements/button/CustomButton";
import PageHeader from "../../components/pageHeader/PageHeader";
import { products } from "../../assets/fakeData/fakeData";
// import ProductItemNew from "../../components/productItemNew/ProductItemNew";

const { Search } = Input;
const imgs = [
  eleven,
  two,
  nine,
  eight,
  five,
  ten,
  seven,
  eight,
  nine,
  ten,
  eleven,
  five,
];

const SHOPS_LIST = [
  {
    imgSrc: one,
    name: "ZZ Plant",
    oldPrice: "80",
    newPrice: "50",
    rate: 3,
    id: "tg34gfrv43grve",
  },
  {
    imgSrc: one,
    name: "Jade Succulent",
    oldPrice: "150",
    newPrice: "100",
    rate: 5,
    id: "dfes54676i5h4gerw",
  },
  {
    imgSrc: one,
    name: "Palm",
    oldPrice: "79",
    newPrice: "50",
    rate: 0,
    id: "dfvgtryh5y34ref",
  },
];

function ProductList() {
  const { Option } = Select;
  let history = useHistory();

  const [categoryList, setCategoryList] = useState([]);

  const [maxPrice, setMaxPrice] = useState(350);
  const [minPrice, setMinPrice] = useState(150);
  const [searchVal, setSearchVal] = useState("");
  const [hideSearch, setHideSearch] = useState(false);
  const [productList, setProductList] = useState([]);

  const onSearch = (data) => {
    console.log(data);
  };

  const getLibraryes = () => {
    API.get(`/api/categories?all=true`).then((res) => {
      // let categoryInst = res.data.items.find((item)=> item.name === "Category").library
      setCategoryList(res.data.items);
    });
  };

  const handleSearchChange = (e) => {
    setSearchVal(e.target.value);
    setHideSearch(true);
    setTimeout(() => {
      if (e.target.value.length) {
      } else {
        setHideSearch(false);
      }
    }, 1000);
    console.log(e.target.value.length);
  };

  const onFilterPriceChange = (val) => {
    setMaxPrice(val[1]);
    setMinPrice(val[0]);
  };

  const navigateToProduct = (e, id) => {
    history.push(`/product/${id}`);
  };

  const handleCloseSearch = (e) => {
    setHideSearch(false);
  };



  const getProductList = () => {
    API.get(`/api/products?all=true`).then((res) => {
      setProductList(res.data.items);
    });
  };

  useEffect(() => {
    getProductList();
    getLibraryes();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Product list</title>
        <link rel="canonical" href="http://mysite.com/product-list" />
      </Helmet>
      <div className="page-wrapper product-list-page">
       
        <PageHeader>
        <h2>Shop</h2>
            <Row justify="center" style={{ width: "100%" }}>
              <Col xs={12}>
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
                        <div className="slider-item" key={ind}>
                          <div className="img-wrapper">
                            <img width={50} height={50} src={product.image} />
                          </div>
                          <div className="title">
                            <h5>{product.name}</h5>
                          </div>
                        </div>
                        // <ProductItem
                        //   product={product}
                        //   key={ind}
                        //   id={ind}
                        //   imgSrc={product.image}
                        // />
                      );
                    })}
                  </OwlCarousel>
                </div>
              </Col>
            </Row>
        </PageHeader>
        {/* <Row
          className="section-header"
          justify={"center"}
          align={"middle"}
          style={{ width: "100%" }}
        >
          <Col xs={24} className={"page-header"}>
            <h2>Shop</h2>
            <Row justify="center" style={{ width: "100%" }}>
              <Col xs={12}>
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
                        <div className="slider-item" key={ind}>
                          <div className="img-wrapper">
                            <img width={50} height={50} src={product.image} />
                          </div>
                          <div className="title">
                            <h5>{product.name}</h5>
                          </div>
                        </div>
                        // <ProductItem
                        //   product={product}
                        //   key={ind}
                        //   id={ind}
                        //   imgSrc={product.image}
                        // />
                      );
                    })}
                  </OwlCarousel>
                </div>
              </Col>
            </Row>
          </Col>
        </Row> */}
        <div className=" page-container">
          <Row>
            <Col xs={24}>
              <Row gutter={[30, 30]} className="list">
                <Col className="product-list-sidebar" sm={7}>
                  <div className="product-sidebar-wrapper">
                    <ul className="product-sidebar-category ">
                      <h4 className="category-header">ფილტრები</h4>

                      {categoryList.map((item, ind) => {
                        return (
                          <li key={ind}>
                            <Link to={item.name}>
                              <span>{item.name}</span>
                              <span>3</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    <ul className="product-sidebar-category ">
                      <h4 className="category-header">ფასი</h4>
                      <li className="range-input">
                        <Slider
                          range
                          onChange={onFilterPriceChange}
                          defaultValue={[150, 350]}
                          max={350}
                          min={150}
                          handleStyle={{
                            backgroundColor: "black",
                            border: "none",
                          }}
                          trackStyle={{ backgroundColor: "black" }}
                        />
                      </li>
                      <li className="range-view">
                        შუალედი:{" "}
                        <span>
                          ${minPrice} - ${maxPrice}
                        </span>
                      </li>
                    </ul>
                    <ul className="product-sidebar-category ">
                      <h4 className="category-header">მაღაზიები</h4>
                      {SHOPS_LIST.map((shop, index) => {
                        return <ShopItem key={index} data={shop} />;
                      })}
                    </ul>
                  </div>
                </Col>
                {/* <div className="img-decorations">
                <img src={two} alt="" />
                <img src={five} alt="" />
                </div> */}
                <Col className="product-list-sidebar" xs={24} sm={17}>
                  <Row>
                    <Col xs={24} className="search-wrapper">
                      <Search
                        className="search-input"
                        placeholder="ძებნა..."
                        onSearch={onSearch}
                        onChange={handleSearchChange}
                        enterButton
                      />
                      <div
                        className={`${
                          searchVal.length ? "start-show" : "start-hide"
                        } ${hideSearch ? "show" : "hide"} search-container`}
                      >
                        <div
                          onBlur={(e) => handleCloseSearch(e)}
                          className="search-list"
                        >
                          {imgs.map((category, ind) => {
                            return (
                              <div
                                onClick={(e) => navigateToProduct(e, ind)}
                                key={ind}
                                className="search-item"
                              >
                                <div className="img-wrapper">
                                  <img src={category} alt="" />
                                </div>
                                <div className="item-body">
                                  <h4>სატესტო დასახელება</h4>
                                  <p>
                                    შემთხვევითად გენერირებული ტექსტი ეხმარება
                                    დიზაინერებს და ტიპოგრაფიული ნაწარმის
                                    შემქმნელებს
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row
                    gutter={[30, 30]}
                    justify={"center"}
                    align={"middle"}
                    className="product-list"
                  >
                    <Col className="product-list-sort" xs={24}>
                      
                      <Select
                        placeholder={"პოპულარობის მიხედვთ"}
                        className="select-input"
                      >
                        <Option value={"option"}>
                          {"პოპულარობის მიხედვთ"}
                        </Option>
                        <Option value={"b"}>{"შეფასების მიხედვით"}</Option>
                      </Select>
                    </Col>
                    {products.map((product, ind) => {
                      return (
                        <ProductItem
                          xsSize={24}
                          smSize={12}
                          mdSize={8}
                          lgSize={6}
                          key={product._id || ind}
                          // imgSrc={`../../assets/img/plant-data/uploads/${product.images[1]}`}
                          imgSrc={product.image}
                          product={product}
                          refresh={getProductList}
                        />
                      );
                    })}

                    {/* {productList.length &&
                      productList.map((product, ind) => {
                        return (
                          <ProductItemNew
                            xsSize={24}
                            smSize={12}
                            lgSize={8}
                            mdSize={8}
                            key={ind}
                            imgSrc={imgs[ind]}
                            product={product}
                          />
                        );
                      })} */}
                    <Col xs={24} className={"pagination-wrapper"}>
                      <Pagination size="small" total={50} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
     
    </>
  );
}

export default ProductList;
