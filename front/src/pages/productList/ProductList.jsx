import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Row, Input, Select, Slider, Pagination, Tooltip, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {one,two,tree,four,five,six,seven,eight,nine,ten,eleven,} from "../../assets/img/product"
import Navbar from "../../components/navbar/Navbar";
import "./ProductList.scss";
import Footer from "../footer/Footer";
import ProductItem from "../home/ProductItem";
import AddProduct from "../../components/modal/addProduct";

import 'antd/dist/antd.css';
import { ProductService } from "../../utils/services/product-service";
import API from "../../utils/services/API";

const { Search } = Input;
const imgs = [one,two,tree,four,five,six,seven,eight,nine,ten,eleven,five];



const category = ["Cactus", "Exotic", "Greens", "Popular", "Various", "Winter"];

function ProductList() {
  const { Option } = Select;
  
  const [openForm, setOpenForm] = useState(false) 
  const [maxPrice, setMaxPrice] = useState(350);
  const [minPrice, setMinPrice] = useState(150);
  const [searchVal, setSearchVal] = useState("");
  const [hideSearch, setHideSearch] = useState(false);
  const [productList, setProductList] = useState([])

  const onSearch = (data) => {
    console.log(data);
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

  const handleClose =(e) => {
    setHideSearch(false);
  }

  const handleOpenForm =() => {
    setOpenForm(!openForm)
    console.log("handle form");
  }

  const getProductList =()=>{
    API.get(`/api/products?all=true`)
    .then(res => {
      setProductList(res.data.items)

    })
    .catch(err => setProductList(imgs))

  }
  useEffect(()=>{
    getProductList()
  },[])

  return (
    <>
      <div className="page-wrapper">
        <div className="add-button">
          <Tooltip title="ატვირთვა">
            <Button onClick={()=> handleOpenForm()} shape="circle" size="large" icon={<UploadOutlined />} />
          </Tooltip>
        </div>
        <div className=" page-container">
          <Row>
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
                            <Link to={item}>{item}</Link>
                          </li>
                        );
                      })}
                    </ul>
                    <ul className="product-sidebar-category ">
                      <h6 className="category-header">ფასის შუალედი</h6>
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
                      <li>
                        ფასი: ${minPrice} - ${maxPrice}
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col
                  xs={24}
                  sm={19}
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
                        <div onBlur={(e) => handleClose(e)} className="search-list">
                          {imgs.map((category, ind) => {
                            return (
                              <div onClick={(e)=> toProduct(e, ind)} key={ind} className="search-item">
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
                        <Option value={"option"}>{"პოპულარობის მიხედვთ"}</Option>
                        <Option value={"b"}>{"შეფასების მიხედვით"}</Option>
                      </Select>
                    </Col>
                    {productList.map((category, ind) => {
                      return (
                        <ProductItem
                          xsSize={12}
                          smSize={8}
                          mdSize={6}
                          key={ind}
                          id={ind}
                          imgSrc={imgs[ind]}
                        />
                      );
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
      <AddProduct open={openForm} setOpen={(status)=> setOpenForm(status)} refresh={()=> getProductList()} />
    </>
  );
}

export default ProductList;
