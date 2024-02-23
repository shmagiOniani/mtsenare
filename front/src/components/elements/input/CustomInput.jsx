import React from "react";
import { Col, DatePicker, Form, Input, InputNumber, Select } from "antd";
import useTranslation from "../../../translation/useTranslation";
import "./CustomInput.scss";
import TextArea from "antd/lib/input/TextArea";

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
                  multiple={item.multiple}
                  mode={item.mode}
                  placeholder={item.placeholder}
                  getPopupContainer={(trigger) => trigger.parentNode}
                  className="select-input"
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
                <Input
                  required={false}
                  className="text-input"
                  placeholder={item.placeholder}
                />
              ): item.type === "text-area" ? (
                <TextArea
                rows={item.rows || 5}
                  className="text-input"
                  placeholder={item.placeholder}
                />
              ) : item.type === "password" ? (
                <Input.Password
                  placeholder={item.placeholder}
                  autoComplete="new-password"
                  className="text-input"
                />
              )  : item.type === "number" ? (
                <InputNumber
                  className="num-input"
                  placeholder={item.placeholder}
                />
              ): item.type === "date" ? (
                <DatePicker
                  className="date-input"
                  placeholder={item.placeholder}
                />
              ): ""}
            </Form.Item>
          </Col>
        );
      })}
    </>
  );
}

export default CustomInput;
