import React, { useState, useEffect } from "react";
import { Button, Modal, Divider, Form, Input, Row, Col, InputNumber, Upload} from "antd";
// import ImgCrop from 'antd-img-crop';

import "antd/dist/antd.css";
import "./styles.scss";
import API from "../../../utils/services/API";
// import axios from "axios";
import CustomButton from "../../elements/button/CustomButton";

function AddProduct({ open, setOpen, refresh }) {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [fileList, setFileList] = useState([
  //   {
  //     uid: '-1',
  //     name: 'image.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //   },
  // ]);

  // const onChange = ({ fileList: newFileList }) => {
  //   // setFileList(newFileList);
  //   console.log("newFileList", newFileList);
  //   // API.post(`/api/files`, newFileList)
  //   //   .then(res => {
  //   //     console.log("response", res);
  //   //   })
  //   //   .catch(err =>console.log("error", err))
  // };
  // const onPreview = async (file) => {
  //   console.log("onPreview", file);
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
  //   // imgWindow?.document.write(image.outerHTML);
  // };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log(values);

    // const data = new FormData();
    // data.append("image-file", values.imageFile.file.originFileObj);
    // axios.post(`${process.env.REACT_APP_BASE_API}api/files`, data, {
    //   headers: {
    //     "Content-Type": "multipart/form-data"
    //   }
    // }).then(res => {
    //   console.log(res);
    // }).catch(err=> console.log(err))
    setConfirmLoading(true);
    API.post(`/api/products`, values)
      .then(res => {
        setConfirmLoading(false);
        refresh()
        setOpen(false);
        form.resetFields()
      })
      .catch(err =>setConfirmLoading(false))
   
  };

  const dummyRequest=()=>{

  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const inputArr = [
    {
      name: "name",
      type: "text",
      label: "დასახელება",
      xs: 24
    },
    {
      name: "description",
      type: "text",
      label: "აღწერა",
      xs: 24
    },
    {
      name: "category",
      type: "text",
      label: "კატეგორია",
      xs: 24
    },
    {
      name: "tags",
      type: "text",
      label: "თაგი",
      xs: 24
    },
    {
      name: "price",
      type: "number",
      label: "ფასი",
      xs: 12
    },
    {
      name: "quantity",
      type: "number",
      label: "რაოდენობა",
      xs: 12
    },
  ]

  useEffect(() => {
    console.log("addproduct", open);
  }, [open]);
  return (
    <Modal
      title="პროდუქტის დამატება"
      visible={open}
      open={open}
      // onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText="შენახვა"
      cancelText="გაუქმება"
      footer={null}
      className="product-add-modal"
    >
      <Form
        form={form}
        name="basic"
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="horizontal"
      >
        <Row >
          {inputArr.map((item, ind)=> {
            return (
              <Col
                key={ind}
                xs={item.xs}
              >
                <Form.Item
                  wrapperCol={ {span: 24}}
                  name={item.name}
                  rules={[{ required: false, message: 'ველის შევსება სავალდებულოა!' }]}
                  label={item.label}
                  className={`${item.type}`}
                  >
                  {item.type === "number" ? 
                    <InputNumber min={1}  placeholder={item.label} />
                  :
                    <Input placeholder={item.label} />
                  }
                </Form.Item>
              </Col>
            )
          })}

          <Col xs={24}>
            <Form.Item name={"imageFile"}>
                <Upload
                customRequest={dummyRequest}
                  // action={`${process.env.REACT_APP_BASE_API}api/files`}
                  // listType="picture-card"
                  // fileList={fileList}
                  // onChange={onChange}
                  // onPreview={onPreview}
                >
                  {'+ Upload'}
                </Upload>
            </Form.Item>
          </Col>
          <Divider />
          <div className="modal-footer">
            <CustomButton type={"ghost"} htmlType="button" onClick={handleCancel}>გაუქმება</CustomButton>
            <CustomButton type={"success"} htmlType="submit" loading={confirmLoading}>შენახვა</CustomButton>
          </div>
        </Row>
      </Form>
    </Modal>
  );
}

export default AddProduct;
