import React from "react";
import { Col } from "antd";
import {  useHistory } from "react-router-dom";

import "./ProductItem.scss"

function ProductItem({id, imgSrc, xsSize, smSize, mdSize, lgSize}) {
    let history = useHistory();
  
    const toProduct = (id) => {
      history.push(`/product/${id}`);
    };

  return (
    <Col xs={xsSize} sm={smSize} md={mdSize} lgsize={lgSize} className="category-item item" >
      <div className="img-container" onClick={() => toProduct(id)}>
        <img src={imgSrc} alt="sasas" />
      </div>
      <div className="category-desc">
        <h6>სახელი</h6>
        <div>
          <span>{id}00$</span>
          <span>კალათაში</span>
        </div>
      </div>
    </Col>
  );
}

export default ProductItem;
