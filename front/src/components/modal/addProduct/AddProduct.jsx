import React, { useState, useEffect } from "react";
import {
  Modal,
  Divider,
  Form,
  Input,
  Row,
  Col,
  InputNumber,
  Upload,
  message,
} from "antd";
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import "./styles.scss";
import API from "../../../utils/services/API";
import CustomButton from "../../elements/button/CustomButton";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


function AddProduct({ open, setOpen, refresh }) {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-2",
      name: "image.png",
      status: "done",
      url:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-3",
      name: "image.png",
      status: "done",
      url:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-4",
      name: "image.png",
      status: "done",
      url:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-xxx",
      percent: 50,
      name: "image.png",
      status: "uploading",
      url:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-5",
      name: "image.png",
      status: "error",
    },
  ]);
 
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        ატვირთვა
      </div>
    </div>
  );
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
      .then((res) => {
        setConfirmLoading(false);
        refresh();
        setOpen(false);
        form.resetFields();
      })
      .catch((err) => setConfirmLoading(false));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const inputArr = [
    {
      name: "name",
      type: "text",
      label: "დასახელება",
      xs: 8,
    },
    {
      name: "description",
      type: "text",
      label: "აღწერა",
      xs: 8,
    },
    {
      name: "category",
      type: "text",
      label: "კატეგორია",
      xs: 8,
    },
    {
      name: "tags",
      type: "text",
      label: "თაგი",
      xs: 8,
    },
    {
      name: "price",
      type: "text",
      label: "ფასი",
      xs: 8,
    },
    {
      name: "quantity",
      type: "text",
      label: "რაოდენობა",
      xs: 8,
    },
  ];

  useEffect(() => {
    console.log("addproduct", open);
  }, [open]);
  return (
    <Modal
      title="პროდუქტის დამატება"
      visible={open}
      open={open}
      width={800}
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
        <Row gutter={[30, 16]}>
          {inputArr.map((item, ind) => {
            return (
              <Col key={ind} xs={item.xs}>
                <Form.Item
                  wrapperCol={{ span: 24 }}
                  name={item.name}
                  rules={[
                    { required: false, message: "ველის შევსება სავალდებულოა!" },
                  ]}
                  label={item.label}
                  className={`${item.type}`}
                >
                  {item.type === "number" ? <InputNumber min={1} /> : <Input />}
                </Form.Item>
              </Col>
            );
          })}

          <Col xs={24}>
          <ImgCrop>
            <Upload
              // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              previewFile={false}
              customRequest
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            </ImgCrop>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </Col>
          <Divider />
          <div className="modal-footer">
            <CustomButton
              type={"ghost"}
              htmlType="button"
              onClick={handleCancel}
            >
              გაუქმება
            </CustomButton>
            <CustomButton
              type={"success"}
              htmlType="submit"
              loading={confirmLoading}
            >
              შენახვა
            </CustomButton>
          </div>
        </Row>
      </Form>
    </Modal>
  );
}

export default AddProduct;
