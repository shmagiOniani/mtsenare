import React, { useState, createRef } from "react";
import { Row, Col, Form, Input, InputNumber, Select, Modal, Button, DatePicker, message, notification } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import useTranslation from "../../components/translation/useTranslation";
import API from "../../utils/API"

function BookingFilter({ modalIsOpen, handleModalClose, onSubmite }) {

  const { trans } = useTranslation();
  const { Option } = Select;
  const [form] = Form.useForm();
  const formRef = createRef();
  const [state, setState] = useState(null);
  const [formValues, setFormValues] = useState({});

  const getData = (par) => {
    // transformData(instanceData)
    API.get(`/get-requests-handler`, { params: { url: `/Booking`, params: {...par} }  })
      .then(
        (res) => {
          if(res.data.name === "Error"){
            message.error(res.data.message);
          }else {
             onSubmite(res.data.data)
          }
        }
      )
      .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
  }

  const onFinish = (data) => {

    const newData = {
      PlateNumber: data?.PlateNumber,
      BranchId: data?.BranchId,
      VisitDateFrom: data?.VisitDateFrom,
      VisitDateTo: data?.VisitDateTo,
      Status: data?.Status,
      UserId: data?.UserId,
      Page: data?.Page,
      Count: data?.Count,
    };

    getData(newData)
    onReset();
    handleModalClose();
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleClose = () => {
    onReset();
    handleModalClose()
  };

  const inputArr = [

    {
      name: "BranchId",
      label: trans("branch_id"),
      type: "number",
      required: false,
    },
    {
      name: "VisitDateFrom",
      label: trans("from_date"),
      type: "date",
      required: false,
    },
    {
      name: "VisitDateTo",
      label: trans("to_date"),
      type: "date",
      required: false,
    },
    {
      name: "PlateNumber",
      label: trans("plate_number"),
      type: "text",
      required: false,
    },
    {
      name: "Status",
      label: trans("status"),
      type: "select",
      required: false,
      mode: "",
      options: [
        {
          label: trans("status") + " 1",
          value: 1
        },
        {
          label: trans("status") + " 2",
          value: 2
        },
        {
          label: trans("status") + " 2",
          value: 3
        }
      ],
    },
    {
      name: "UserId",
      label: trans("user_id"),
      type: "number",
      required: false,
    },
    // {
    //   name: "Page",
    //   label: "Page",
    //   type: "text",
    //   required: false,
    // },
    // {
    //   name: "Count",
    //   label: "Count",
    //   type: "text",
    //   required: false,
    // },
  ];

  const initialValuesObj = {
    PlateNumber: state?.PlateNumber,
    BranchId: state?.BranchId,
    VisitDateFrom: state?.VisitDateFrom,
    VisitDateTo: state?.VisitDateTo,
    Status: state?.Status,
    UserId: state?.UserId,
    Page: state?.Page,
    Count: state?.Count,
  };

  return (
    <Modal
      className="registration-modal filial-registration-modal"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      title={trans("booking_filter")}
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
        initialValues={initialValuesObj}
        onValuesChange={(_, values) => setFormValues(values)}
      >
        <Row gutter={[20, 0]} justify={"center"} className="registration-form-row">
          {inputArr?.map((item, index) => {
            return (
              <Col key={index} xs={24} sm={12} lg={8}>
                <Form.Item
                  name={item.name}
                  label={item.label}
                  rules={[
                    {
                      required: item.required,
                      message:trans("empty_input_warning")
                    },
                  ]}
                >
                  {item.type === "text" ? (
                    <Input />
                  ): item.type === "number" ? (
                    <InputNumber />) : item.type === "select" ? (
                    <Select
                      mode={item.mode}
                      placeholder={item.placeholder}
                      getPopupContainer={trigger => trigger.parentNode}
                    // dropdownClassName="new-user-select"
                    >
                      {item.options?.map((option, optIndex) => {
                        return (
                          <Option key={optIndex} value={option.value}>
                            {option.label}
                          </Option>
                        );
                      })}
                    </Select>
                  ) : (
                    <DatePicker placeholder={trans("date")} className="date-picker-button" format="YYYY-MM-DD" />
                  )}
                </Form.Item>
              </Col>
            );
          })}
        </Row>

        <Row className="modal-submit-buttons " gutter={[8, 8]} justify={"space-between"}>
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
          <Col xs={12}>
            <Button onClick={handleClose}>{trans("cansel")}</Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default BookingFilter;



