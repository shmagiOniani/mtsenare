import React from "react";
import { Col, Modal, Row, Button, Form } from "antd";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import API from "../../../utils/services/API";
import CloseButton from "../../elements/button/CloseButton";
import CustomInput from "../../elements/input/CustomInput";
import "./AuthStyle.scss";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function AuthModal({ open, setOpen, refresh }) {
  const [form] = Form.useForm();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onAuthorization = (values) => {
    API.post(`/api/users/sign-in`, values).then((res) => {});
  };

  const onRegistration = (values) => {
    API.post(`/api/users/sign-up`, {}).then((res) => {});
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const authInputArr = [
    {
      name: "email",
      type: "text",
      label: "მომხმარებელი",
      xs: 24,
    },
    {
      name: "password",
      type: "password",
      label: "პაროლი",
      xs: 24,
    },
  ];

  const regInputArr = [
    {
      name: "email",
      type: "text",
      label: "მეილი",
      xs: 24,
    },
    {
      name: "password",
      type: "password",
      label: "პაროლი",
      xs: 24,
    },
    {
      name: "firstName",
      type: "text",
      label: "სახელი",
      xs: 24,
    },
    {
      name: "lastName",
      type: "text",
      label: "გვარი",
      xs: 24,
    },
    {
      name: "phoneNumber",
      type: "text",
      label: "მობილური",
      xs: 24,
    },
  ];
  // 'email',
  // 'firstName',
  // 'lastName',
  // 'phoneNumber',


  return (
    <Modal
      className="auth-modal"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      title={"sds"}
      visible={true}
      onCancel={() => setOpen(false)}
      width={600}
    >
      <Row>
        <Col xs={24}>
          <div className="modal-header" onClick={() => setOpen(false)}>
            <CloseButton />
          </div>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="ავტორიზაცია" {...a11yProps(0)} />
              <Tab label="რეგისტრაცია" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div className="modal-body">
              <Form
                form={form}
                name="basic"
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onAuthorization}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
              >
                <Row gutter={[30, 0]}>
                  <CustomInput inputArr={authInputArr} />
                </Row>

                <Form.Item wrapperCol={{span: 24}} labelAlign="right">
                  <Button type="primary" htmlType="submit">
                    შესვლა
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="modal-body">
              <Form
                form={form}
                name="basic"
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onRegistration}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
              >
                <Row gutter={[30, 0]}>
                  <CustomInput inputArr={regInputArr} />
                </Row>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    შესვლა
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </TabPanel>
        </Col>
      </Row>
    </Modal>
  );
}

export default AuthModal;
