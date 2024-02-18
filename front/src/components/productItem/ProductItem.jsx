import React, { useEffect, useState } from "react";
import { Col, Tooltip } from "antd";
import { useHistory } from "react-router-dom";

import { HeartOutlined } from "@ant-design/icons";
import API from "../../utils/services/API";
import OwlCarousel from "react-owl-carousel";

import useCurrentWidth from "../../hooks/useCurrentWidth";
import CustomButton from "../elements/button/CustomButton";
import "./ProductItem.scss";

function ProductItem({
  product,
  imgSrc,
  xsSize,
  smSize,
  mdSize,
  lgSize,
  lxSize,
  refresh,
  hasSlider = true,
}) {
  const { width } = useCurrentWidth();
  let history = useHistory();
  const [productData, setProductData] = useState({});
  // const { addToCart } = useCart(product._id);

  const toProduct = (e, id) => {
    e.preventDefault()

    history.push(`/product/${id}`);
  };

  
  const handleDelete = (id) => {
    API.delete(`/api/products/${id}`).then((res) => refresh());
  };

  const handleAddFavorite= (e, product)=> {
    e.stopPropagation();
    console.log(product);
  }
  
  useEffect(() => {
    setProductData(product);
  }, []);
  return (
    <Col
      xs={xsSize}
      sm={smSize}
      md={mdSize}
      lg={lgSize}
      xl={lxSize}
      className="category-item item"
    >
      {/* delete later */}
      {/* <div onClick={()=> handleDelete(productData._id)} style={{position: "absolute", zIndex: "900"}}>
          <CloseButton />
        </div> */}
      <div className="item-container">
        <div className="sale-sign">
          <div>sale</div>
        </div>
        <div
          className="img-container"
          // onClick={() => toProduct("product?.name")}
        >
          {hasSlider ? (
            <OwlCarousel
              className="owl-theme"
              dots={true}
              items={1}
              loop
              margin={40}
              nav
            >
              <div className="img-wrapper">
                <img src={imgSrc} alt="sasas" />
              </div>
              <div className="img-wrapper">
                <img src={imgSrc} alt="sasas" />
              </div>
            </OwlCarousel>
          ) : (
            <div className="img-wrapper">
              <img src={imgSrc} alt="sasas" />
            </div>
          )}
        </div>
        <div
          className="category-desc"
          onClick={(e) => toProduct(e, product._id)}
        >
          <h4>{productData.name || "სახელი"}</h4>
          <div className="price-cart">
            <h5 className="price">100$</h5>
            <Tooltip title="ფავორიტებში დამატება">
              <CustomButton
                size={"large"}
                type={"default"}
                className={"favorite-btn"}
                onClick={(e)=> handleAddFavorite(e, product)}
              >
                <HeartOutlined />
              </CustomButton>
            </Tooltip>
            {/* <span className="cart" onClick={() => console.log(productData)}>კალათაში დამატება</span> */}
          </div>
        </div>
      </div>
    </Col>
  );
}

export default ProductItem;
