import React,{ createRef }  from 'react'
import { useHistory } from "react-router-dom";
import { Row, Col, Form, Input, Modal, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import useTranslation from "../../components/translation/useTranslation";
import TextArea from 'antd/lib/input/TextArea';



function CarEditReason({ modalIsOpen, handleClose, id }) {
  let history = useHistory();
  const { trans } = useTranslation();
  const [form] = Form.useForm();
  const formRef = createRef();

  const redirect = ()=> {
    history.push(`/car-edit/${id}/general`)
  }

  const onFinish = (data) => {
    redirect()
  }

  const initialValuesObj = {
    editReason: "",
  };

  return (
   <Modal
      className="registration-modal edit-reason-modal"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      title={trans("the_reason_of_data_change")}
      visible={modalIsOpen}
      onCancel={handleClose}
    >
      <Form
        className="edit-form"
        form={form}
        ref={formRef}
        name="edit-form"
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValuesObj}
        // onValuesChange={(_, values) => setFormValues(values)}
      >
        <Row gutter={[48, 0]} className="registration-form-row">
          <Col xs={24} >
            <Form.Item
              name={"editReason"}
              rules={[
                {
                  required: true,
                  message: trans("empty_input_warning")
                },
              ]}
            >
              <TextArea rows={"5"}  />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 8]} justify={"center"} align={"middle"} >
          <Col xs={24}>
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

export default CarEditReason