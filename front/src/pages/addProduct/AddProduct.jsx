import React, { useState, useRef } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Editor } from "@tinymce/tinymce-react";
import { Col, Row, Form, Upload, Tabs, InputNumber, Input, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import ImgCrop from "antd-img-crop";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../footer/Footer";
import useTranslation from "../../hooks/useTranslation";
import ImageUpload from "../../components/imageUpload/ImageUpload";

import "./AddProduct.scss";
import CustomButton from "../../components/elements/button/CustomButton";

const imgs = [
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-1.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-2.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-3.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-4.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-5.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-6.jpg",
];

function AddProduct() {
  const { TabPane } = Tabs;
  const { trans } = useTranslation();
  const [form] = Form.useForm();

  const descRef = useRef(null);
  const detailsRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  // const onUploadChange = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  // };

  // const onPreview = async (file) => {
  //   let src = file.url;
  //   if (!src) {
  //     src = await new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj);
  //       reader.onload = () => resolve(reader.result);
  //     });
  //   }
  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow.document.write(image.outerHTML);
  // };

  const handleSubmit = (values) => {
    // values.images = fileList.map((item) => item.fileName);
    let description = descRef.current.getContent();
    let details = detailsRef.current.getContent();

    console.log("values", { ...values, description, details});
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleFileListChange = (data) => {
    if (data.length > 0) {
      setFileList(data);
    }
  };

  return (
    <div className="product-page-wrapper add-product-page">
      <Form
        form={form}
        name="basic"
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <div className="submit-section">
          <CustomButton
            icon={<UploadOutlined />}
            htmlType="submit"
          ></CustomButton>
        </div>

        <Row className="page-container">
          <Col xs={24}>
            <Navbar />
          </Col>
          <Col xs={24} className={"page-header"}>
            <h2>{trans("add_poduct")}</h2>
          </Col>
          <Col xs={24}>
            <Row justify={"space-between"}>
              <Col xs={24} sm={12}>
                <div className="product-imgs">
                  <Carousel
                    autoPlay={false}
                    interval={2000}
                    infiniteLoop={true}
                    emulateTouch={true}
                    showStatus={false}
                    showIndicators={false}
                  >
                    {imgs.map((img, ind) => {
                      return (
                        <div key={ind} className="product-slider-item">
                          <img src={img} />
                        </div>
                      );
                    })}
                  </Carousel>
                  <ImageUpload setList={(data) => handleFileListChange(data)} />
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div className="product-details">
                  {/* <h1>დასახელება</h1> */}
                  <div className="product-name">
                    <Form.Item name={"name"}>
                      <Input placeholder={trans("naming")} />
                    </Form.Item>
                  </div>
                  <div className="price">
                    {/* <span>ფასი</span> */}
                    <Form.Item name={"price"}>
                      <Input placeholder={trans("price")} />
                    </Form.Item>
                  </div>

                  <Form.Item className="product-description" name={"type"}>
                    <TextArea placeholder={"ტიპი"} rows={6} />
                  </Form.Item>
                  <div className="total-amount">
                    <Form.Item name={"total"}>
                      <InputNumber placeholder={trans("total")} />
                    </Form.Item>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col className="details-wrapper" xs={24}>
            <div className="details-container">
              <Tabs defaultActiveKey="1" style={{ marginBottom: 32 }}>
                <TabPane tab="აღწერა" key="1">
                  <div className="desc-tab-container">
                    <Editor
                      onInit={(evt, editor) => descRef.current = editor}
                      initialValue="<p>აღწერილობა.</p>"
                      apiKey={
                        "3jj25gmpb6zfipiawbqt3h8msc7mas3ivlstqz84e53f6s0v"
                      }
                      init={{
                        selector: ".descRef",
                        theme: "silver",
                        // plugins: [ "image code table link media codesample"],
                        // toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | media | table',
                        //paste Core plugin options
                        paste_block_drop: false,
                        paste_data_images: true,
                        paste_as_text: true,
                      }}
                    />
                  </div>
                </TabPane>
                <TabPane tab="დამატებითი ინფორმაცია" key="2">
                  <div className="info-tab-container">
                    <Editor
                      onInit={(evt, editor) => detailsRef.current = editor}
                      initialValue="<p>დეტალები.</p>"
                      apiKey={
                        "3jj25gmpb6zfipiawbqt3h8msc7mas3ivlstqz84e53f6s0v"
                      }
                      init={{
                        selector: ".detailsRef",
                        theme: "silver",
                        // plugins: [ "image code table link media codesample"],
                        // toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | media | table',
                        //paste Core plugin options
                        paste_block_drop: false,
                        paste_data_images: true,
                        paste_as_text: true,
                      }}
                    />
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </Col>
          <Col xs={24}>
            <Footer />
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AddProduct;
