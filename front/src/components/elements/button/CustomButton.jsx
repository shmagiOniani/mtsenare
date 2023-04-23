import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import "./style.scss";

function CustomButton({
  type,
  size,
  disabled,
  loading,
  icon,
  children,
  htmlType,
  onClick,
  className
}) {
  return (
    <Button
      className={className}
      htmlType={htmlType}
      loading={loading}
      icon={icon}
      disabled={disabled}
      onClick={onClick}
      type={type}
      size={size}
    >
      {children}
    </Button>
  );
}

export default CustomButton;

CustomButton.propTypes = {
  type: PropTypes.oneOf([
    "ghost",
    "dashed",
    "default",
    "link",
    "primary",
    "text",
  ]),
  htmlType: PropTypes.oneOf(["submit", "button"]),
  size: PropTypes.oneOf(["large", "medium", "small"]),
};
