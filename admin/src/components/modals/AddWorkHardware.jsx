import React, { useState, createRef, useEffect } from "react";
import { Row, Col, Form, Input, Select, Modal, Button, InputNumber, DatePicker, notification, Checkbox } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import useTranslation from "../../components/translation/useTranslation";
import API from "../../utils/API";
import TextArea from "antd/lib/input/TextArea";


function AddWorkHardware({
  modalIsOpen,
  setModalIsOpen,
  refresh
}) {
  const { trans } = useTranslation();
  const { Option } = Select;
  const [form] = Form.useForm();
  const formRef = createRef();
  const [state] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [hardwares, setHardwares] = useState([])
  const [loading, setLoading] = useState(false)

  const [checkBox, setCheckbox] = useState(true)


  const onFinish = (data) => {
    let formatedDate = JSON.stringify(data.lastMaintenanceDate._d).slice(1, 11);
    
    data.lastMaintenanceDate = formatedDate;

      if(checkBox){
      data.maintenancePeriod = -1
    }
    
    setLoading(true)
    API.post(`/post-requests-handler`, { url: `/Machine/${data?.hardware}/works`, params: {}, data })
      .then(res => {
         handleClose()
        setLoading(false)
      })
      .catch((err) => {
        handleClose()
        setLoading(false)
        notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"})
      })

  };

  const handleClose = () => {
    form.resetFields();
    setModalIsOpen(false)
    refresh()
  };
  const getHardwares = () => {
    API.get(`/get-requests-handler`, { params: { url: `/Machine`, params: {} } })
      .then((res) => {
        setHardwares(res.data.data)
      })
      .catch((err) => {
        notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"})
      })
  }

  // const handleHardware = () => {
  //   const selectedObjId = form.getFieldValue().hardware;
  //   setSelectedId(selectedObjId)
  // }
  const initialValuesObj = {
    work: state?.work,
    // maintenancePeriod: state?.maintenancePeriod,
    lastMaintenanceDate: state?.lastMaintenanceDate,
  };

  useEffect(() => {
    form.resetFields();
    // setInputArr(hardwareInputArr);
    getHardwares()
    setCheckbox(false)
    setLoading(false)
  }, [modalIsOpen]);


  return (
    <Modal
      className="registration-modal add-work-modal"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      title={trans("add_work")}
      visible={modalIsOpen}
      onCancel={handleClose}
      width={900}
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
        <Row gutter={[28, 0]} className="registration-form-row">
          <Col xs={24} sm={12}>
            <Form.Item
              name={"hardware"}
              label={trans("hardware")}
              rules={[{ required: true }]}
            >
              <Select placeholder={trans("choose_hardware")}  >
                {hardwares?.map((option, optIndex) => {
                  return (
                    <Option key={optIndex} value={option.id}>
                      {option.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name={"work"}
              label={trans("activity")}
              rules={[{
                required: true,
                message: trans("empty_input_warning")
              }]}
            >
              <Input />
            </Form.Item>
          </Col>


          <Col xs={24} sm={12} className={"day-wrapper"}>
              <Form.Item
                name={"maintenancePeriod"}
                label={trans("day")}
                rules={[
                  {
                    required: !checkBox,
                    message: trans("empty_input_warning")
                  },
                ]}
              > 
              <InputNumber disabled={checkBox} min={1}/>
              </Form.Item>
              <div className="checkbox-wrapper">
                <Checkbox onChange={(val) => setCheckbox(val.target.checked)}>{trans("without_period")}</Checkbox>
              </div>

          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name={"lastMaintenanceDate"}
              label={trans("last_activity_date")}
              rules={[{
                required: true,
                message: trans("empty_input_warning")
              }]}
            >
              <DatePicker className="date-picker-button"  placeholder={trans("date")} />
            </Form.Item>
          </Col>
          <Col xs={24} >
            <Form.Item
              name={"comment"}
              label={trans("comment")}
              rules={[{
                required: false,
                message: trans("empty_input_warning")
              }]}
            >
              <TextArea rows={5} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 8]} justify={"space-between"} className={"filial-actions"} >
          <Col xs={12}>
            <Button onClick={handleClose}>{trans("cancel")}</Button>
          </Col>
          <Col xs={12}>
            <Form.Item shouldUpdate >
              <Button
                loading={loading}
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

export default AddWorkHardware
