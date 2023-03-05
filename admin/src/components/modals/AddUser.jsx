import React, { useState, createRef, useEffect, useContext } from "react";
import {
  Row,
  Col,
  Form,
  Modal,
  Button,
  notification,
  Divider,
  Checkbox,
} from "antd";
import { CheckOutlined } from "@ant-design/icons";
import API from "../../utils/API";
import useTranslation from "../../components/translation/useTranslation";
import { UserContext } from "../contexts/UserContext";
import CustomInput from "../inputs/CustomInput";

function AddUser({ modalIsOpen, setModalIsOpen, refresh, target, data }) {
  const { trans } = useTranslation();
  const context = useContext(UserContext);

  const [form] = Form.useForm();
  const formRef = createRef();
  const [formValues, setFormValues] = useState({});
  const [shopList, setShopList] = useState([]);
  const [positionsArr, setPositionsArr] = useState([]);
  const [linkedToShop, setLinkedToShop]= useState(false)
  const [initialValues, setInitialValues]= useState([])

  const handleClose = () => {
    onReset();
    setModalIsOpen(false);
  };
  const onReset = () => form.resetFields();

  const onFinish = (data) => {
    console.log(data); 
    API.post(`/api/sign-up`, data)
    .then(() => {
      handleClose()
      form.resetFields();
    })
    .catch(err => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
    // .finally(() => setConfirmLoading(false))

  };

  const getBranches = () => {
    if (context.hasPermissions("Permissions.Branch")) {
      // API.get(`/get-requests-handler`, { params: { url: `/Company/branches`, params: {} }  })
      //   .then(res => {
      //     setBranches(res.data)
      //   })
      //   .catch(err => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
    }
  };

  const userInputArr = [
    {
      name: "username",
      label: trans("username"),
      type: "text",
      required: true,
      xs: 24,
      sm: 12,
    },
    {
      name: "password",
      label: trans("password"),
      type: "password",
      required: true,
      xs: 24,
      sm: 12,
    },
    {
      name: "firsName",
      label: trans("first_name"),
      type: "text",
      required: true,
      xs: 24,
      sm: 12,
    },
    {
      name: "lastName",
      label: trans("last_name"),
      type: "text",
      required: true,
      xs: 24,
      sm: 12,
    },
    {
      name: "email",
      label: trans("email"),
      type: "text",
      required: false,
      xs: 24,
      sm: 12,
    },
    {
      name: "phoneNumber",
      label: trans("phone"),
      type: "text",
      required: false,
      xs: 24,
      sm: 12,
    },
  ];

  const additionalInputs = [
    {
      name: "shop",
      label: trans("shop"),
      type: "select",
      options: shopList,
      required: true,
      xs: 24,
      sm: 12,
    },
    {
      name: "positionId",
      label: trans("position"),
      type: "select",
      options: positionsArr,
      required: true,
      xs: 24,
      sm: 12,
    },
  ];

  useEffect(() => {
    onReset();
    getBranches();
    setPositionsArr([
      {
        _id: 2,
        name: "ადმინისტრატორი",
      },
    ]);
    setShopList([
      {
        _id: 2,
        name: "მაღაზია",
      },
    ]);

    if(modalIsOpen && target === "add"){
      setInitialValues({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        shop: "",
        positionId: "",
      })
    }else {
      setInitialValues(data)
    }
  }, []);

  return (
    <Modal
      className="registration-modal filial-registration-modal"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      title={target === "add" ? trans("add_user") : trans("edit_user")}
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
        initialValues={initialValues}
        onValuesChange={(_, values) => setFormValues(values)}
      >
        <Row gutter={[48, 0]} className="registration-form-row">
          <CustomInput inputArr={userInputArr} />
        </Row>
        <Checkbox onChange={(v)=> setLinkedToShop(v.target.checked)} checked={linkedToShop}>ორგანიზაციის თანამშრომელი</Checkbox>
        <Divider />
        {linkedToShop && <Row gutter={[48, 0]} className="registration-form-row">
          <CustomInput inputArr={additionalInputs} />
        </Row>}
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={8}>
            <Form.Item shouldUpdate className="action-buttons">
              <Button style={{ width: "100%" }} onClick={handleClose}>
                {trans("cancel")}
              </Button>
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item shouldUpdate className="action-buttons">
              <Button
                htmlType="submit"
                onClick={refresh}
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
