import React, { useState, createRef } from "react";
import 'emoji-mart/css/emoji-mart.css'
import { Row, Col, Form, Input, Select, Modal, Button, notification } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import useTranslation from "../../components/translation/useTranslation";
import API from "../../utils/API";


function ChangePwd({
  modalIsOpen,
  setModalIsOpen,
  userId
}) {
  const { trans } = useTranslation();
  const [form] = Form.useForm();
  const formRef = createRef();
  const [state] = useState(null);
  const [formValues, setFormValues] = useState({});

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (data) => {
    console.log(data);
 
    API.post(`/post-requests-handler`, { url: `/Security/users/${userId}/updatePassword`, params: {}, data: {password:data.password }})
    .then(res => handleClose())
    .catch(err => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))



    // let date = new Date()
    // data.date = date.toLocaleString();
    // onReset()

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
      title={trans("change_password")}
      visible={modalIsOpen}
      onCancel={handleClose}
      centered
    >
      <Form
        validateMessages={validateMessages}
        className="edit-form"
        form={form}
        ref={formRef}
        name="change-password-form"
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValuesObj}
        onValuesChange={handleChange}
      >
        <Row gutter={[28, 0]} className="registration-form-row">
          <Col xs={24} >
            <Form.Item
              name={"password"}
              rules={[{required: true}]}
            >
            <Input value={state?.officeName} placeholder={trans("password")} />
            </Form.Item>
          </Col>
          <Col xs={24} >
            <Form.Item
              name={"rePassword"}
              rules={[
                {
                  required: true,
                  
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(trans("password_match_error")));
                  },
                }),
              ]}
            >
               <Input value={state?.officeName} placeholder={trans("repeat_password")} />
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

export default ChangePwd
