import React, { useRef, useState, useEffect } from "react";
import { Modal, Divider, Form, Row } from "antd";
import "antd/dist/antd.css";
import "./AddAddress.scss";
import API from "../../../utils/services/API";
import CustomButton from "../../elements/button/CustomButton";
import CustomInput from "../../elements/input/CustomInput";

function AddAddress({ open, setOpen, refresh }) {
  const [form] = Form.useForm();
  const editorRef = useRef(null);

  const [confirmLoading, setConfirmLoading] = useState(false);

  const [categoryList, setCategoryList] = useState([]);
  const [typesList, setTypesList] = useState([]);
  const [fileList, setFileList] = useState([]);

  const getLibraryes = () => {
    API.get(`/api/libraries?all=true`).then((res) => {});
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = (values) => {
    values.images = fileList.map((item) => item.response.fileName);
    values.description = editorRef.current.getContent();
    setConfirmLoading(true);
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
      name: "firstName",
      type: "text",
      label: "სახელი",
      xs: 24,
    },
    {
      name: "lastName",
      type: "text",
      label: "გვარი",
      xs: 24,
    },
    {
      name: "city",
      type: "select",
      label: "ქალაქი / სოფელი",
      xs: 24,
      options: categoryList,
    },
    {
      name: "street",
      type: "text",
      label: "დეტალური მისამართი",
      xs: 24,
    },
  ];

  useEffect(() => {
    getLibraryes();
  }, []);

  return (
    <Modal
      title="მისამართის დამატება"
      visible={open}
      open={open}
      width={800}
      // onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText="შენახვა"
      cancelText="გაუქმება"
      footer={null}
      className="address-add-modal"
    >
      <Form
        form={form}
        name="basic"
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Row gutter={[30, 0]}>
          <CustomInput inputArr={inputArr} />

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

export default AddAddress;

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
