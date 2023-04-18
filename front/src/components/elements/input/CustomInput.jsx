import React from "react";
import { Col, Form, Input, InputNumber, Select } from "antd";
import useTranslation from "../../../translation/useTranslation";
import "./CustomInput.scss";

function CustomInput({ inputArr }) {
  const { trans } = useTranslation();
  const { Option } = Select;

  return (
    <>
      {inputArr.map((item, index) => {
        return (
          <Col key={index} xs={item.xs} sm={item.sm}>
            <Form.Item
              name={item.name}
              label={item.label}
              type={item.type}
              rules={[
                {
                  message: trans("empty_input_warning"),
                },
              ]}
            >
              {item.type === "select" ? (
                <Select
                  mode={item.mode}
                  placeholder={item.placeholder}
                  getPopupContainer={(trigger) => trigger.parentNode}
                >
                  {item.options.map((option) => {
                    return (
                      <Option key={option._id} value={option._id}>
                        {option.name}
                      </Option>
                    );
                  })}
                </Select>
              ) : item.type === "text" ? (
                <Input required={false} className="text-input" />
              ) : item.type === "password" ? (
                <Input.Password
                  autoComplete="new-password"
                  className="text-input"
                />
              ) : (
                <InputNumber />
              )}
            </Form.Item>
          </Col>
        );
      })}
    </>
  );
}

export default CustomInput;
