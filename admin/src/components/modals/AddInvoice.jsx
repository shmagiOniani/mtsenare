import React, { useState, createRef, useEffect } from "react";
import { Row, Col, Form, Input, Modal, Button, InputNumber, notification } from "antd";
import {  CheckOutlined} from "@ant-design/icons";
import API from "../../utils/API";
import useTranslation from "../../components/translation/useTranslation";


function AddInvoice({ modalIsOpen, setModalIsOpen, refresh}) {
  const { trans } = useTranslation();
  const [form] = Form.useForm();
  const formRef = createRef();
  const [state] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [reset, setReset] = useState(false);
  
  const handleClose = () => {
    onReset();
    setModalIsOpen(false)
  };
  const onReset = () => form.resetFields();
  
  const onFinish = (data) => {
    API.post(`/post-requests-handler`, { url: `/Invoice`, params: {}, data })
      .then(res => refresh())
      .catch(err => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
    onReset();

    if (reset) {
      setReset(false);
    } else {
      handleClose()
    }
  };

  const userInputArr = [
    {
      name: "username",
      label: trans("username"),
      type: "text",
      required: true,
    },
    {
      name: "password",
      label: trans("password"),
      type: "text",
      required: true,
    },
    {
      name: "identificationNumber",
      label: trans("identification_num"),
      type: "text",
      required: true,
    },
    {
      name: "fullName",
      label: trans("fullname"),
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: trans("email"),
      type: "text",
      required: true,
    },
    {
      name: "phoneNumber",
      label: trans("phone"),
      type: "text",
      required: true,
    },
    {
      name: "branchId",
      label: trans("branch_id"),
      type: "number",
      required: true,
    },
    {
      name: "positionId",
      label: trans("position"),
      type: "number",
      required: true,
    },

  ];

  useEffect(() => {
    onReset();
  }, [])

  const initialValuesObj = {
    name: state?.name,
    identificationNumber: state?.identificationNumber,
    city: state?.city,
    address: state?.address,
    phone: state?.phone,
    accountNum: state?.accountNum,
    lineAmount: state?.lineAmount,
    permissibleCategoryes: state?.permissibleCategoryes,
    priority: state?.priority,
  };

  return (
    <Modal
      className="registration-modal"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      title={trans("add_invoice")}
      visible={modalIsOpen}
      onCancel={handleClose}
      width={900}

    >
      <Form
        className="edit-form"
        form={form}
        ref={formRef}
        name="edit-form"
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValuesObj}
        onValuesChange={(_, values) => setFormValues(values)}
      >
        <Row gutter={[48, 0]} className="registration-form-row">
          {userInputArr?.map((item, index) => {
            return (
              <Col key={index} xs={24} sm={8}>
                <Form.Item
                  name={item.name}
                  label={item.label}
                  type= {item.type}
                  rules={[
                    {
                      required: item.required,
                      message:trans("empty_input_warning")
                    },
                  ]}
                >
                  {item.type === "text" ? 
                  <Input  />
                : <InputNumber/>}
                </Form.Item>
              </Col>
            );
          })}
        </Row>
        <div className="linebracke"></div>
        <Row gutter={[8, 8]} justify={"space-between"}>
          <Col xs={24} sm={8}>
            <Form.Item shouldUpdate className="action-buttons">
              <Button style={{ width: "100%" }} onClick={handleClose}>{trans("cancel")}</Button>
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
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
      </Form>
    </Modal>
  );
}

export default AddInvoice;
