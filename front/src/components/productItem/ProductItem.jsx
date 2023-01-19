import React, { useEffect, useState } from "react";
import { Col } from "antd";
import {  useHistory } from "react-router-dom";
// import useCart from "../../hooks/useCart"

import "./ProductItem.scss"

function ProductItem({product, imgSrc, xsSize, smSize, mdSize, lgSize}) {
    let history = useHistory();
    const [productData, setProductData] = useState({})
    // const { addToCart } = useCart(product._id);
    
    const toProduct = (id) => {
      history.push(`/product/{id}`);
    };

    useEffect(()=> {
      setProductData(product)
    }, [])

  return (
    <Col xs={xsSize} sm={smSize} md={mdSize} lg={lgSize} className="category-item item" >
      <div className="item-container">
        <div className="sale-sign">
          <div>
            sale
          </div>
        </div>
        <div className="img-container" onClick={() => toProduct('product?.name')}>
          <img src={imgSrc} alt="sasas" />
        </div>
        <div className="category-desc">
          <h6>{productData.name || "სახელი"}</h6>
          <div className="price-cart">
            <span className="price">100$</span>
            <span className="cart" onClick={() => console.log(productData)}>კალათაში დამატება</span>
          </div>
        </div>
      </div>
    </Col>
  );
}

export default ProductItem;
