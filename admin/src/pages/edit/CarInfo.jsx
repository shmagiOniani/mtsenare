import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Select, notification } from "antd";
import { DownOutlined } from "@ant-design/icons"
import useTranslation from "../../components/translation/useTranslation";
import API from "../../utils/API";


function CarInfo({ formValues, getData, mainData }) {
  const { trans } = useTranslation();
  const { Option } = Select;

  const [ownerInfoActive, setOwnerInfoActive] = useState(false)
  const [ptiDateActive, setPtiDateActive] = useState(true)
  
  const [paymentMethods, setPaymentMethods] = useState([])
  const [inspectionLines, setInspectionLines] = useState([])
  const [status, setStatus] = useState([])
  const [bodyTypes, setBodyTypes] = useState([])
  const [fuelTypes, setFuelTypes] = useState([])
  const [ownerTypes, setOwnerTypes] = useState([])
  const [testTypes, setTestTypes] = useState([])
  const [categoryTypes, setCategoryTypes] = useState([])
  const [specialTypes, setSpecialTypes] = useState([])
  const [formData, setFormData] = useState({})
  // const [immutabeleData, setImmutabeleData]= useState([])
  
  const [optionsIsSet, setOptionsIsSet]= useState(false)
  const [secondaryPTI, setSecondaryPTI] = useState("")

  const handleGetOptions = () => {
    API.get(`/get-requests-handler`, { params: { url: `/Common/applicationStates` } })
      .then((res) => {
        setStatus(res.data)
      })
      .catch((err) => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      });
    API.get(`/get-requests-handler`, { params: { url: `/Common/specialVehicleTypes` } })
      .then((res) => {
        setSpecialTypes(res.data)
      })
      .catch((err) => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      });

    API.get(`/get-requests-handler`, { params: { url: `/Common/bodyTypes` } })
      .then((res) => {
        setBodyTypes(res.data)
      })
      .catch((err) => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      });

    API.get(`/get-requests-handler`, { params: { url: `/Common/ownerTypes` } })
      .then((res) => {
        setOwnerTypes(res.data)
      })
      .catch((err) => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      });

    API.get(`/get-requests-handler`, { params: { url: `/Common/fuelTypes` } })
      .then((res) => {
        setFuelTypes(res.data)
      })
      .catch((err) => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      });

    API.get(`/get-requests-handler`, { params: { url: `/Common/categories` } })
      .then((res) => {
        setCategoryTypes([
          {
            id: 0, 
            name: "-",
          },
            ...res.data
        ])
      })
      .catch((err) => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      });

    API.get(`/get-requests-handler`, { params: { url: `/Common/testTypes` } })
      .then((res) => {
        setTestTypes(res.data)
      })
      .catch((err) => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      });

    API.get(`/get-requests-handler`, { params: { url: `/Company/inspectionLines` } })
      .then((res) => {
        setInspectionLines(res.data?.map((item, ind) => ({id: item, name: item})))
      })
      .catch((err) => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      });

    API.get(`/get-requests-handler`, { params: { url: `/Common/paymentChannels` } })
      .then((res) => {
        setPaymentMethods(res.data)
      })
      .catch((err) => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      });


      let dataInst = {
        status,
        specialTypes,
        bodyTypes,
        ownerTypes,
        fuelTypes,
        categoryTypes,
        testTypes,
        inspectionLines,
        paymentMethods
      }

      if(Object.keys(dataInst)?.map(item => dataInst.item).includes([])){

      }else {
        setOptionsIsSet(true)
        // setFormData(formValues)
        getData()
      }

  }

  const handleOwnerInfoActive = () => {
    setOwnerInfoActive((prev) => !prev)
  }

  const handlePtiDateActive = () => {
    setPtiDateActive((prev) => !prev)
  }

  const handleSecondaryPTI = () => {
    if (formValues.testType === 2) {
      setSecondaryPTI("InspectionDate")
    } else {
      if (formValues.testResult !== 1) {
        setSecondaryPTI("nextInspectionDate")
      }
    }
  }


  let immutabeleData = [
    {
      label: trans("status"),
      name: "state",
      disable: mainData?.state !== null ,
      type: "select",
      options: status
    },
    {
      label: trans("test_number"),
      name: "id",
      disable: mainData?.id !== null,
      type: "text",
    },
    {
      label: trans("registration_number"),
      name: "plateNumber",
      disable: mainData?.vehicle?.plateNumber !== null,
      type: "text",
    },
    {
      label: trans("car_id"),
      name: "vehicleId",
      disable: mainData?.vehicle?.vehicleId !== null,
      type: "text",
    },
    {
      label: trans("vin_code"),
      name: "vinCode",
      disable: mainData?.vehicle?.vinCode !== null,
      type: "text",
    },
    {
      label: trans("chassis_n"),
      name: "chasiNumber",
      disable: mainData?.vehicle?.chasiNumber !== null,
      type: "text",
    },
    {
      label: trans("registration_date"),
      name: "registrationDate",
      disable: mainData?.registrationDate !== null,
      type: "text",
    },
    {
      label: "პირველადი რეგისტრაცია",
      name: "initialRegistrationDate",
      disable: mainData?.vehicle?.initialRegistrationDate !== null,
      type: "text",
    },
    {
      label: trans("mark"),
      name: "mark",
      disable: mainData?.vehicle?.mark !== null,
      type: "text",
    },
    {
      label: trans("model"),
      name: "model",
      disable: mainData?.vehicle?.model !== null,
      type: "text",
    },
    {
      label: trans("year"),
      name: "year",
      disable: mainData?.vehicle?.year !== null,
      type: "text",
    },
    {
      label: "სს-ს კატეგორია",
      name: "category",
      disable: false,
      type: "select",
      options: categoryTypes
    },
    {
      label: trans("engine_vol"),
      name: "engineVolume",
      disable: mainData?.vehicle?.engineVolume !== null,
      type: "text",
    },
    {
      label: trans("car_color"),
      name: "color",
      disable: mainData?.vehicle?.color !== null,
      type: "text",
    },
    {
      label: trans("fuel_type"),
      name: "fuelType",
      disable: mainData?.vehicle?.fuelType !== null,
      type: "select",
      options: fuelTypes
    },
    {
      label: trans("test_type"),
      name: "testType",
      disable: mainData?.vehicle?.testType !== null,
      type: "select",
      options: testTypes
    },
    {
      label: "ასს-ს  ტიპი",
      name: "bodyType",
      disable: mainData?.vehicle?.bodyType !== null,
      type: "select",
      options: bodyTypes
    },
  ]

  let generalInfoInputs = [
    {
      name: "inspectionLine",
      label: trans("inspection_line"),
      type: "select",
      options: inspectionLines,
      disable: false
    },
    {
      name: "specialPurpose",
      label: trans("special_transport"),
      type: "select",
      disable: false,
      options: [
        {
          name: "-",
          id: 0,
        },
        ...specialTypes
      ],
    },
    {
      name: "paymentChannel",
      label: trans("payment_method"),
      type: "select",
      disable: false,
      options: paymentMethods,
    },
    {
      name: "paid",
      label: trans("paid"),
      type: "select",
      disable: false,
      options: [
        {
          name: trans("yes"),
          id: true,
        },
        {
          name: trans("no"),
          id: false,
        },
      ],
    },
  ];
  const ownerInfo = [
    {
      name: "ownerType",
      label: trans("user_type"),
      type: "select",
      options: ownerTypes,
    },
    {
      name: "mobileNumber",
      label: trans("phone"),
      type: "text",
    },
    {
      name: "registrationCardNumber",
      label: trans("registration_number"),
      type: "text",
    },
    {
      name: "identificationNumber",
      label: trans("identification_num"),
      type: "text",
    },
    {
      name: "name",
      label: trans("fullname"),
      type: "text",
    },
    {
      name: "address",
      label: trans("legal_address"),
      type: "text",
    },
  ];
 
  const PTIDates = [
    {
      label: trans("primary_pti"),
      name: formValues.testType === 1 ? "inspectionDate" : "inspectionStartDate",
      type: "text",
    },
    {
      label: trans("secondary_pti"),
      name: formValues.testResult !== 1 ? "nextInspectionDate" : "",
      type: "text",
    },
    {
      label: trans("validity_period"),
      name: "nextInspectionDate",
      type: "text",
    },
  ];

  useEffect(()=> {
    handleGetOptions()
  },[])
 
  useEffect(() => {
    if(formValues.id) {
      handleSecondaryPTI()
      // setFormData(formValues)
    }
  }, [formData]);

  return (
    <div className="tab-box-wrapper car-info-wrapper car-identification">
      <Row className=" general-info" gutter={[8, 0]}>
        {generalInfoInputs?.map((input, index) => {
          return (
            <Col key={index} xs={24} sm={12} lg={6}>
              <Form.Item
                name={input.name}
                label={input.label}
                rules={[{required: input.required}]}>
                  
                {input.type === "text" ? (
                  <Input
                    type="text"
                    placeholder={input.label}
                    disabled={input.disable}
                  />
                ) : (
                  <Select
                    placeholder={input.label}
                    getPopupContainer={(trigger) => trigger.parentNode}
                    disabled={input.disable}
                  >
                    {input.options?.map((option, optIndex) => {
                      return (
                        <Option key={optIndex} value={option.id}>
                          {option.name || option}
                        </Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>
            </Col>
          );
        })}
      </Row>
      <Row className="owner-info ">
        <Col xs={24} className="header dropdown-header" onClick={handleOwnerInfoActive}>
          <span>{trans("owner_info")}</span>
          <div className={`${ownerInfoActive ? "active-select" : "select-icon"}`} ><DownOutlined /></div>
        </Col>
        <Col xs={24} className={`owner-info-container ${ownerInfoActive ? "active" : ""}`}>
          <Row className="general-info " gutter={[8, 0]}>
            {ownerInfo?.map((input, index) => {
              return (
                <Col key={index} xs={24} sm={12} lg={8}>
                  <Form.Item
                    name={input.name}
                    label={input.label}
                    rules={[
                      {
                        required: input.required,
                      },
                    ]}
                  >
                    {input.type === "text" ? (
                      <Input
                        type="text"
                        placeholder={input.label}
                      />
                    ) : (
                      <Select
                        placeholder={input.label}
                        getPopupContainer={(trigger) => trigger.parentNode}
                      >
                        {input.options?.map((option, optIndex) => {
                          return (
                            <Option key={optIndex} value={option.id}>
                              {option.name}
                            </Option>
                          );
                        })}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
      <div className="car-info list-item owner-info">
        <div className="header">{trans("vehicle_info")}</div>
        <Row gutter={[32, 8]}>
          {immutabeleData?.map((input, index) => {
              return (
                <Col key={index} xs={24} sm={12} md={8} lg={6} xxl={4}>
                  <Form.Item
                    name={input.name}
                    label={input.label}
                    rules={[
                      {
                        required: input.required,
                      },
                    ]}
                  >
                    {input.type === "text" ? (
                      <Input
                        type="text"
                        placeholder={input?.label}
                        disabled={input?.disable}
                      />
                    ) : (
                      <Select
                        placeholder={input.label}
                        getPopupContainer={(trigger) => trigger.parentNode}
                        disabled={input?.disable}
                      >
                        {input.options?.map((option, optIndex) => {
                          return (
                            <Option key={optIndex} value={option.id}>
                              {option.name}
                            </Option>
                          );
                        })}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              );
            })}
        </Row>
      </div>
      <Row className="owner-info">
        <Col xs={24} className="header dropdown-header" onClick={handlePtiDateActive}>
          <span>{trans("pti_deadlines")}</span>
          <div className={`${ptiDateActive ? "active-select" : "select-icon"}`} ><DownOutlined /></div>


        </Col>
        <Col xs={24} className={` pti-date ${ptiDateActive ? "active" : ""}`}>
          <Row className="general-info" gutter={[16, 0]}>
            {PTIDates?.map((input, index) => {
              return (
                <Col key={index} xs={24} sm={12} md={8} >
                  <Form.Item
                    name={input?.name}
                    label={input?.label}
                    rules={[
                      {
                        required: input?.required,
                      },
                    ]}
                  >
                    {input.type === "text" ? (
                      <Input
                        type="text"
                        placeholder={input?.label}
                        disabled={formValues?.[input?.name]}

                      />
                    ) : (
                      <Select
                        placeholder={input.label}
                        getPopupContainer={(trigger) => trigger.parentNode}
                      >
                        {input.options?.map((option, optIndex) => {
                          return (
                            <Option key={optIndex} value={option.value}>
                              {option.label}
                            </Option>
                          );
                        })}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              );
            })}
          </Row>
        </Col>


        {/* {PTIDates?.map((item, index) => {
          return (
            <Col xs={24} sm={12} md={8} className="data-item" key={index}>
              <div>{item.label}</div>
              <div>{item.name}</div>
            </Col>
          );
        })} */}
      </Row>
    </div>
  );
}

export default CarInfo;
