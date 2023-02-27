import React, { useState, useEffect } from "react";
import { Input, Select, Row, Col, Form, InputNumber, DatePicker } from "antd";
import { DownOutlined } from "@ant-design/icons";
// import moment from 'moment'

import useTranslation from "../../components/translation/useTranslation";

// const dateFormat = 'YYYY/MM/DD';
// const initialValue = undefined; // this initial value should be in state

function CarIdentification({ form }) {
  const { Option } = Select;

  const { trans } = useTranslation();
  // const [name, setName] = useState("")
  const [inputArr, setInputArr] = useState([]);

  const [certOpen, setCertOpen] = useState(true);

  const [cngOpen, setCngOpen] = useState(null);
  const [lpgOpen, setLpgOpen] = useState(null);

  const toggleCert = () => {
    setCertOpen((prev) => !prev);
  };

  const handleCertificate = (certificate, value) => {
    if(certificate === "lpg"){
      setLpgOpen(value)
    }else {
      setCngOpen(value)
    }
  }

  useEffect(()=> {
    console.log(form.getFieldValue().cng);
    // if(form.getFieldValue()?.lpgBannerNumber){
    //   // setLpgOpen("yes")
    //   setCngOpen(null)
    // }else if(form.getFieldValue()?.cngBannerNumber){
    //   setCngOpen("yes")
    //   setLpgOpen(null)
    // }
  },[])

  const carInfoInputs = [
    {
      name: "odometerValue",
      label: trans("odometer"),
      type: "number",
    },
    {
      name: "odometerUnit",
      label: trans("unit"),
      type: "select",
      options: [
        {
          label: "KM",
          value: 0,
        },
        {
          label: "ML",
          value: 1,
        },
      ],
    },
    {
      name: "doorsCount",
      label: trans("door_count"),
      type: "select",
      options: [
        {
          label: "--",
          value: 0,
        },
        {
          label: "2",
          value: 1,
        },
        {
          label: "3",
          value: 2,
        },
        {
          label: "4",
          value: 3,
        },
      ],
    },
    {
      name: "allDoorsCount",
      label: trans("door_total_count"),
      type: "select",
      options: [
        {
          label: "--",
          value: 0,
        },
        {
          label: "2",
          value: 2,
        },
        {
          label: "3",
          value: 3,
        },
        {
          label: "4",
          value: 4,
        },
        {
          label: "5",
          value: 5,
        },
      ],
    },
    {
      name: "wheelPosition",
      label: trans("str_wheel_position_actual"),
      type: "select",
      options: [
        {
          label: "--",
          value: 0,
        },
        {
          label: trans("left"),
          value: 1,
        },
        {
          label: trans("right"),
          value: 2,
        },
        // {
        //   label: trans("trailer"),
        //   value: 3,
        // },
      ],
    },
    {
      name: "stockWheelPosition",
      label: trans("str_wheel_position_first_reg"),
      type: "select",
      options: [
        {
          label: "--",
          value: 0,
        },
        {
          label: trans("left"),
          value: 1,
        },
        {
          label: trans("right"),
          value: 2,
        },
        // {
        //   label: trans("trailer"),
        //   value: 3,
        // },
      ],
    },
    {
      name: "stockCatalycConverter",
      label: trans("chas_catalyst"),
      type: "select",
      options: [
        {
          label: trans("yes"),
          value: true,
        },
        {
          label: trans("no"),
          value: false,
        },
      ],
    },
    {
      name: "catalycConverter",
      label: trans("catalyst_actual"),
      type: "select",
      options: [
        {
          label: "--",
          value: false,
        },
        {
          label: trans("yes"),
          value: true,
        },
        {
          label: trans("no"),
          value: false,
        },
      ],
    },
    {
      name: "tachograph",
      label: trans("tacograph"),
      type: "select",
      options: [
        {
          label: trans("yes"),
          value: true,
        },
        {
          label: trans("no"),
          value: false,
        },
      ],
    },
    {
      name: "speedLimiter",
      label: trans("speed_limiter_device"),
      type: "select",
      options: [
        {
          label: trans("yes"),
          value: true,
        },
        {
          label: trans("no"),
          value: false,
        },
      ],
    },

    {
      name: "turbo",
      label: trans("turbo"),
      type: "select",
      options: [
        {
          label: trans("yes"),
          value: true,
        },
        {
          label: trans("no"),
          value: false,
        },
      ],
    },
  ];

  const gasInputArr = [
    {
      name: "cng",
      label: "CNG " + trans("certificate"),
      placeholder: "CNG" + trans("certificate"),
      type: "select",
      onChange: (e) => handleCertificate("cng",e),
      isOpen: form.getFieldValue().cng,
      value: cngOpen,
      options: [
        {
          label: "-",
          value: null,
        },
        {
          label: trans("yes"),
          value: true,
        },
        {
          label: trans("no"),
          value: false,
        },
      ],
      subInputs: [
        {
          name: "cngBannerNumber",
          label: "CNG " + trans("finish_number"),
          type: "text",
        },
        {
          name: "cngCertificateNumber",
          label: "CNG " + trans("certificate_num"),
          type: "text",
        },
        {
          name: "cngValidUntil",
          label: "CNG " + trans("validity_period"),
          type: "date",
        },
      ],
    },
    {
      name: "lpg",
      label: "LPG " + trans("certificate"),
      type: "select",
      onChange: (e) => handleCertificate("lpg",e),
      isOpen: form.getFieldValue().lpg,
      value: lpgOpen,
      options: [
        {
          label: "-",
          value: null,
        },
        {
          label: trans("yes"),
          value: true,
        },
        {
          label: trans("no"),
          value: false,
        },
      ],
      subInputs: [
        {
          name: "lpgBannerNumber",
          label: "LPG " + trans("finish_number"),
          type: "text",
        },
        {
          name: "lpgCertificateNumber",
          label: "LPG " + trans("certificate_num"),
          type: "text",
        },
        {
          name: "lpgValidUntil",
          label: "LPG " + trans("validity_period"),
          type: "date",
        },
      ],
    },
  ];
  
  useEffect(() => {
    setInputArr(carInfoInputs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="car-identification ">
      <div className="car-info list-item">
        {/* <div className="header">ინფორმაცია ავტომობილზე</div> */}

        <Row gutter={[32, 8]}>
          {inputArr?.map((input, index) => {
            return (
              <Col key={index} xs={24} sm={12} lg={6}>
                <Form.Item name={input.name} label={input.label}>
                  {input.type === "text" ? (
                    <Input
                      type="text"
                      placeholder={input.label}
                    />
                  ) : input.type === "number" ? (
                    <InputNumber />
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
      </div>
      <div className="list-item gas-cert">
        <Col xs={24} className="header dropdown-header" onClick={toggleCert}>
          <span> CNG & LPG</span>
          <div className={`${certOpen ? "active-select" : "select-icon"}`} ><DownOutlined /></div>
        </Col>
        <Row
          gutter={[32, 8]}
          className={`gas-cert-container ${certOpen ? "active" : ""}`}
        >
          { gasInputArr?.map((input, index) => {
            return (
              <React.Fragment key={index}>
                <Col xs={24} sm={12} lg={6} className="parent-col">
                  <div className="label">{input.label}</div>
                  <Form.Item name={input.name} >

                  <Select
                    defaultValue={input.value}
                    onChange={input.onChange}
                    style={{ width: 120 }}
                  >
                    {input.options?.map((option, optIndx) => {
                      return (
                        <Option key={optIndx} value={option.value}>
                          {option.label}
                        </Option>
                      );
                    })}
                  </Select>
                  </Form.Item>
                </Col>
                {input.isOpen &&
                  input.subInputs?.map((subInput, subInputInd) => {
                    return (
                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                        key={subInputInd}
                        className="child-col"
                      >
                        {subInput.type === "date" ? (
                          <Form.Item name={subInput.name} label={subInput.label}>
                            <DatePicker
                              placeholder={trans("date")}
                              format="YYYY-MM-DD"
                              className="date-picker-button"
                            />
                          </Form.Item>
                        ) : (
                          <Form.Item
                            name={subInput.name}
                            label={subInput.label}
                          >
                            <Input />
                          </Form.Item>
                        )}
                      </Col>
                    );
                  })}
              </React.Fragment>
            );
          })}
          { (form.getFieldValue().lpg !== null || form.getFieldValue().cng !== null )  && <Col onClick={()=> console.log(form.getFieldValue().cng, form.getFieldValue().lpg)} xs={24} sm={12} lg={6}>
            <Form.Item name={"cylinderCount"} label={trans("airbag_amount")}>
              <InputNumber min={1}/>
            </Form.Item>
          </Col>}
        </Row>
      </div>
    </div>
  );
}

export default CarIdentification;
