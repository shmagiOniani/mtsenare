import React, { useState, useRef } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Editor } from '@tinymce/tinymce-react';
import { Col, Row,  Form, Upload, Tabs, InputNumber, Input , Button } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import ImgCrop from 'antd-img-crop';
import Navbar from '../../components/navbar/Navbar'
import Footer from '../footer/Footer';
import "./AddProduct.scss";
import TextArea from 'antd/lib/input/TextArea';
import useTranslation from '../../components/translation/useTranslation';

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
    console.log("newFileList",newFileList);
  };

  const onPreview = async file => {
    console.log("file",file);
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

  const handleSubmit = () => {
    console.log();
  }

  return (
    <div className='product-page-wrapper add-product-page'>
      <div  onClick={()=> handleSubmit()} className="submit-section">
        <UploadOutlined />
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
              <div className="product-details">
                {/* <h1>დასახელება</h1> */}
                <div className="product-name">
                  <Form.Item name={"name"} >
                    <Input placeholder={trans("naming")} />
                  </Form.Item>
                </div>
                <div className="price">
                  {/* <span>ფასი</span> */}
                  <Form.Item name={"price"}>
                    <Input placeholder={trans("price")} />
                  </Form.Item>
                </div>

                <Form.Item className='product-description' name={"description"}>
                  <TextArea placeholder={trans("product_desc")} rows={6} />
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
              <TabPane tab="დამატებითი ინფორმაცია" key="2">
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