import React, { useState, createRef, useEffect, useContext } from "react";
import { Row, Col, Form, Input, InputNumber, Select, Modal, Button, Upload, message, notification } from "antd";
import {
  CheckOutlined,
  UploadOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import API from "../../utils/API";
import useTranslation from "../../components/translation/useTranslation";
import { UserContext } from "../contexts/UserContext";
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

const instance = {
  "id": 5,
  "name": "string",
  "identificationNumber": 5,
  "address": "string",
  "workLineCount": 0,
  "mobileNumber": "string",
  "unitId": 0,
  "supportsMilitary": true,
  "supportsForeign": true,
  "logo": "string",
  "streamingUrls": [
    "string"
  ],
  "companyId": 0
}

function FilialRegistration({
  modalIsOpen,
  setModalIsOpen,
  setData,
  target,
  resetPage
}) {
  const { trans } = useTranslation();
  const context = useContext(UserContext);
  const { Option } = Select;
  const [form] = Form.useForm();
  const formRef = createRef();
  const [state] = useState(null);
  const { categories } = useContext(GeneralContext)


  const [formValues, setFormValues] = useState({});
  const [reset, setReset] = useState(false);
  const [inputArr, setInputArr] = useState([]);
  const [userObj, setUserObj] = useState({})
  // const [categoryTypes, setCategoryTypes]= useState([])


  const errorMsg = (string) => {
    message.error(string);
  };

  const onFinish = (fullData) => {
    const newData = {
      address: fullData.address,
      companyId: userObj.branchId,
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
    API.post(`/post-requests-handler`, { url: `/Company/branches`, params: {}, data: newData })
      .then(
        (res) => {
          message.success(res);
          setModalIsOpen(false);
          resetPage()
          onReset();
      }
      )
      .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
   
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleClose = () => setModalIsOpen(false);

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

  const getUser = (id) => {
    if(context.hasPermissions("Permissions.User")){
      API.get(`/get-requests-handler`, { params: { url: `/Security/users/${id}` } })
      .then((res) => {
        console.log(res.data);
        setUserObj(res.data);
      })
      .catch((err) => err)
    }
  }

  useEffect(() => {
    form.setFieldsValue({});
    onReset();
  }, [])

  useEffect(() => {
    if(context.user.id){
      getUser(context.user.id)
    }
    if (target === "head-office") {
      setInputArr(headOfficeInputArr);
    } else {
      setInputArr(filialInputArr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const initialValuesObj = {
    name: state?.name,
    identificationNumber: state?.identificationNumber,
    city: state?.city,
    address: state?.address,
    phone: state?.phone,
    accountNum: state?.accountNum,
    logo: state?.logo,
    lineAmount: state?.lineAmount,
    permissibleCategoryes: state?.permissibleCategoryes,
    priority: state?.priority,
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
      title={trans("add_filial")}
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
                  ) : item.type === "number" ? (
                    <InputNumber />
                  ) : item.type === "select" ? (
                    <Select
                      mode={item.mode}
                      placeholder={item.placeholder}
                      getPopupContainer={trigger => trigger.parentNode}
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
                              required: false,
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
                    <Form.Item   className="action-buttons">
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

export default FilialRegistration;
