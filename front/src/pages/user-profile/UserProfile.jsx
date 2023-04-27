import React, { useState } from "react";
import { Col, Row } from "antd";
import { Helmet } from "react-helmet";
import Footer from "../footer/Footer";
import PageHeader from "../../components/pageHeader/PageHeader";
import UserProfileSidebarCmp from "./UserProfileSidebarCmp";
import "./UserProfile.scss";
import UserProfileProductListCmp from "./UserProfileProductListCmp";
import UserProfileAddressesCmp from "./UserProfileAddressesCmp";
import UserProfilEditCmp from "./UserProfilEditCmp";
import { useHistory } from "react-router-dom";

function UserProfile() {
  let history = useHistory();

  const [activeTab, setActiveTab] = useState("my-products");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "my-products":
        return (
          <UserProfileProductListCmp title={"ჩემი ატვირთული განცხადებები"} />
        );
      case "orders":
        return <UserProfileProductListCmp title={"შეკვეთები"} />;
      case "adresses":
        return <UserProfileAddressesCmp />;
      case "use-edit":
        return <UserProfilEditCmp />;
      case "logout":
        logout()
    }
  };

  const logout = () => {
    localStorage.removeItem("token")
    history.push('/home');
  } 

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>პროფილი</title>
        <link rel="canonical" href="http://mysite.com/product-list" />
      </Helmet>
      <div className="page-wrapper" id="user-profile">
        <PageHeader>
          <h2>პირადი კაბინეტი</h2>
        </PageHeader>
        <Row className="page-container">
          <Col xs={8}>
            <UserProfileSidebarCmp
              activeTab={activeTab}
              setActiveTab={(value) => setActiveTab(value)}
            />
          </Col>
          <Col xs={16}>
            <div className="action-value">
              {renderActiveTab()}
             
            </div>
          </Col>
        </Row>
        {/* <Row className="page-container">
          <Col xs={24}>
            <Footer />
          </Col>
        </Row> */}
      </div>
    </>
  );
}

export default UserProfile;
