import React, { useState } from "react";
import {
  Modal,
  Divider,
  Form,
  Input,
  Row,
  Col,
  InputNumber,
} from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import API from "../../../utils/services/API";
import CustomButton from "../../elements/button/CustomButton";
import ImageUpload from "../../imageUpload/ImageUpload";


function AddProduct({ open, setOpen, refresh }) {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [fileList, setFileList] = useState([])
 
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const onFinish = (values) => {
    values.images = fileList.map(item => item.response.fileName);
    setConfirmLoading(true);
    console.log("onFinish",values);
    API.post(`/api/products`, values)
      .then(() => {
        refresh();
        setOpen(false);
        form.resetFields();
      })
      .finally(() => setConfirmLoading(false));

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

  const handleFileListChange = (data)=> {
    console.log("handleFileListChange", data);
    if(data.length > 0){
      console.log();
      // let fileNames = data?.map((file)=> file?.response?.fileNames);
      setFileList(data)
      console.log("file", data);
    }
  }


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
            <ImageUpload setList={(data)=> handleFileListChange(data)}/>
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



  // const [file, setFile] = useState();

  // const saveFile = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // const uploadFile = async (e) => {
  //   const formData = new FormData();
  //   formData.append("filesToAdd", file);

  //   console.log("formData",formData);

  //   axios.post("http://localhost:4002/api/files",formData, {
  //     headers:{
  //       "Content-Type": "multipart/form-data",
  //     }
  //   })
  //     .then((res) => console.log("res",res))
  //     .catch((err) => console.log(err))

  // };

// -------------

  //  <Col xs={24}>
  //   <input type={'file'} onChange={saveFile} accept="image/png, image/gif, image/jpeg"  />
  //   <button onClick={uploadFile}>Upload</button>
  // </Col> 