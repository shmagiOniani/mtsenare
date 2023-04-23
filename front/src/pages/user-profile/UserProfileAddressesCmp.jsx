import { Col, Divider, Row } from "antd";
import React, { useState } from "react";
import CustomButton from "../../components/elements/button/CustomButton";
import AddAddress from "../../components/modal/addAddress/AddAddress";

function UserProfileAddressesCmp() {
  const [openForm, setOpenForm] = useState(false)
  return (
    <>
    <div id="user-profile-addresses">
      <h3>მისამართები</h3>
      <Divider />
      <Row>
        <Col xs={12}>
          <div className="address-card-container">
            <div className="address-card-header">
              <h4>მიტანის ლოკაცია</h4>
              <CustomButton type={"text"} onClick={()=> setOpenForm(true)}>დამატება</CustomButton>
            </div>
            <div className="address-card-body">
              <p>ლოკაცია ვერ მოიძებნა</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
    <AddAddress
        open={openForm}
        setOpen={(status) => setOpenForm(status)}
      />
    </>
  );
}

export default UserProfileAddressesCmp;
