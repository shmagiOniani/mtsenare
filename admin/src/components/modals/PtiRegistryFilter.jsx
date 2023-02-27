import React, { useState, createRef, useEffect, useContext } from "react";
import { Row, Col, Form, Input, Select, Modal, Button, DatePicker, InputNumber, notification } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import moment from 'moment'
import useTranslation from "../../components/translation/useTranslation";
import API from "../../utils/API"
import { GeneralContext } from "../contexts/GeneralContext";



function PtiRegistryFilter({ modalIsOpen, setModalIsOpen, onSubmite, newTotal }) {

  const { trans } = useTranslation();
  const {categories, testTypes, branches, users, testResults, fuelTypes, ownerTypes} = useContext(GeneralContext)
  const { Option } = Select;
  const [form] = Form.useForm();
  const formRef = createRef();

  const [formValues, setFormValues] = useState({});
  const [categoryTypes, setCategoryTypes]= useState([])
  

  const getData = () => {
    API.get(`/get-requests-handler`, { params: { url: `/VehicleApplication`, params: {States : [2,3]} }  })
      .then((res) => {
          newTotal(res?.data?.totalCount)
          onSubmite(res?.data?.data)

          // const instance = res?.data?.data?.map(car => ({id:car.plateNumber, name:car.plateNumber}))
          // setPlateNums(instance)
        })
      .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
  }

  const getFilteredData = (par) => {
    API.get(`/get-requests-handler`, { params: { url: `/VehicleApplication`, params: {...par} }  })
      .then(
        (res) => {
          newTotal(res?.data?.totalCount)
          onSubmite(res?.data?.data)
        })
      .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
  }

  const onFinish = (data) => {
    const newData = {
      InspectionDateFrom:  data?.InspectionDateFrom,
      InspectionDateTo: data?.InspectionDateTo,
      PlateNumber: data?.PlateNumber,
      VinCode: data?.VinCode,
      BranchId: data?.BranchId,
      OwnerIdentificationNumber: data?.OwnerIdentificationNumber,
      TestType: data?.TestType,
      OwnerType: data?.OwnerType,
      Owner: data?.Owner,
      Category: data?.Category,
      TestResult: data?.TestResult,
      FuelType: data?.FuelType,
      Paid: data?.Paid,
      UserId: data?.UserId,
      States: data?.States
    };

    localStorage.setItem('ptiFilter', JSON.stringify(newData));
    const savedFilter = JSON.parse(localStorage.getItem('ptiFilter'))|| "" ;
    
    const instance = {...savedFilter,
      InspectionDateFrom:  savedFilter?.InspectionDateFrom?.slice(0,10),
      InspectionDateTo: savedFilter?.InspectionDateTo?.slice(0, 10),
    }

    getFilteredData(instance)
    handleClose()
  };

  const onReset = () => {
    form.resetFields();
    localStorage.removeItem('ptiFilter');
  };

  const handleClose = () => {
    onReset();
    setModalIsOpen(false)
  };

  useEffect(()=> {
    if(modalIsOpen){
      getData()
    }
    setCategoryTypes(categories)
  }, [])

  useEffect(()=> {
    const savedFilter = JSON.parse(localStorage.getItem('ptiFilter'))|| "" ;
    const filterInstance =  {
      InspectionDateFrom: savedFilter?.InspectionDateFrom && moment(savedFilter?.InspectionDateFrom),
      InspectionDateTo: savedFilter?.InspectionDateTo && moment(savedFilter?.InspectionDateTo) ,
      PlateNumber: savedFilter?.PlateNumber,
      VinCode: savedFilter?.VinCode,
      BranchId: savedFilter?.BranchId,
      OwnerIdentificationNumber: savedFilter?.OwnerIdentificationNumber,
      TestType: savedFilter?.TestType,
      OwnerType: savedFilter?.OwnerType,
      Owner: savedFilter?.Owner,
      Category: savedFilter?.Category,
      TestResult: savedFilter?.TestResult,
      FuelType: savedFilter?.FuelType,
      Paid: savedFilter?.Paid,
      UserId: savedFilter?.UserId,
    };

    form.setFieldsValue(filterInstance)
  }, [modalIsOpen])

  const inputArr = [
    {
      name: "InspectionDateFrom",
      label: trans("from_date"),
      type: "date",
      required: false,
    },
    {
      name: "InspectionDateTo",
      label: trans("to_date"),
      type: "date",
      required: false,
    },
    {
      name: "PlateNumber",
      label: trans("registration_number"),
      type: "text",
      mode: "",
      required: false,
      // options:plateNums
    },
    {
      name: "VinCode",
      label: trans("vin_code"),
      type: "text",
      required: false,
    },
    {
      name: "BranchId",
      label: trans("branch"),
      type: "select",
      mode: "",
      required: false,
      options: branches
    },
    {
      name: "OwnerIdentificationNumber",
      label: trans("owner_identification"),
      type: "text",
      required: false,
    },
    {
      name: "TestType",
      label: trans("test_type"),
      type: "select",
      required: false,
      mode: "",
      options: testTypes,
    },
    {
      name: "OwnerType",
      label: trans("owner_type"),
      type: "select",
      required: false,
      mode: "",
      options: ownerTypes ,
    },
    {
      name: "Owner",
      label: trans("owner"),
      type: "text",
      required: false,
    },
    {
      name: "Category",
      label: trans("category"),
      type: "select",
      required: false,
      mode: "",
      options: categoryTypes,
    },
    {
      name: "TestResult",
      label: trans("test_result"),
      type: "select",
      required: false,
      mode: "",
      options: testResults,
    },
    {
      name: "FuelType",
      label: trans("fuel_type"),
      type: "select",
      required: false,
      mode: "",
      options: fuelTypes,
    },
    {
      name: "Paid",
      label: trans("payment_status"),
      type: "select",
      required: false,
      mode: "",
      options: [
        {
          name: trans("paid"),
          id: true
        },
        {
          name: trans("not_paid"),
          id: false
        },
      ],
    },
    {
      name: "UserId",
      label: trans("user"),
      type: "select",
      required: false,
      mode: "",
      options: users
    },
  ];

  const initialValuesObj = {
    PlateNumber: "",
    VinCode: "",
    BranchId: "",
    OwnerIdentificationNumber: "",
    TestType: "",
    OwnerType: "",
    Owner: "",
    Category: "",
    TestResult: "",
    FuelType: "",
    Paid: "",
    UserId: "",
    States: [2,3]
  };

  const validateMessages = {
    required: trans("empty_input_warning"),
    types: {
      accountNum: trans("is_not_right_format"),
      officeName: trans("is_not_right_format"),
    },
  };
  return (
    <Modal
      className="registration-modal filial-registration-modal"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      title={trans("registry_filter")}
      visible={modalIsOpen}
      onCancel={handleClose}
      width={1000}
    >
      <Form
        validateMessages={validateMessages}
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
                    },
                  ]}
                >
                  {item.type === "text" ? (
                    <Input  />
                  ) : item.type === "select" ? (
                    <Select
                      mode={item.mode}
                      // placeholder={item.placeholder}
                      getPopupContainer={trigger => trigger.parentNode}
                    // dropdownClassName="new-user-select"
                    >
                      {item?.options?.map((option, optIndex) => {
                        return (
                          <Option key={optIndex} value={option.id}>
                            {option.name}
                          </Option>
                        );
                      })}
                    </Select>
                  ): item.type === "number" ? (
                    <InputNumber />) : (
                    <DatePicker placeholder={trans("date")} className="date-picker-button" format="YYYY-MM-DD" />
                  )}
                </Form.Item>
              </Col>
            );
          })}
            <Col xs={24} sm={12} lg={8}>
                <Form.Item
                  name={"States"}
                  label={trans("status")}
                >
                  <Select
                    mode="multiple"
                  >
                    <Option value={2}>{trans("uploaded")}</Option>
                    <Option value={3}>{trans("canceled")}</Option>
                  </Select>
                </Form.Item>
              </Col>
        </Row>

        <Row className="modal-submit-buttons " gutter={[8, 8]} justify={"space-between"}>
        <Col xs={12}>
            <Button onClick={onReset}>{trans("remove")}</Button>
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
  );
}

export default PtiRegistryFilter;



