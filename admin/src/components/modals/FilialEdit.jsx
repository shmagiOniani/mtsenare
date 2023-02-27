import React, { useState, createRef, useEffect, useContext } from "react";
import { Row, Col, Form, Input, Select, Modal, Button, Upload, message, notification } from "antd";
import {
  CheckOutlined,
  UploadOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import API from "../../utils/API";
import useTranslation from "../../components/translation/useTranslation";
import { GeneralContext } from "../contexts/GeneralContext";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

function FilialRegistration({
  modalIsOpen,
  setModalIsOpen,
  setData,
  defaultValue,
  target,
}) {
  const { trans } = useTranslation();
  const { Option } = Select;
  const [form] = Form.useForm();
  const formRef = createRef();
  const { categories } = useContext(GeneralContext)

  const [formValues, setFormValues] = useState({});
  const [reset, setReset] = useState(false);
  const [inputArr, setInputArr] = useState([]);

  const onFinish = (fullData) => {
    const newData = {
      address: fullData.address,
      companyId: fullData.companyId,
      // id: fullData.id,
      identificationNumber: fullData.identificationNumber,
      logo: fullData?.logo?.file?.name,
      mobileNumber: fullData.mobileNumber,
      name: fullData.name,
      streamingUrls: fullData.streamingUrls,
      supportsForeign: fullData.supportsForeign ,     
      supportsMilitary: fullData.supportsMilitary  ,    
      unitId: fullData.unitId,
      workLineCount: fullData.workLineCount,
    }
    setData(fullData);

    API.put(`/put-requests-handler`, { url: `/Company/branches/${defaultValue.id}`, params: {}, data: newData })
    .then(
      (res) => {
        message.success(res);
      }
    )
    .catch((err) => {
      notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"});
    })
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

  const handleClose = () => setModalIsOpen(false);

  useEffect(() => {
    form.setFieldsValue(defaultValue);
  }, [defaultValue]);

  const filialInputArr = [
    {
      name: "name",
      label: trans("name"),
      type: "text",
      xs: 24,
      sm: 8,
      mode: '',
      required: false,
    },
    {
      name: "identificationNumber",
      label: trans("identification_num"),
      type: "text",
      xs: 24,
      sm: 8,
      mode: '',
      required: false,
    },
    {
      name: "address",
      label: trans("address"),
      type: "text",
      xs: 24,
      sm: 8,
      mode: '',
      required: false,
    },
    {
      name: "mobileNumber",
      label: trans("phone"),
      type: "text",
      xs: 24,
      sm: 8,
      mode: '',
      required: false,
    },
    {
      name: "logo",
      label: trans("upload_logo"),
      type: "file",
      xs: 24,
      sm: 8,
      mode: '',
      required: false,
    },
    {
      name: "workLineCount",
      label: trans("line_amount"),
      type: "text",
      xs: 24,
      sm: 8,
      mode: '',
      required: false,
    },
    {
      name: "Category",
      label: trans("category"),
      placeholder:  "",
      type: "select",
      xs: 24,
      sm: 12,
      mode: 'multiple',
      required: false,
      options: categories,
    },
    {
      name: "unitId",
      label: trans("unit_id"),
      type: "text",
      xs: 24,
      sm: 12,
      mode: '',
      required: false,
    },
    {
      name: "supportsMilitary",
      label: trans("supports_military"),
      placeholder:  "",
      type: "select",
      xs: 24,
      sm: 12,
      mode: '',
      required: false,
      options: [
        {
          name: trans("yes"),
          id: true
        },
        {
          name: trans("no"),
          id: false
        }
      ],
    },
    {
      name: "supportsForeign",
      label: trans("supports_foreign"),
      placeholder: "",
      type: "select",
      xs: 24,
      sm: 12,
      mode: '',
      required: false,
      options: [
        {
          name: trans("yes"),
          id: true
        },
        {
          name: trans("no"),
          id: false
        }
      ],
    },
  ];

  const headOfficeInputArr = [
    {
      name: "officeName",
      label: trans("office_name"),
      type: "text",
      required: true,
      xs: 24,
      sm: 8,
    },
    {
      name: "city",
      label: trans("city"),
      type: "text",
      required: true,
      xs: 24,
      sm: 8,
    },
    {
      name: "address",
      label: trans("address"),
      type: "text",
      required: true,
      xs: 24,
      sm: 8,
    },
    {
      name: "phone",
      label: trans("phone"),
      type: "text",
      required: true,
      xs: 24,
      sm: 8,
    },
    {
      name: "identificationNumber",
      label: trans("identification_num"),
      type: "text",
      required: true,
      xs: 24,
      sm: 8,
    },
    {
      name: "resPerson",
      label: trans("responsible_person"),
      type: "text",
      required: true,
      xs: 24,
      sm: 8,
    },
    {
      name: "accountNum",
      label: trans("account_number"),
      type: "text",
      required: true,
      xs: 24,
      sm: 8,
    },
    {
      name: "logo",
      label: trans("upload_logo"),
      type: "file",
      required: false,
      xs: 24,
      sm: 8,
    },
  ];

  // useEffect(()=> {
  //   getCategoryTypes()
  // }, [])
  
  useEffect(() => {
    if (target === "head-office") {
      setInputArr(headOfficeInputArr);
    } else {
      setInputArr(filialInputArr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const initialValuesObj = {
    name: defaultValue?.name,
    identificationNumber: defaultValue?.identificationNumber,
    city: defaultValue?.city,
    address: defaultValue?.address,
    phone: defaultValue?.phone,
    accountNum: defaultValue?.accountNum,
    logo: defaultValue?.logo,
    lineAmount: defaultValue?.lineAmount,
    permissibleCategoryes: defaultValue?.permissibleCategoryes,
    priority: defaultValue?.priority,
    supportsMilitary: defaultValue?.supportsMilitary,
    supportsForeign: defaultValue?.supportsForeign,
    streamingUrls: defaultValue?.streamingUrls,
  };
  
  const validateMessages = {
    required: trans("empty_input_warning"),
    types: {
      accountNum: trans("is_not_right_format"),
      officeName: trans("is_not_right_format"),
    },
  };

  return (
    <Modal
      className="registration-modal filial-registration-modal"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      title={trans("edit")}
      visible={modalIsOpen}
      onCancel={handleClose}
      width={900}
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
              <Col key={index} xs={item.xs} sm={item.sm}>
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
                    <Input />
                  ) : item.type === "select" ? (
                    <Select
                      placeholder={item.placeholder}
                      mode={item.mode}
                    // getPopupContainer={trigger => trigger.parentNode}
                    // dropdownClassName="new-user-select"
                    >
                      {item.options?.map((option, optIndex) => {
                        return (
                          <Option key={optIndex} value={option.id}>
                            {option.name}
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
          {target === "filial" && (
            <Col xs={24} className="url-form-container">
              <Form.List
                name="streamingUrls"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields?.map((field, index) => (
                      <Form.Item
                        {...(index === 0
                          ? formItemLayout
                          : formItemLayoutWithOutLabel)}
                        label={index === 0 ? "URL :" : ""}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: trans("url_error_message"),
                            },
                          ]}
                          noStyle
                        >
                          <Input
                            placeholder="https://..."
                            style={{ width: "60%" }}
                          />
                        </Form.Item>
                        {fields.length >= 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item className="action-buttons">
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{ width: "33%" }}
                        icon={<PlusOutlined />}
                      >
                        URL {" " + trans("add")}
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
          )}
        </Row>
        <div className="linebracke" />
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

export default FilialRegistration;
