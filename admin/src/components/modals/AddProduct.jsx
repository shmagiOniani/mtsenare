import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Modal, Divider, Form, Row, Col, Typography, Button } from "antd";
import "antd/dist/antd.css";
// import "./styles.scss";
import { CheckOutlined } from "@ant-design/icons";
import CustomInput from "../inputs/CustomInput";
import ImageUpload from "../imageUpload/ImageUpload";
import API from "../../utils/API";
import useTranslation from "../translation/useTranslation";

function AddProduct({ open, setOpen, refresh }) {
  const { trans } = useTranslation();

  const [form] = Form.useForm();
  const editorRef = useRef(null);

  const [confirmLoading, setConfirmLoading] = useState(false);

  const [shopList, setShopList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [typesList, setTypesList] = useState([]);
  const [fileList, setFileList] = useState([]);

  const getLibraryes = () => {
    API.get(`/api/libraries?all=true`).then((res) => {
      let categoryInst = res.data.items.find(
        (item) => item.name === "Category"
      ).library;
      let typesInst = res.data.items.find(
        (item) => item.name === "Types"
      ).library;
      setCategoryList(categoryInst);
      setTypesList(typesInst);
    });
  };

  const getshops = () => {
    API.get(`/api/shops`).then((res) => setShopList(res.data));
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
      name: "name",
      type: "text",
      label: "დასახელება",
      required: true,
      xs: 24,
      sm: 12,
      md: 8,
      // lg: 8,
      // xxl: 8,
    },
    {
      name: "shop",
      type: "select",
      label: "მაღაზია",
      required: true,
      options: shopList,
      mode:"multiple",
      xs: 24,
      sm: 12,
      md: 8,
      // lg: 8,
      // xxl: 8,
    },
    {
      name: "category",
      type: "select",
      label: "კატეგორია",
      required: true,
      options: categoryList,
      mode:"",
      xs: 24,
      sm: 12,
      md: 8,
      // lg: 8,
      // xxl: 8,
    },
    {
      name: "type",
      type: "select",
      label: "ტიპი",
      required: true,
      options: typesList,
      mode:"",
      xs: 24,
      sm: 12,
      md: 8,
      // lg: 8,
      // xxl: 8,
    },
    {
      name: "tags",
      type: "text",
      label: "თაგი",
      required: true,
      xs: 24,
      sm: 12,
      md: 8,
      // lg: 8,
      // xxl: 8,
    },
    {
      name: "price",
      type: "number",
      label: "ფასი",
      required: true,
      xs: 24,
      sm: 12,
      md: 8,
      // lg: 8,
      // xxl: 8,
    },
    {
      name: "quantity",
      type: "number",
      label: "რაოდენობა",
      required: true,
      xs: 24,
      sm: 12,
      md: 8,
      // lg: 8,
      // xxl: 8,
    },
  ];

  const handleFileListChange = (data) => {
    if (data.length > 0) {
      setFileList(data);
    }
  };

  useEffect(() => {
    if(open){

      getLibraryes();
      getshops();
    }
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
        layout="vertical"
      >
        <Row gutter={[30, 0]}>
          <CustomInput inputArr={inputArr} />

          <Col xs={24}>
            <Typography
              variant="h3"
              sx={{ mb: 5 }}
              style={{ marginBottom: "10px" }}
            >
              სურათის ატვირთვა
            </Typography>
            <ImageUpload setList={(data) => handleFileListChange(data)} />
          </Col>

          <Col xs={24}>
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue="<p>This is the initial content of the editor.</p>"
              apiKey={"3jj25gmpb6zfipiawbqt3h8msc7mas3ivlstqz84e53f6s0v"}
              init={{
                selector: ".mytextarea",

                theme: "silver",
                // plugins: [ "image code table link media codesample"],
                // toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | media | table',
                //paste Core plugin options
                paste_block_drop: false,
                paste_data_images: true,
                paste_as_text: true,
              }}
            />
            {/* <button type="button" onClick={log}>Log editor content</button> */}
          </Col>

          <Divider />
          <Col xs={24}>
            <Row gutter={[8, 8]}>
              <Col xs={12}>
                <Form.Item shouldUpdate className="action-buttons">
                  <Button style={{ width: "100%" }} onClick={handleCancel}>
                    {trans("cancel")}
                  </Button>
                </Form.Item>
              </Col>
              {/* <Col xs={12} sm={8}>
                <Form.Item shouldUpdate className="action-buttons">
                  <Button
                    htmlType="submit"
                    onClick={() => setReset(true)}
                    icon={<CheckOutlined />}
                    className="focus-white"
                  >
                    {trans("save_and_add_new")}
                  </Button>
                </Form.Item>
              </Col> */}
              <Col xs={12}>
                <Form.Item shouldUpdate className="action-buttons">
                  <Button
                    htmlType="submit"
                    type="primary"
                    icon={<CheckOutlined />}
                    className="focus-white"
                  >
                    {trans("save")}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default AddProduct;
