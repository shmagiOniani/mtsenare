import React from 'react'
import { DatePicker, Input, InputNumber, Select } from 'antd'
import PropTypes from "prop-types"

function CustomInput({type, value, placeholder, range, mode, options, rows}) {

  const { Option } = Select;
  const { TextArea } = Input;

  const number = (
    <InputNumber 
      value={value}
      placeholder={placeholder}
      min={range.min}
      max={range.max}
      
    />
  )

  const text = (
    <Input 
      value={value}
      placeholder={placeholder}
    />
  )

  const textArea = (
    <TextArea
      value={value} 
      rows={rows}
    />
  )

  const date = (
    <DatePicker 
      value={value}
      placeholder={placeholder}
      format="YYYY-MM-DD"
    />
  )
  
  const select = (
    <Select 
      value={value}
      mode={mode}
      placeholder={placeholder}
    >
      {options?.map((option, optIndex) => {
        return (
          <Option key={optIndex} value={option.id}>
            {option.name}
          </Option>
        );
      })}
    </Select>
  )

  const renderInput = ()=> {
    switch (type) {
      case "number": number 
        break;
      case "text": text 
       break;
      case "textArea": textArea 
       break;
      case "date": date 
       break;
      case "select": select 
       break;
      default:
        break;
    }
  }

  return renderInput
}

export default CustomInput

CustomInput.propTypes = {
  type: PropTypes.oneOf(["text", "textArea", "select", "date", "number"]),
}
