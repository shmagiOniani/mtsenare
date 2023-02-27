import React, { useState, createRef, useEffect, useContext } from "react";
import { Row, Col, Form, Input, Select, Modal, Button, DatePicker, InputNumber, message, notification } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import moment from 'moment'
import useTranslation from "../../components/translation/useTranslation";
import API from "../../utils/API"
import { GeneralContext } from "../contexts/GeneralContext";


function CarsFilter({ modalIsOpen, setModalIsOpen, onSubmite, newTotal }) {
  
  const { trans } = useTranslation();
  const { testTypes, ownerTypes, testResults, branches, fuelTypes, users } = useContext(GeneralContext)
  const { Option } = Select;
  const [form] = Form.useForm();
  const formRef = createRef();
  
  // const [plateNums, setPlateNums] = useState([])
  const [state, setState] = useState(null);
  const [formValues, setFormValues] = useState({});
  
  const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: trans("empty_input_warning"),
    types: {
      // eslint-disable-next-line no-template-curly-in-string
      accountNum: trans("is_not_right_format"),
      // eslint-disable-next-line no-template-curly-in-string
      officeName: trans("is_not_right_format"),
    },
  };
  const getData = () => {
    // API.get(`/get-requests-handler`, { params: { url: `/VehicleApplication`, params: {States : [1,0]} }  })
    //   .then((res) => {
    //     newTotal(res?.data?.totalCount)
    //     onSubmite(res?.data?.data)
    //   })
    //   .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
  }

  const getFilteredData = (par) => {
    API.get(`/get-requests-handler`, { params: { url: `/VehicleApplication`, params: {...par} }  })
      .then((res) => {
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

    localStorage.setItem('carsFilter', JSON.stringify(newData));
    const savedFilter = JSON.parse(localStorage.getItem('carsFilter'))|| "" ;
    
    const instance = {...savedFilter,
      InspectionDateFrom:  savedFilter?.InspectionDateFrom?.slice(0,10),
      InspectionDateTo: savedFilter?.InspectionDateTo?.slice(0, 10),
    }

    getFilteredData(instance)
    handleClose()
  };

  const onReset = () => {
    form.resetFields();
    localStorage.removeItem('carsFilter');
  };

  const handleClose = () => {
    onReset();
    setModalIsOpen(false)
  };

  // useEffect(()=> {
  //   getData()
  // }, [])

  useEffect(()=> {
    const savedFilter = JSON.parse(localStorage.getItem('carsFilter'))|| "" ;
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
      required: false,
    },
    {
      name: "VinCode",
      label: trans("vin_code"),
      type: "text",
      required: false,
    },
    {
      name: "BranchId",
      label: trans("branch_id"),
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
      options: ownerTypes,
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
      options: [
        {
          name: "ტიპი 1",
          id: 1
        },
        {
          name: "ტიპი 2",
          id: 2
        },
        {
          name: "ტიპი 3",
          id: 3
        },
        {
          name: "ტიპი 4",
          id: 4
        },
        {
          name: "ტიპი 5",
          id: 5
        },
        {
          name: "ტიპი 6",
          id: 6
        },
        {
          name: "ტიპი 7",
          id: 7
        },
        {
          name: "ტიპი 8",
          id: 8
        },
        {
          name: "ტიპი 9",
          id: 9
        },
        {
          name: "ტიპი 10",
          id: 10
        },
        {
          name: "ტიპი 11",
          id: 11
        }
      ],
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
      label: trans("user_id"),
      type: "select",
      required: false,
      mode: "",
      options: users
    },
  ];

  const initialValuesObj = {
    // InspectionDateFrom: state?.InspectionDateFrom,
    // InspectionDateTo: state?.InspectionDateTo,
    PlateNumber: state?.PlateNumber,
    VinCode: state?.VinCode,
    BranchId: state?.BranchId,
    OwnerIdentificationNumber: state?.OwnerIdentificationNumber,
    TestType: state?.TestType,
    OwnerType: state?.OwnerType,
    Owner: state?.Owner,
    Category: state?.Category,
    TestResult: state?.TestResult,
    FuelType: state?.FuelType,
    Paid: state?.Paid,
    UserId: state?.UserId,
    States: [0,1]
  };

  return (
    <Modal
      className="registration-modal filial-registration-modal"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      title={trans("current_application_filter")}
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
                    <Input value={state?.officeName} />
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
                    <Option value={0}>{trans("current")}</Option>
                    <Option value={1}>{trans("finished")}</Option>
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

export default CarsFilter;



