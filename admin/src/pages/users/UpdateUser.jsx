import React, { useState, createRef, useEffect, useContext } from "react";
import { Row, Col, Form, Input, Select, InputNumber, Modal, Button, notification } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import useTranslation from "../../components/translation/useTranslation";
import API from "../../utils/API";
import { UserContext } from "../../components/contexts/UserContext";

function UpdateUser({
  modalIsOpen,
  setModalIsOpen,
  selectedId,
  rolesArr,
  positionsArr,
  branchesArr
}) {
  const { trans } = useTranslation()
  const {hasPermissions}= useContext(UserContext)
  const { Option } = Select;
  const [form] = Form.useForm();
  const formRef = createRef();
  const [state] = useState(null);
  const [ formValues, setFormValues] = useState({});
  const [inputArr, setInputArr] = useState([]);
  const [roles, setRoles] = useState([]);
  const [positions, setPositions] = useState([]);
  const [branches, setBranches] = useState([]);
  const [fullData, setFullData] = useState({});

  const getUser = () => {
    if(hasPermissions("Permissions.User")){
      setFullData({})
      API.get(`/get-requests-handler`, { params: { url: `/Security/users/${selectedId}` } })
      .then((res) => {
        setFullData(res.data);
      })
      .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
    }
  }



  const onFinish = (data) => {
    // const selectedRoles = roles.filter(item => data?.roles.includes(item.id))

    const newData= {
      branchId: data?.branchId,
      email: data?.email,
      fullName: data?.fullName,
      identificationNumber: data?.identificationNumber,
      phoneNumber: data?.phoneNumber,
      password: data?.password,
      positionId: data?.positionId
    }
    console.log(newData, roles, data);

    API.put(`/put-requests-handler`, { url: `/Security/users/${selectedId}`, params: {}, data: newData })
      .then(res => handleClose())
      .catch(err =>notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))

    API.post(`/post-requests-handler`, { url: `/Security/users/${selectedId}/roles`, params: {}, data: data?.roles })
      .then(res => handleClose())
      .catch(err =>notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
  };

  const handleClose = () => {
    form.resetFields();
    // refresh()
    setModalIsOpen()
  };

  useEffect(() => {
    form.setFieldsValue(fullData);
  }, [fullData]);

  useEffect(()=> {
    if(modalIsOpen) {
      getUser()
    }
    setRoles(rolesArr)
    setPositions(positionsArr)
    setBranches(branchesArr)
  },[modalIsOpen])
  
  const hardwareInputArr = [
    {
      name: "fullName",
      label: trans("fullname"),
      type: "text",
      required: false,
    },
    {
      name: "password",
      label: trans("password"),
      type: "password",
      required: false,
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
      required: false,
      options: branchesArr,
      mode:false
    },
    {
      name: "identificationNumber",
      label: trans("identification_num"),
      type: "number",
      required: false,
    },
    {
      name: "positionId",
      label: trans("position"),
      type: "select",
      required: false,
      options: positionsArr,
      mode:false
    },
    {
      name: "roles",
      label: trans("roles"),
      type: "select",
      required: false,
      options: rolesArr,
      mode:"multiple"
    },
  ];

  const initialValuesObj = {
    name: state?.name,
    serialNumber: state?.serialNumber,
    city: state?.city,
    branchId: state?.branchId,
    inspectionLine: state?.inspectionLine,
  };


  useEffect(() => {
    setInputArr(hardwareInputArr);

  }, []);
  return (
    <Modal
      className="registration-modal filial-registration-modal"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      title={trans("edit_user")}
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
                  ): item.type === "password" ? (
                    <Input.Password value={state?.officeName} />
                  ): item.type === "number" ? (
                    <InputNumber />)
                     : item.type === "select" ? (
                    <Select
                      mode={item.mode}
                      placeholder={item?.placeholder}
                      getPopupContainer={trigger => trigger?.parentNode}
                      dropdownClassName="new-user-select"
                    >
                      {item.options?.length && item?.options?.map((option, optIndex) => {
                        return (
                          <Option key={option.id} value={option.id}>
                            {option.name}
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
          {/* <Col xs={24} sm={12}>
            <Form.Item name={"isActive"} valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
              <Checkbox>{trans("status")}</Checkbox>
            </Form.Item>
          </Col> */}
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

export default UpdateUser
