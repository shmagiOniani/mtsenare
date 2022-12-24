import React, { useEffect, useState } from "react";
import { Col } from "antd";
import { useHistory } from "react-router-dom";
// import useCart from "../../hooks/useCart"

import "./ProductItemNew.scss";

function ProductItemNew({ product, imgSrc, xsSize, smSize, mdSize, lgSize }) {
  let history = useHistory();
  const [productData, setProductData] = useState({});
  // const { addToCart } = useCart(product._id);

  const toProduct = (id) => {
    history.push(`/product/{id}`);
  };

  useEffect(() => {
    setProductData(product);
  }, []);

  return (
    <Col
      xs={xsSize}
      sm={smSize}
      md={mdSize}
      lg={lgSize}
      className="product-item"
    >
      <div className="products-entry ">
        <div className="products-thumb">
          <div className="product-lable">
            <div className="onsale"></div>
          </div>
          <div className="product-thumb-hover">
            <a href="" className="woocommerce-LoopProduct-link">
              <img src="" alt="" className="wp-post-image" />
              <img src="" alt="" className="hover-image" />
            </a>
          </div>
          <div class="countdown">
            <div class="item-countdown">
              <div
                class="product-countdown"
                data-day="d"
                data-hour="h"
                data-min="m"
                data-sec="s"
                data-date="1649721599"
                data-sttime="1586044800"
                data-cdtime="1649721599"
                data-id="item_countdown_5749139241671862103"
              >
                <span class="countdown-content">
                  <span class="days">
                    <span class="countdown-amount">00</span>
                    <span class="countdown-text">d</span>
                  </span>
                  <span class="countdown-section hours">
                    <span class="countdown-amount">00</span>
                    <span class="countdown-text">h</span>
                  </span>
                  <span class="countdown-section mins">
                    <span class="countdown-amount">00</span>
                    <span class="countdown-text">m</span>
                  </span>
                  <span class="countdown-section secs">
                    <span class="countdown-amount">00</span>
                    <span class="countdown-text">s</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="product-button">
            <div data-title="Add to cart">
              <a
                href=""
                className="button product_type_simple add_to_cart_button ajax_add_to_cart"
              ></a>
            </div>
            <div className="woosw-wishlist">
              <button className="woosw-btn woosw-btn-16312">
                Add to wishlist
              </button>
            </div>
            <span className="product-quickview">
              <a href="" className="quickview quickview-button quickview-7840">
                <i class="icon-search"></i>
              </a>
            </span>
          </div>
        </div>
        <div class="products-content">
          <div class="contents">
            <h3 class="product-title">
              <a href="https://wpbingosite.com/wordpress/flacio/shop/european-cypress/">
                European Cypress
              </a>
            </h3>
            <span class="price">
              <span class="woocommerce-Price-amount amount">
                <bdi>
                  <span class="woocommerce-Price-currencySymbol">$</span>79.00
                </bdi>
              </span>
            </span>
          </div>
        </div>
      </div>
    </Col>
  );
}

export default ProductItemNew;
