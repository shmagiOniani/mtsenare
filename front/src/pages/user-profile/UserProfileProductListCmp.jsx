import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

import { Divider, Row, Tooltip } from "antd";
import ProductItem from "../../components/productItem/ProductItem";
import { products } from "../../assets/fakeData/fakeData";
import CustomButton from "../../components/elements/button/CustomButton";
import AddProduct from "../../components/modal/addProduct/AddProduct";

function UserProfileProductListCmp({ title }) {
  const [openForm, setOpenForm] = useState(false);
  const handleOpenAddForm = () => {
    setOpenForm(!openForm);
  };
  return (
    <>
      <div id="user-profile-product-list">
        <h3>{title}</h3>
        <Divider />
        <div className="add-button">
          <Tooltip title="ატვირთვა">
            <CustomButton
              size={"large"}
              type={"default"}
              onClick={() => handleOpenAddForm()}
            >
              <UploadOutlined />
            </CustomButton>
          </Tooltip>
        </div>
        <Row gutter={[20, 20]}>
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
      <AddProduct
        open={openForm}
        setOpen={(status) => setOpenForm(status)}
        //  refresh={() => getProductList()}
      />
    </>
  );
}

export default UserProfileProductListCmp;
