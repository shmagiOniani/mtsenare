import React from "react";
import { Col } from "antd";
import { Link, useLocation, useHistory } from "react-router-dom";

import "./ProductItem.scss"

function ProductItem({id, imgSrc, xsSize, smSize, mdSize, lgSize}) {
    const location = useLocation();
    let history = useHistory();
  
    const toProduct = (id) => {
      history.push(`/product/${id}`);
    };

  return (
    <Col xs={xsSize} sm={smSize} md={mdSize} lgSize={lgSize} className="category-item item" >
      <div className="img-container" onClick={() => toProduct(id)}>
        <img src={imgSrc} alt="sasas" />
      </div>
      <div className="category-desc">
        <h6>Item</h6>
        <div>
          <span>{id}00$</span>
          <span>Add to cart</span>
        </div>
      </div>
    </Col>
  );
}

export default ProductItem;
