import React, { useState, createRef, useEffect, useContext } from "react";
import { Row, Col, Form, Input, Modal, Button, InputNumber,Select, notification } from "antd";
import {  CheckOutlined} from "@ant-design/icons";
import API from "../../utils/API";
import useTranslation from "../../components/translation/useTranslation";
import { UserContext } from "../contexts/UserContext";


function AddUser({ modalIsOpen, setModalIsOpen, refresh, positionsArr}) {
  const { trans } = useTranslation();
  const { Option } = Select;
  const context = useContext(UserContext);

  const [form] = Form.useForm();
  const formRef = createRef();
  const [state] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [reset, setReset] = useState(false);
  const [branches, setBranches] = useState([])

  
  const handleClose = () => {
    onReset();
    setModalIsOpen(false)
  };
  const onReset = () => form.resetFields();
  
  const onFinish = (data) => {
    
    API.post(`/post-requests-handler`, { url: `/Security/users`, params: {}, data })
      .then(res => {

        refresh();
        onReset();
      }
      )
      .catch(err => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))


    // if (reset) {
    //   setReset(false);
    // } else {
    //   handleClose()
    // }
  };

  const getBranches = () => {
    if (context.hasPermissions("Permissions.Branch")) {
      // API.get(`/get-requests-handler`, { params: { url: `/Company/branches`, params: {} }  })
      //   .then(res => {
      //     setBranches(res.data)
      //   })
      //   .catch(err => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
      }
  }

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
      type: "password",
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
      required: false,
    },
    {
      name: "phoneNumber",
      label: trans("phone"),
      type: "text",
      required: false,
    },
    {
      name: "branchId",
      label: trans("branch_id"),
      type: "select",
      options: branches,
      required: true,
    },
    {
      name: "positionId",
      label: trans("position"),
      type: "select",
      options: positionsArr,
      required: true,
    },

  ];

  useEffect(() => {
    onReset();
    getBranches();
  }, [])

  const initialValuesObj = {
    username: "",
    password: "",
    identificationNumber: state?.identificationNumber,
    fullName: state?.fullName,
    email: state?.email,
    phoneNumber: state?.phoneNumber,
    branchId: state?.branchId,
    positionId: state?.positionId,
  };

  return (
    <Modal
      className="registration-modal filial-registration-modal"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      title={trans("add_user")}
      visible={modalIsOpen}
      onCancel={handleClose}
      width={1000}

    >
      <Form
        // validateMessages={validateMessages}
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
                  {item.type === "select" ? (
                    <Select
                      mode={item.mode}
                      placeholder={item.placeholder}
                      getPopupContainer={trigger => trigger.parentNode}
                      dropdownClassName="new-user-select"
                    >
                      {item.options.length && item?.options?.map((option, optIndex) => {
                        return (
                          <Option key={option.id} value={option.id}>
                            {option.name}
                          </Option>
                        );
                      })}
                    </Select>
                  ):item.type === "text" ? 
                  <Input   />
                  : item.type === "password" ? (
                    <Input.Password autoComplete="new-password"  />
                  ): <InputNumber/>}
                </Form.Item>
              </Col>
            );
          })}
        </Row>
        <div className="linebracke"></div>
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={8}>
            <Form.Item shouldUpdate className="action-buttons">
              <Button style={{ width: "100%" }} onClick={handleClose}>{trans("cancel")}</Button>
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
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

export default AddUser;
