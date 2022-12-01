import { Button } from 'antd'
import PropTypes from "prop-types"
import React from 'react'
import "./style.scss"


function CustomButton({type, size, disabled, loading, icon, children, htmlType, onClick}) {
  return (
    <Button 
    className={type + " " + size} 
    htmlType={htmlType} 
    loading={loading}
    icon={icon}
    disabled={disabled}
    onClick={onClick}
    >
    {children}
  </Button>
  )
}

export default CustomButton

CustomButton.propTypes = {
  type: PropTypes.oneOf(["ghost", "success", "warn", "error"]),
  htmlType:  PropTypes.oneOf(["submit", "button"])
}
