import React, { createRef, useState, useRef } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useHistory, Link, useLocation } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { Col, Row, Select, Form, Upload, Tabs, InputNumber, Button, Input } from 'antd';
import { CaretLeftOutlined, UploadOutlined } from "@ant-design/icons";
import ImgCrop from 'antd-img-crop';
import useTranslation from "../../components/translation/useTranslation";
import Navbar from '../../components/navbar/Navbar'
import Footer from '../home/Footer';
import "./AddProduct.scss";
import TextArea from 'antd/lib/input/TextArea';
import API from '../../utils/API';

const imgs = [
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-1.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-2.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-3.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-4.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-5.jpg",
  "https://fiorello.qodeinteractive.com/wp-content/uploads/2018/04/shop-category-img-6.jpg",
];


function AddProduct() {
  const { trans } = useTranslation();
  const { Option } = Select;
  const { TabPane } = Tabs;


  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const onUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  // history.push('/home');
  // location.pathname

  const detailsRef = useRef(null);
  const descRef = useRef(null);

  const log = () => {
    if (descRef.current) {
      console.log(descRef.current.getContent());
    }
  };
  return (
    <div className='page-wrapper'>
      <div className="submit-section">
        <UploadOutlined />
      </div>

      <Row className="page-container">

        <Col xs={24}>
          <Navbar />
        </Col>
        <Col xs={24} className={"page-header"}>
          <h1>Add Product</h1>
          <p>Where flowers are our inspiration</p>
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
                <ImgCrop rotate>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onUploadChange}
                    onPreview={onPreview}
                  >
                    {fileList.length < 5 && '+ Upload'}
                  </Upload>
                </ImgCrop>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <Form className="product-details">
                <h1>Product Name</h1>
                <div className="product-name">
                  <Form.Item name={"name"}>
                    <Input placeholder='Name' />
                  </Form.Item>
                </div>
                <div className="price">
                  <span>Price</span>
                  <Form.Item name={"price"}>
                    <Input placeholder='Price' />
                  </Form.Item>
                </div>
                <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc.</p>
                <Form.Item name={"description"}>
                  <TextArea placeholder='Description' rows={6} />
                </Form.Item>
                <div className="add-product-cart">
                  <Form.Item name={"total"}>
                    <InputNumber placeholder='Total amount' />
                  </Form.Item>
                </div>

              </Form>
            </Col>
          </Row>
        </Col>
        <Col className="details-wrapper" xs={24}>
          <div className="details-container">
            <Tabs defaultActiveKey="1" style={{ marginBottom: 32 }}>
              <TabPane tab="DESCRIPTION" key="1">
                <div className="desc-tab-container">
                  <Editor
                    apiKey='3jj25gmpb6zfipiawbqt3h8msc7mas3ivlstqz84e53f6s0v'
                    onInit={(evt, editor) => descRef.current = editor}
                    initialValue="<p>აღწერილობა.</p>"
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                      ],
                      toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                  />
                </div>
              </TabPane>
              <TabPane tab="ADDITIONAL INFORMATION" key="2">
                <div className="info-tab-container">
                  <Editor
                    apiKey='3jj25gmpb6zfipiawbqt3h8msc7mas3ivlstqz84e53f6s0v'
                    onInit={(evt, editor) => detailsRef.current = editor}
                    initialValue="<p>დეტალები.</p>"
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                      ],
                      toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
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
    </div>
  )
}

export default AddProduct