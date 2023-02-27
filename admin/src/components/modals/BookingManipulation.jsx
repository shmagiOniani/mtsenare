import React, { useState, createRef, useEffect, useContext } from "react";
import { UserContext } from '../contexts/UserContext'
import { Row, Col, Form, Input, Select, Modal, Button, DatePicker, message, notification } from "antd";
import moment from 'moment'
import { CheckOutlined } from "@ant-design/icons";
import useTranslation from "../translation/useTranslation";
import API from "../../utils/API";

function BookingManipulation({
  modalIsOpen,
  setModalIsOpen,
  modalType,
  // defaultValue,
  selectedId,
  refreshTable
}) {
  const context = useContext(UserContext);
  const { trans } = useTranslation();
  const { Option } = Select;
  const [form] = Form.useForm();
  const formRef = createRef();
  const [state] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [reset, setReset] = useState(false);
  const [inputArr, setInputArr] = useState([]);

  const [paymentChannels, setPaymentChannels] = useState([])

  const postData = (data) => {
    API.post(`/post-requests-handler`, { url: `/Booking`, params: {}, data })
      .then(res => refreshTable())
      .catch((err) =>notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
  }

  const putData = (data) => {
    API.put(`/put-requests-handler`, { url: `/Booking/${selectedId}`, params: {}, data })
      .then((res) => refreshTable())
      .catch((err) =>notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
  }

  const onFinish = (data) => {
    data.branchId = 1
    let formatedDate = JSON.stringify(data.visitDate._d).slice(1, 11);

    const newData = {
      // "id": 0,
      "plateNumber": data.plateNumber,
      "customer": data.customer,
      "phoneNumber": data.phoneNumber,
      "branchId": context.user.branchId,
      "visitDate": formatedDate,
      "paymentChannel": data.paymentChannel,
      "amount": data.amount,
      "finished": data?.finished
    }

    if (modalType === "post") {
      postData(newData)

    } else {
      putData(newData)
    }

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

  const getPaymnetChannels = () => {
    API.get(`/get-requests-handler`, { params: { url: `/Common/paymentChannels`, params: {} } })
      .then(
        (res) => {
          if (res.data.name === "Error") {
            message.error(res.data.message);
          } else {
            setPaymentChannels(res.data)
          }
        }
      )
      .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
  }

  const filialInputArr = [
    {
      name: "plateNumber",
      label: trans("plate_number"),
      type: "text",
      required: false,
    },
    {
      name: "customer",
      label: trans("customer"),
      type: "text",
      required: true,
    },
    {
      name: "phoneNumber",
      label: trans("phone"),
      type: "text",
      required: true,
    },

    {
      name: "visitDate",
      label: trans("date"),
      type: "date",
      required: true,
    },
    {
      name: "paymentChannel",
      label: trans("payment_method"),
      type: "select",
      options: paymentChannels,
      required: true,
    },
    {
      name: "amount",
      label: trans("price"),
      type: "text",
      required: true,
    },

  ];

  useEffect(() => {
    if (modalIsOpen) {
      if (modalType === "post") {
        form.setFieldsValue({});
      } else {
        API.get(`/get-requests-handler`, { params: { url: `/Booking/${selectedId}`, params: {} } })
          .then(res => {
            if (res.data.name === "Error") {
              message.error(res.data.message);
            } else {
              form.setFieldsValue({
                plateNumber: res.data.plateNumber,
                customer: res.data.customer,
                phoneNumber: res.data.phoneNumber,
                visitDate: moment(res.data.visitDate),
                paymentChannel: res.data.paymentChannel,
                amount: res.data.amount,
                finished: false
              })
            }
          })
          .catch(err => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
      }
      setInputArr(filialInputArr);
    }else {
      onReset()
    }
    getPaymnetChannels()
  }, [modalIsOpen])

  const initialValuesObj = {
    logo: state?.logo,
    fullName: state?.fullName,
    identificationNum: state?.identificationNum,
    legalAddress: state?.legalAddress,
    actualAddress: state?.actualAddress,
    phone: state?.phone,
  };

  return (
    <Modal
      className="registration-modal"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      title={modalType === "post" ? trans("add_booking") : trans("edit_booking")}
      visible={modalIsOpen}
      onCancel={handleClose}
    >
      <Form
        // validateMessages={validateMessages}
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
                      message: trans("empty_input_warning")
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
                          <Option key={optIndex} value={option.id}>
                            {option.name}
                          </Option>
                        );
                      })}
                    </Select>
                  ) : item.type === "date" ? (
                    // <DatePicker showTime onChange={onChange} onOk={onOk} />

                    <DatePicker className="date-picker-button" showTime  placeholder={trans("date")} />
                  ) : (
                    ""
                  )}
                </Form.Item>
              </Col>
            );
          })}
        </Row>
        <Row gutter={[8, 8]} justify={"space-between"}>
          <Col xs={24} sm={8}>
            <Form.Item shouldUpdate className="action-buttons">
              <Button style={{ width: "100%" }} onClick={handleClose}>{trans("cancel")}</Button>
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

export default BookingManipulation;
