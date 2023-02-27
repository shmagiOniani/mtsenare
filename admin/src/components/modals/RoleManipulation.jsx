import React, { useState, createRef, useEffect } from "react";
import { Row, Col, Form, Input, Select, InputNumber, Modal, Button, DatePicker,message, notification } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import useTranslation from "../../components/translation/useTranslation";
import API from "../../utils/API";

function RoleManipulation({
  modalIsOpen,
  setModalIsOpen,
  title,
  defaultValue,
  refresh,
  type
}) {
  const { trans } = useTranslation();
  const { Option } = Select;
  const [form] = Form.useForm();
  const formRef = createRef();
  const [state] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [inputArr, setInputArr] = useState([]);

  const errorMsg = (string) => {
    message.error(string);
  };
  const onFinish = (data) => {
  
    if(type === "edit"){
      const newData = {
        id: defaultValue.id,
        name: data?.name,
      }
      API.put(`/put-requests-handler`, { url: `/Security/roles/${defaultValue.id}`, data: newData })
      .then((res) => res)
      .catch((err) => {
        refresh()
        setModalIsOpen(false)
        notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"})
      })
    }else {
      const newData = {
        name: data?.name,
      }
      API.post(`/post-requests-handler`, { url: `/Security/roles`, params: {}, data: newData })
      .then(res => {
        refresh()
        handleClose();
       })
      .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
    }
  };

  const handleClose = () => {
    form.resetFields();
    setModalIsOpen(false)
  };


  useEffect(() => {
    form.setFieldsValue(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  const hardwareInputArr = [
    {
      name: "name",
      label: trans("name"),
      type: "text",
      required: true,
    },
  ];

  const initialValuesObj = {
    name: state?.name,
  };

  useEffect(() => {
    setInputArr(hardwareInputArr);
  }, []);
  return (
    <Modal
      className="registration-modal role-registration-modal"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      title={title}
      visible={modalIsOpen}
      onCancel={handleClose}
      // width={900}
    >
      <Form
        className="edit-form"
        form={form}
        ref={formRef}
        name="edit-form"
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValuesObj}
        // onValuesChange={(_, values) => setFormValues(values)}
      >
        <Row gutter={[28, 0]} className="registration-form-row">
          {inputArr?.map((item, index) => {
            return (
              <Col key={index} xs={24} >
                <Form.Item
                  name={item.name}
                  label={item.label}
                  rules={[{
                    required: item.required,
                    message: trans("empty_input_warning")
                  }]}>

                  {item.type === "text" ? (
                    <Input value={state?.officeName} />
                  ) : item.type === "number" ? (
                    <InputNumber />)
                    : item.type === "select" ? (
                      <Select
                        mode={item.mode}
                        placeholder={item.placeholder}
                        getPopupContainer={trigger => trigger.parentNode}
                        dropdownClassName="new-user-select"
                      >
                        {item.options?.map((option, optIndex) => {
                          return (
                            <Option key={optIndex} value={option}>
                              {option}
                            </Option>
                          );
                        })}
                      </Select>
                    ) : item.type === "date" ? (
                      <DatePicker className="date-picker-button"  placeholder={trans("date")} />
                    ) : (
                      ""
                    )}
                </Form.Item>
              </Col>
            );
          })}
        </Row>
        <Row gutter={[8, 8]} justify={"space-between"} className={"filial-actions"} >
          <Col xs={12}>
            <Button onClick={handleClose}>{trans("cancel")}</Button>
          </Col>
          <Col xs={12}>
            <Form.Item shouldUpdate >
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

export default RoleManipulation
