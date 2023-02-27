import React, { useState, createRef } from "react";
import 'emoji-mart/css/emoji-mart.css'
import { Row, Col, Form, Input, Select, Modal, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import useTranslation from "../../components/translation/useTranslation";

const { TextArea } = Input;



function AddHardware({
  modalIsOpen,
  setModalIsOpen,
}) {
  const { trans } = useTranslation();
  const { Option } = Select;
  const [form] = Form.useForm();
  const formRef = createRef();
  const [state] = useState(null);
  const [formValues, setFormValues] = useState({});

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (data) => {
    let date = new Date()
    data.date = date.toLocaleString();
    onReset()
  };

  const handleClose = () => setModalIsOpen(false);


  const initialValuesObj = {
    name: state?.name,
    serialNum: state?.serialNum,
  };

  const handleChange = (_, values) =>{
    setFormValues(values)
  } 

  const validateMessages = {
    required: trans("empty_input_warning"),
    types: {
      accountNum: trans("is_not_right_format"),
      officeName: trans("is_not_right_format"),
    },
  };

  return (
    <Modal
      className="registration-modal notification-modal"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      title={trans("send_notification")}
      visible={modalIsOpen}
      onCancel={handleClose}
      centered
    >
      <Form
        validateMessages={validateMessages}
        className="edit-form"
        form={form}
        ref={formRef}
        name="edit-form"
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValuesObj}
        onValuesChange={handleChange}
      >
        <Row gutter={[28, 0]} className="registration-form-row">
          <Col xs={24} >
            <Form.Item
              name={"title"}
              rules={[
                {
                  required: true
                },
              ]}
            >
              <Select
                mode={"multiple"}
                placeholder={"მიმღები"}
                getPopupContainer={trigger => trigger.parentNode}
                dropdownClassName="new-user-select"
              >
                <Option value={"option"}>{"option"}</Option>
                <Option value={"option-1"}>{"option"}</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} >
            <Form.Item
              name={"message"}
              rules={[
                {
                  required: true
                },
              ]}
            >
              <TextArea rows={6} value={"dsddsd"} placeholder="აკრიფეთ ტექსთი"/>
            </Form.Item>
          </Col>
        </Row>
        {/* <div className="custom-smiles">

        </div> */}
        <Row justify={"space-between"} >
          <Col xs={10} sm={8}>
            <Button onClick={handleClose}>{trans("cancel")}</Button>
          </Col>
          <Col xs={10} sm={8}>
            <Form.Item shouldUpdate style={{ display: "flex", justifyContent: "end!important" }} >
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
      </Form>
    </Modal>
  )
}

export default AddHardware
