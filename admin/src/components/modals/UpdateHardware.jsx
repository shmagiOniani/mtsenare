import React, { useState, createRef, useEffect } from "react";
import { Row, Col, Form, Input, Select, InputNumber, Modal, Button, message, notification } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import useTranslation from "../../components/translation/useTranslation";
import API from "../../utils/API";

// აკლია პოსტი იმოტო რო დანადგარებს არ მოყვება ვორქები

function UpdateHardware({
  modalIsOpen,
  setModalIsOpen,
  refresh,
  defaultValue,
}) {
  const { trans } = useTranslation();
  const { Option } = Select;
  const [form] = Form.useForm();
  const formRef = createRef();
  const [state] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [inputArr, setInputArr] = useState([]);

  const onFinish = (data) => {
    const newData= {
      id: data?.id,
      name: data?.name,
      serialNumber: data?.serialNumber,
      city: data?.city,
      branch: data?.branch,
      inspectionLine: data?.inspectionLine,
      works:defaultValue.works
    }

      API.put(`/put-requests-handler`, { url: `/Machine/${defaultValue.id}`, params: {}, data: newData })
        .then(res => handleClose())
        .catch(err => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
  
  };

  const handleClose = () => {
    form.resetFields();
    refresh()
    setModalIsOpen(false)
  };

  useEffect(() => {
    form.setFieldsValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    setInputArr(hardwareInputArr);
    if(modalIsOpen){

      API.get(`/get-requests-handler`, { params: { url: `/Machine/${defaultValue.id}`, params: {} }})
      .then(res => res)
      .catch(err => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
    }
  
  }, [modalIsOpen]);

  const hardwareInputArr = [
    {
      name: "id",
      label: "ID",
      type: "number",
      required: true,
    },
    {
      name: "name",
      label: trans("name"),
      type: "text",
      required: true,
    },
    {
      name: "serialNumber",
      label: trans("serial_num"),
      type: "text",
      required: true,
    },
    {
      name: "city",
      label: trans("city"),
      type: "text",
      required: true,
    },
    {
      name: "branch",
      label: trans("branch"),
      type: "number",
      required: true,
    },
    {
      name: "inspectionLine",
      label: trans("line"),
      type: "number",
      required: true,
    },
   
  ];

  const initialValuesObj = {
    name: state?.name,
    serialNumber: state?.serialNumber,
    city: state?.city,
    branch: state?.branch,
    inspectionLine: state?.inspectionLine,
  };


  return (
    <Modal
      className="registration-modal filial-registration-modal"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      title={trans("update_hardware")}
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
        <Row gutter={[28, 0]} className="registration-form-row">
          {inputArr?.map((item, index) => {
            return (
              <Col key={index} xs={24} sm={12}>
                <Form.Item
                  name={item.name}
                  label={item.label}
                  rules={[
                    {
                      required: item.required,
                      message: trans("empty_input_warning")
                    },
                  ]}
                >
                  {item.type === "text" ? (
                    <Input value={state?.officeName} />
                  ): item.type === "number" ? (
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

export default UpdateHardware
