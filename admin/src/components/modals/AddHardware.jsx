import React, { useState, createRef, useEffect } from "react";
import { Row, Col, Form, Input, Select, InputNumber, Modal, Button, DatePicker,notification } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import useTranslation from "../../components/translation/useTranslation";
import API from "../../utils/API";

function AddHardware({
  modalIsOpen,
  setModalIsOpen,
  defaultValue,
  refresh
}) {
  const { trans } = useTranslation();
  const { Option } = Select;
  const [form] = Form.useForm();
  const formRef = createRef();
  const [state] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [inputArr, setInputArr] = useState([]);


  const onFinish = (data) => {
    let formatedDate = JSON.stringify(data.lastMaintenanceDate._d).slice(1, 11);

    const newData = {
      name: data?.name,
      serialNumber: data?.serialNumber,
      city: data?.city,
      branchId: data?.branchId,
      inspectionLine: data?.inspectionLine,
      works: [
        {
          work: data?.work,
          maintancePeriod: data?.maintancePeriod,
          lastMaintenanceDate: formatedDate,
        }
      ]
    }

    API.post(`/post-requests-handler`, { url: `/Machine`, params: {}, data: newData })
      .then(res => {
         refresh()
        handleClose();
      })
      .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
  };

  const handleClose = () => {
    form.resetFields();
    setModalIsOpen(false)
  };


  useEffect(() => {
    form.setFieldsValue(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  const hardwareInputArr = [
    // {
    //   name: "id",
    //   label: "ID",
    //   type: "number",
    //   required: true,
    // },
    {
      name: "name",
      label: trans("name"),
      type: "text",
      required: true,
    },
    {
      name: "serialNumber",
      label: trans("serial_num"),
      type: "text",
      required: true,
    },
    {
      name: "city",
      label: trans("city"),
      type: "text",
      required: true,
    },
    {
      name: "branchId",
      label: trans("branch_id"),
      type: "number",
      required: true,
    },
    {
      name: "inspectionLine",
      label: trans("line"),
      type: "number",
      required: true,
    },
    {
      name: "work",
      label: trans("activity"),
      type: "text",
      required: true,
    },
    {
      name: "maintancePeriod",
      label: trans("day"),
      type: "number",
      required: true,
    },
    {
      name: "lastMaintenanceDate",
      label: trans("last_activity_date"),
      type: "date",
      required: true,
    }
  ];

  const initialValuesObj = {
    name: state?.name,
    serialNumber: state?.serialNumber,
    city: state?.city,
    branchId: state?.branchId,
    inspectionLine: state?.inspectionLine,
    work: state?.work,
    maintancePeriod: state?.maintancePeriod,
    lastMaintenanceDate: state?.lastMaintenanceDate,
  };

  useEffect(() => {
    setInputArr(hardwareInputArr);
  }, []);
  return (
    <Modal
      className="registration-modal filial-registration-modal"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      title={trans("add_hardware")}
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
                  rules={[{
                    required: item.required,
                    message: trans("empty_input_warning")
                  }]}>

                  {item.type === "text" ? (
                    <Input value={state?.officeName} />
                  ) : item.type === "number" ? (
                    <InputNumber />)
                    : item.type === "select" ? (
                      <Select
                        mode={item.mode}
                        placeholder={item.placeholder}
                        getPopupContainer={trigger => trigger.parentNode}
                        dropdownClassName="new-user-select"
                      >
                        {item.options?.map((option, optIndex) => {
                          return (
                            <Option key={optIndex} value={option}>
                              {option}
                            </Option>
                          );
                        })}
                      </Select>
                    ) : item.type === "date" ? (
                      <DatePicker className="date-picker-button"  placeholder={trans("date")} />
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
  )
}

export default AddHardware
