import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
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
import { UploadOutlined } from "@ant-design/icons";
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

import Navbar from "../../components/navbar/Navbar";
import "./ProductList.scss";
import ProductItem from "../../components/productItem/ProductItem";
import AddProduct from "../../components/modal/addProduct/AddProduct";
import "antd/dist/antd.css";
import API from "../../utils/services/API";
import ShopItem from "./ShopItem";
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

const products = [
  {
    name: "Ceramic Pots",
    image:
      "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-4.jpg",
  },
  {
    name: "Indoor Plants",
    image:
      "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-2.jpg",
  },
  {
    name: "Low Maintenance",
    image:
      "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-5.jpg",
  },
  {
    name: "Plant Bundle",
    image:
      "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-4.jpg",
  },
  {
    name: "Air Purifying",
    image:
      "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-5.jpg",
  },
  {
    name: "Ceramic Pots",
    image:
      "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-6.jpg",
  },
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
  }
]

function ProductList() {
  const { Option } = Select;

  const [categoryList, setCategoryList] = useState([])
  const [openForm, setOpenForm] = useState(false);
  const [maxPrice, setMaxPrice] = useState(350);
  const [minPrice, setMinPrice] = useState(150);
  const [searchVal, setSearchVal] = useState("");
  const [hideSearch, setHideSearch] = useState(false);
  const [productList, setProductList] = useState([]);

  const onSearch = (data) => {
    console.log(data);
  };

  const getLibraryes = () => {
    API.get(`/api/libraries?all=true`)
      .then((res) => {
        let categoryInst = res.data.items.find((item)=> item.name === "Category").library
        setCategoryList(categoryInst)
      })
  };

  const handleChange = (e) => {
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
  const onPriceChange = (val) => {
    setMaxPrice(val[1]);
    setMinPrice(val[0]);
  };

  let history = useHistory();

  const toProduct = (e, id) => {
    console.log("sds");
    history.push(`/product/${id}`);
  };

  const handleClose = (e) => {
    setHideSearch(false);
  };

  const handleOpenForm = () => {
    setOpenForm(!openForm);
  };

  const getProductList = () => {
    API.get(`/api/products?all=true`)
      .then((res) => {
        setProductList(res.data.items);
      })
      .catch((err) => setProductList(imgs));
  };
  
  useEffect(() => {
    getProductList();
    getLibraryes()
  }, []);

  return (
    <>
      <div className="page-wrapper">
        <div className="add-button">
          <Tooltip title="ატვირთვა">
            <Button
              onClick={() => handleOpenForm()}
              shape="circle"
              size="large"
              icon={<UploadOutlined />}
            />
          </Tooltip>
        </div>
        <Row justify={"center"} style={{ width: "100%" }}>
          <Col xs={18}>
            <Navbar />
          </Col>
        </Row>
        <Row
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
                            <span>{product.name}</span>
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
        </Row>
        <div className=" page-container">
          <Row>
            <Col xs={24}>
              <Row gutter={[20, 20]} className="list">
                <Col className="product-list-sidebar" sm={7}>
                  <div className="product-sidebar-wrapper">
                    <ul className="product-sidebar-category ">
                      <h5 className="category-header">კატეგორიები</h5>
                      {categoryList.map((item) => {
                        return (
                          <li>  
                            <Link to={item.name}>
                              <span>{item.name}</span>
                              <span>3</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    <ul className="product-sidebar-category ">
                      <h5 className="category-header">ფასი</h5>
                      <li className="range-input">
                        <Slider
                          range
                          onChange={onPriceChange}
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
                      <h5 className="category-header">მაღაზიები</h5>
                      {SHOPS_LIST.map((shop, index)=> {
                        return (
                          <ShopItem key={index} data={shop}/>
                          )
                      })}
                    </ul>
                  </div>
                </Col>
                <div className="img-decorations">
                <img src={two} alt="" />
                <img src={five} alt="" />
                </div>
                <Col
                  xs={24}
                  sm={17}
                  style={{ paddingLeft: "25px", paddingRight: "25px" }}
                >
                  <Row>
                    <Col xs={24} className="search-wrapper">
                      <Search
                        className="search-input"
                        placeholder="ძებნა..."
                        onSearch={onSearch}
                        onChange={handleChange}
                        enterButton
                      />
                      <div
                        className={`${
                          searchVal.length ? "start-show" : "start-hide"
                        } ${hideSearch ? "show" : "hide"} search-container`}
                      >
                        <div
                          onBlur={(e) => handleClose(e)}
                          className="search-list"
                        >
                          {imgs.map((category, ind) => {
                            return (
                              <div
                                onClick={(e) => toProduct(e, ind)}
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
                    {productList.length &&
                      productList.map((product, ind) => {
                        return (
                          <ProductItem
                            xsSize={24}
                            smSize={12}
                            mdSize={12}
                            lgSize={8}
                            key={product._id}
                            // imgSrc={`../../assets/img/plant-data/uploads/${product.images[1]}`}
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
      <AddProduct
        open={openForm}
        setOpen={(status) => setOpenForm(status)}
        refresh={() => getProductList()}
      />
    </>
  );
}

export default ProductList;
