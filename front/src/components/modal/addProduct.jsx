import React, { useState, useEffect } from "react";
import { Button, Modal, Divider, Form, Input, Radio, Select, Cascader, DatePicker, InputNumber, TreeSelect, Switch, Checkbox, Upload,} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import "./styles.scss";
import API from "../../utils/services/API";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

function AddProduct({ open, setOpen, refresh }) {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");


  // const handleOk = () => {
  //   setModalText("The modal will be closed after two seconds");
   
  // };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const onFinish = (values) => {
    setConfirmLoading(true);
    API.post(`/api/products`, values)
      .then(res => {
        setConfirmLoading(false);
        refresh()
        setOpen(false);
        form.resetFields()
      })
      .catch(err =>{
        setConfirmLoading(false);
      })
   
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const inputArr = [
    {
      name: "name",
      type: "text",
      label: "დასახელება",
    },
    {
      name: "description",
      type: "text",
      label: "აღწერა",
    },
    {
      name: "price",
      type: "number",
      label: "ფასი",
    },
    {
      name: "deliveryTime",
      type: "text",
      label: "მიტანის თარიღი",
    },
    {
      name: "deliveryType",
      type: "text",
      label: "მიტანის ტიპი",
    },
    {
      name: "quantity",
      type: "number",
      label: "რაოდენობა",
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
        {inputArr.map((item, ind)=> {
          return (
            <Form.Item
              wrapperCol={ {span: 24}}
              key={ind}
              name={item.name}
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              {item.type === "number" ? 
                <InputNumber min={1}  placeholder={item.label} />
              :
                <Input placeholder={item.label} />
              }
            </Form.Item>
          )
        })}
      <Divider />
      <div className="modal-footer">
        <Button>გაუქმება</Button>
        <Button htmlType="submit" loading={confirmLoading}>
          შენახვა
        </Button>
      </div>
      </Form>
    </Modal>
  );
}

export default AddProduct;