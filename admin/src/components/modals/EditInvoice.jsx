import React, { useState, createRef, useEffect } from "react";
import { Row, Col, Form, Input, Modal, Button, InputNumber, DatePicker, message, notification } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import moment from 'moment'
import API from "../../utils/API";
import useTranslation from "../../components/translation/useTranslation";


function EditInvoice({ modalIsOpen, setModalIsOpen, refresh, id }) {
  const { trans } = useTranslation();
  const [form] = Form.useForm();
  const formRef = createRef();
  const [state] = useState(null);


  
  
  const [formValues, setFormValues] = useState({});
  const [reset, setReset] = useState(false);
  const [fulldata, setFullata] = useState({})
  const [submitLoading, setSubmitLoading] = useState(false)
  
  const handleClose = () => {
    onReset();
    setModalIsOpen(false)
  };
  const onReset = () => form.resetFields();

  const onFinish = (data) => {
    setSubmitLoading(true)

    let dataInstance = data;
    dataInstance.id = fulldata.id;
    dataInstance.prices = fulldata.prices;
    API.put(`/put-requests-handler`, { url: `/Invoice/${id}`, params: {}, data })
      .then(res => {
        if(res.data.name === "Error"){
          message.error(res.data.message);
        }else {
          setSubmitLoading(false)
          refresh()
          handleClose()
          onReset();
        }

      })
      .catch(err => {
        notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"});
        setSubmitLoading(false)
      })


    // if (reset) {
    //   setReset(false);
    // } else {
    //   handleClose()
    // }
  };

  
  const getData = () => {
    API.get(`/get-requests-handler`, { params: { url: `/Invoice/${id}`, params: {} } })
    .then(
      (res) => {

        if(res.data.name === "Error"){
          message.error(res.data.message);
        }else {
          setFullata(res.data);
          form.setFieldsValue({

            timestamp: moment(res.data.timestamp),
            applicantName: res.data.applicantName,
            identificationCode: res.data.identificationCode,
            contactPhone: res.data.contactPhone,
            contactEmail: res.data.contactEmail,
            applicantAddress: res.data.applicantAddress,
            prescription: res.data.prescription,
            totalPaymentPrice: res.data.totalPaymentPrice,
            totalPrice: res.data.totalPrice,
          });
        }
        }
      )
      .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
  }

  const userInputArr = [
    {
      name: "timestamp",
      label: trans("date"),
      type: "date",
      required: true,
    },
    {
      name: "applicantName",
      label: trans("name"),
      type: "text",
      required: true,
    },
    {
      name: "identificationCode",
      label: trans("identification_num"),
      type: "text",
      required: true,
    },
    {
      name: "contactPhone",
      label: trans("phone"),
      type: "text",
      required: true,
    },
    {
      name: "contactEmail",
      label: trans("email"),
      type: "text",
      required: true,
    },
    {
      name: "applicantAddress",
      label: trans("address"),
      type: "text",
      required: true,
    },
    {
      name: "prescription",
      label: trans("prescription"),
      type: "text",
      required: true,
    },
    {
      name: "totalPaymentPrice",
      label: trans("total_payment_price"),
      type: "number",
      required: true,
    },
    {
      name: "totalPrice",
      label: trans("total_price"),
      type: "number",
      required: true,
    },

  ];

  useEffect(() => {
    onReset();
  }, [])


  useEffect(()=> {
    getData()
  },[modalIsOpen])


  const initialValuesObj = {
    name: state?.name,
    identificationNumber: state?.identificationNumber,
    city: state?.city,
    address: state?.address,
    phone: state?.phone,
    accountNum: state?.accountNum,
    lineAmount: state?.lineAmount,
    permissibleCategoryes: state?.permissibleCategoryes,
    priority: state?.priority,
  };

  return (
    <Modal
      className="registration-modal"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      title={trans("add_invoice")}
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
        <Row gutter={[48, 0]} className="registration-form-row">
          {userInputArr?.map((item, index) => {
            return (
              <Col key={index} xs={24} sm={8}>
                <Form.Item
                  name={item.name}
                  label={item.label}
                  type={item.type}
                  rules={[
                    {
                      required: item.required,
                      message: trans("empty_input_warning")
                    },
                  ]}
                >
                  {item.type === "text" ?
                    <Input />
                    : item.type === "number" ? <InputNumber />
                      : item.type === "date" ? (
                        <DatePicker className="date-picker-button" placeholder={trans("date")} />
                      ) : ""}
                </Form.Item>
              </Col>
            );
          })}
        </Row>
        <div className="linebracke"></div>
        <Row gutter={[8, 8]} justify={"space-between"}>
          <Col xs={24} sm={8}>
            <Form.Item shouldUpdate className="action-buttons">
              <Button style={{ width: "100%" }} onClick={handleClose}>{trans("cancel")}</Button>
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item shouldUpdate className="action-buttons">
              <Button
                loading={submitLoading}
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

export default EditInvoice;
