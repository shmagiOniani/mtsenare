import React, { useState, createRef, useEffect } from "react";
import { Row, Col, Form, Input, Select, Modal, Button, Upload, message, notification } from "antd";
import { CheckOutlined, UploadOutlined } from "@ant-design/icons";
import API from "../../utils/API";
import useTranslation from "../../components/translation/useTranslation";



function OrganizationManipulation({
  modalIsOpen,
  setModalIsOpen,
  organizationId,
}) {
  const { trans } = useTranslation();
  const { Option } = Select;
  const [form] = Form.useForm();
  const formRef = createRef();
  const [state] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [reset, setReset] = useState(false);
  const [inputArr, setInputArr] = useState([]);

  const onFinish = (data) => {
    sendUpdate(data)
    // setData(data);
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

  const getData = () => {
    API.get(`/get-requests-handler`, { params: { url: `/Company/${organizationId}`, params: {} } })
      .then(
        (res) => {
          if(res.data.name === "Error"){
            message.error(res.data.message);
          }else {
          form.setFieldsValue(res.data);
          }
        }
      )
      .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
  }


  const sendUpdate = (data) => {
    API.put(`/put-requests-handler`, { data, url: `/Company/${organizationId}`  })
      .then(res => res)
      .catch(err => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
  }

  const handleClose = () => setModalIsOpen(false);

  const filialInputArr = [
    {
      name: "name",
      label: trans("name"),
      type: "text",
      required: false,
    },
    {
      name: "identificationNumber",
      label: trans("identification_num"),
      type: "text",
      required: false,
    },
    {
      name: "address",
      label: trans("address"),
      type: "text",
      required: false,
    },
    {
      name: "centerId",
      label: trans("center_id"),
      type: "text",
      required: false,
    },
    {
      name: "responsiblePerson",
      label: trans("responsible_person"),
      type: "text",
      required: false,
    },

    {
      name: "accountNumber",
      label: trans("account_number"),
      type: "text",
      required: false,
    },
    {
      name: "logo",
      label: trans("upload_logo"),
      type: "file",
      required: false,
    },
  ];

  useEffect(() => {
    // form.setFieldsValue(formValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getData()
    setInputArr(filialInputArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalIsOpen])

  const initialValuesObj = {
    logo: state?.logo,
    name: state?.name,
    identificationNumber: state?.identificationNumber,
    address: state?.address,
    centerId: state?.centerId,
    responsiblePerson: state?.responsiblePerson,
  };

  const validateMessages = {
    required: trans("empty_input_warning"),
    types: {
      accountNumber: trans("is_not_right_format"),
      officeName: trans("is_not_right_format"),
    },
  };

  return (
    <Modal
      className="registration-modal"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      title={trans("edit_organization")}
      visible={modalIsOpen}
      onCancel={handleClose}
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
        onValuesChange={(_, values) => setFormValues(values)}
      >
        <Row gutter={[48, 0]} className="registration-form-row">
          {inputArr?.map((item, index) => {
            return (
              <Col key={index} xs={24} sm={12}>
                <Form.Item
                  name={item.name}
                  label={item.label}
                  rules={[
                    {
                      required: item.required,
                    },
                  ]}
                >
                  {item.type === "text" ? (
                    <Input value={state?.officeName} />
                  ) : item.type === "select" ? (
                    <Select
                      mode={item.mode}
                      placeholder={item.placeholder}
                      getPopupContainer={trigger => trigger.parentNode}
                    // dropdownClassName="new-user-select"
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

export default OrganizationManipulation;
