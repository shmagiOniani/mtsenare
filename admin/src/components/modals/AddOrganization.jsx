import React, { useState, createRef } from "react";
import { Row, Col, Form, Input, Select, Modal, Button, Upload, InputNumber, notification } from "antd";
import { CheckOutlined, UploadOutlined } from "@ant-design/icons";
import API from "../../utils/API";
import useTranslation from "../../components/translation/useTranslation";


function AddOrganization({
  modalIsOpen,
  setModalIsOpen,
  refresh,
}) {
  const { trans } = useTranslation();
  const { Option } = Select;
  const [form] = Form.useForm();
  const formRef = createRef();
  const [state] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [reset, setReset] = useState(false);
  // const [inputArr, setInputArr] = useState([]);

  const onFinish = (data) => {
    const newData = {
      id: formValues.id,
      name: formValues.name,
      identificationNumber: formValues.identificationNumber,
      centerId: formValues.centerId,
      responsiblePerson: formValues.responsiblePerson,
      logo: formValues.logo.file.name,
      accountNumber: formValues.accountNumber,
      address: formValues.address,
    }
    postData(newData)
    if (reset) {
      onReset();
      setReset(false);
    } else {
      setModalIsOpen(false);
      onReset();
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const postData = (data) => {
    API.post(`/post-requests-handler`, { url: `/Company`, params: {}, data })
      .then(res => refresh())
      .catch(err => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
  }

  const handleClose = () => setModalIsOpen(false);

  const filialInputArr = [
    {
      name: "name",
      label: trans("name"),
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
      name: "address",
      label: trans("address"),
      type: "text",
      required: true,
    },
    {
      name: "centerId",
      label: trans("center_id"),
      type: "number",
      required: true,
    },
    {
      name: "id",
      label: "ID",
      type: "number",
      required: false,
    },
    {
      name: "responsiblePerson",
      label: trans("responsible_person"),
      type: "text",
      required: true,
    },

    {
      name: "accountNumber",
      label: trans("account_number"),
      type: "text",
      required: true,
    },
    {
      name: "logo",
      label: trans("upload_logo"),
      type: "file",
      required: false,
    },
  ];

  const initialValuesObj = {
    logo: state?.logo,
    name: state?.name,
    identificationNumber: state?.identificationNumber,
    address: state?.address,
    centerId: state?.centerId,
    responsiblePerson: state?.responsiblePerson,
  };
  return (
    <Modal
      className="registration-modal"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      title={trans("add_organization")}
      visible={modalIsOpen}
      onCancel={handleClose}
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
          {filialInputArr?.map((item, index) => {
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
                  ) : item.type === "number" ? (
                    <InputNumber />)
                    : item.type === "select" ? (
                      <Select
                        mode={item.mode}
                        placeholder={item.placeholder}
                        getPopupContainer={trigger => trigger.parentNode}
                      >
                        {item.options?.map((option, optIndex) => {
                          return (
                            <Option key={optIndex} value={option}>
                              {option}
                            </Option>
                          );
                        })}
                      </Select>
                    ) : item.type === "file" ? (
                      <Upload
                        className="upload-button"
                        name={item.name}
                        listType="picture"
                      >
                        <Button icon={<UploadOutlined />}>{item.label}</Button>
                      </Upload>
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
  );
}

export default AddOrganization;
