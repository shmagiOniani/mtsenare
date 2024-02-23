import { Rate } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function ShopItem({ data }) {
  return (
    <li className="shop-item">
      <Link to={`shop/${data.id}`}>
        <div className="img-wrapper">
          <img src={data.imgSrc} alt="" />
        </div>
      </Link>
      <div className="body">
        <div className="rate"><Rate value={data.rate}/></div>
        <Link to={`shop/${data.id}`} className="name">{data.name}</Link>
        <div className="price">
          <span>
            <del>${data.oldPrice}</del>
          </span>
          <span>${data.newPrice}</span>
        </div>
      </div>
    </li>
  );
}

export default ShopItem;
// imgSrc: one,
// name: "ZZ Plant",
// oldPrice: "80",
// newPrice: "50",
// rate: "3",
// id: "tg34gfrv43grve",
