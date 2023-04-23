import { Divider, Row } from "antd";
import React from "react";
import ProductItem from "../../components/productItem/ProductItem";
import { products } from "../../assets/fakeData/fakeData";

function UserProfileProductListCmp({title}) {
  return (
    <div id="user-profile-product-list">
        <h3>{title}</h3>
        <Divider/>
      <Row gutter={[20,20]}>
        {products.map((product, ind) => {
          return (
            <ProductItem
              xsSize={24}
              smSize={12}
              mdSize={12}
              lgSize={8}
              key={product._id || ind}
              // imgSrc={`../../assets/img/plant-data/uploads/${product.images[1]}`}
              imgSrc={product.image}
              product={product}
            //   refresh={getProductList}
            />
          );
        })}
      </Row>
    </div>
  );
}

export default UserProfileProductListCmp;
