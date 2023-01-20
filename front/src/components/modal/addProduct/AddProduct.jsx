import React, { useState } from "react";
import {
  Modal,
  Divider,
  Form,
  Input,
  Row,
  Col,
  Select,
  InputNumber,
} from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import API from "../../../utils/services/API";
import CustomButton from "../../elements/button/CustomButton";
import ImageUpload from "../../imageUpload/ImageUpload";
import { useEffect } from "react";
import useTranslation from "../../../translation/useTranslation";

function AddProduct({ open, setOpen, refresh }) {
  const { trans } = useTranslation();
  const [form] = Form.useForm();
  const { Option } = Select;
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [categoryList, setCategoryList] = useState([]);
  const [typesList, setTypesList] = useState([]);
  const [fileList, setFileList] = useState([]);

  const getLibraryes = () => {
    API.get(`/api/libraries?all=true`).then((res) => {
      let categoryInst = res.data.items.find((item) => item.name === "Category")
        .library;
      let typesInst = res.data.items.find((item) => item.name === "Types")
        .library;
      setCategoryList(categoryInst);
      setTypesList(typesInst);
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = (values) => {
    values.images = fileList.map((item) => item.response.fileName);
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
      type: "select",
      label: "კატეგორია",
      xs: 8,
      options: categoryList,
    },
    {
      name: "type",
      type: "select",
      label: "ტიპი",
      xs: 8,
      options: typesList,
    },
    // typesList
    {
      name: "tags",
      type: "text",
      label: "თაგი",
      xs: 8,
    },
    {
      name: "price",
      type: "number",
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

  const handleFileListChange = (data) => {
    if (data.length > 0) {
      console.log();
      // let fileNames = data?.map((file)=> file?.response?.fileNames);
      setFileList(data);
    }
  };

  useEffect(() => {
    getLibraryes();
  }, []);
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
          {inputArr.map((item, index) => {
            return (
              <Col key={index} xs={24} sm={8}>
                <Form.Item
                  name={item.name}
                  label={item.label}
                  type={item.type}
                  rules={[
                    {
                      message: trans("empty_input_warning"),
                    },
                  ]}
                >
                  {item.type === "select" ? (
                    <Select
                      mode={item.mode}
                      placeholder={item.placeholder}
                      getPopupContainer={(trigger) => trigger.parentNode}
                      dropdownClassName="new-user-select"
                    >
                      {item.options.length &&
                        item.options.map((option) => {
                          return (
                            <Option key={option._id} value={option._id}>
                              {option.name}
                            </Option>
                          );
                        })}
                    </Select>
                  ) : item.type === "text" ? (
                    <Input />
                  ) : item.type === "password" ? (
                    <Input.Password autoComplete="new-password" />
                  ) : (
                    <InputNumber />
                  )}
                </Form.Item>
              </Col>
            );
          })}

          <Col xs={24}>
            <ImageUpload setList={(data) => handleFileListChange(data)} />
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
