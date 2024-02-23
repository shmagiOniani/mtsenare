import { Row } from "antd";
import React from "react";
import CustomInput from "../elements/input/CustomInput";

function ProductFilter() {
  const [productTypes, setProductTypes] = useState([]);

  const filterInputArr = [
    {
      name: "productType",
      type: "select",
      label: "პროდუქტის ტიპი",
      placeholder: "აირჩიეთ პროდუქტის ტიპი",
      options: productTypes,
      xs: 24,
    },
  ];

  return (
    <Box>
      <Form
        form={form}
        name="basic"
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onAuthorization}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Row gutter={[30, 0]}>
          <CustomInput inputArr={authInputArr} />
        </Row>

        <Form.Item wrapperCol={{ span: 24 }} labelAlign="right">
          <Button type="primary" htmlType="submit">
            შესვლა
          </Button>
        </Form.Item>
      </Form>
    </Box>
  );
}

export default ProductFilter;
