import React, { useEffect, useState } from "react";
import { Col } from "antd";
import {  useHistory } from "react-router-dom";

import CloseButton from "../elements/button/CloseButton";
import API from "../../utils/services/API";
import "./ProductItem.scss"

function ProductItem({product, imgSrc, xsSize, smSize, mdSize, lgSize, lxSize, refresh}) {
    let history = useHistory();
    const [productData, setProductData] = useState({})
    // const { addToCart } = useCart(product._id);
    
    const toProduct = (id) => {
      history.push(`/product/{id}`);
    };

    useEffect(()=> {
      setProductData(product)
    }, [])

    const handleDelete = (id)=> {
      API.delete(`/api/products/${id}`)
      .then((res) => refresh())
    }
    

  return (
    <Col xs={xsSize} sm={smSize} md={mdSize} lg={lgSize} xl={lxSize} className="category-item item" >
        {/* delete later */}
        <div onClick={()=> handleDelete(productData._id)} style={{position: "absolute", zIndex: "900"}}>
          <CloseButton />
        </div>
      <div className="item-container">
        <div className="sale-sign">
          <div>
            sale
          </div>
        </div>
        <div className="img-container"  onClick={() => toProduct('product?.name')}>
          {/* <img src={process.env.REACT_APP_FILE_PATH + product.images[0]} alt="sasas" /> */}
          {/* {product.images && <img src={require(`../../assets/img/plant-data/uploads/${product.images[0]}`)} alt="sasas" />} */}
          <img src={imgSrc} alt="sasas" />
        </div>
        <div className="category-desc">
          <h4>{productData.name || "სახელი"}</h4>
          <div className="price-cart">
            <h5 className="price">100$</h5>
            {/* <span className="cart" onClick={() => console.log(productData)}>კალათაში დამატება</span> */}
          </div>
        </div>
      </div>
    </Col>
  );
}

export default ProductItem;
