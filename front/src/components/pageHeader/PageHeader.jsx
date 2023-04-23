import React from "react";
import "./PageHeader.scss";
import { Col, Row } from "antd";

function PageHeader({ children }) {
  return (
    <Row
      className="section-header"
      justify={"center"}
      align={"middle"}
      style={{ width: "100%" }}
    >
      <Col xs={24} className={"page-header"}>
        {children}
      </Col>
    </Row>
  );
}

export default PageHeader;
