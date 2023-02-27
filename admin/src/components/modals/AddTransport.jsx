import React, { useState, createRef, useEffect, useContext } from "react";
import { Row, Col, Form, Input, Select, Modal, Button, DatePicker, message, notification } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import useTranslation from "../../components/translation/useTranslation";
import { UserContext } from "../../components/contexts/UserContext";
import API from "../../utils/API"
import { useHistory } from "react-router-dom";
import { GeneralContext } from "../contexts/GeneralContext";


function AddTransport({ modalIsOpen, setModalIsOpen, rerender }) {
  const context = useContext(UserContext);
  const { trans } = useTranslation();
  const { Option } = Select;
  const [form] = Form.useForm();
  const formRef = createRef();
  const [state] = useState(null);
  const history = useHistory();
  const { inspectionLines, paymentChannels, testTypes } = useContext(GeneralContext)

  const [refresh, setRefresh] = useState(false)

  const [formValues, setFormValues] = useState({});
  const [subLoading, setSubLoading] = useState(false)

  const [additionalInfo, setAdditionalInfo] = useState(false)
  const [validated, setValidated] = useState(false)
  const [isTaxi, setIsTaxi] = useState(false)
  const [hasVinCode, setHasVinCode] = useState(null)
  const [hasChasiCode, setHasChasiCode] = useState(null)

  let initialValues = {
    vinCode: "",
    testType: "",
    ownerType: 1,
    inspectionLine: 1,
    // TestPermissions: null,
    specialPurpose: 0,
    specialTransport: 0,
    name: state?.name,
    identificationNum: state?.identificationNum,
    city: state?.city,
    address: state?.address,
    phone: state?.phone,
    accountNum: state?.accountNum,
    logo: state?.logo,
    lineAmount: state?.lineAmount,
    permissibleCategoryes: state?.permissibleCategoryes,
    priority: state?.priority,
    paymentChannel: null,
    paymentStatus: true,
    cng: "-",
    lpg: "-",
  }
  const [initialValuesObj, setInitialValuesObj] = useState(initialValues);


  const handleValidate = () => {
    const fieldValues = form.getFieldValue();

    API.get(`/get-requests-handler`, { params: { url: `/VehicleApplication/initial?plateNumber=${fieldValues.plateNumber.toUpperCase()}`, params: {} } })
      .then(res => {
        setIsTaxi(res.data.isTaxi)
        setValidated(true)
        // setInitialValuesObj((prev)=> ({...prev, specialPurpose: 0, vinCode: res.data.vinCode, testType: res.data.testType}) )
        let hasVin = res.data?.vinCode !== null && res.data?.vinCode !== "";

        if (res.data.ownerType === 2) {
          form.setFieldsValue({
            ownerMobileNumber: res.data?.mobileNumber,
            ownerAddress: res.data?.ownerAddress,
            ownerIdentificationNumber: res.data?.ownerIdentificationNumber,
            ownerName: res.data?.ownerName,
            ownerType: 2,
            specialPurpose: res.data?.specialPurpose,
            vinCode: hasVin ? res.data?.vinCode : res.data?.chasiNumber,
            testType: res.data?.testType
          })
          setAdditionalInfo(true)
        } else {
          form.setFieldsValue({
            ownerMobileNumber: res.data?.mobileNumber,
            specialPurpose: res.data?.specialPurpose,
            vinCode: hasVin ? res.data?.vinCode : res.data?.chasiNumber, 
            testType: res.data.testType
          })
          // qq540ll
        }
        setHasVinCode(hasVin);
        setHasChasiCode(res.data?.chasiNumber !== null && res.data?.chasiNumber !== "");

      })
      .catch((err) => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      })
  }

  useEffect(() => {
    setRefresh(true)
    form.setFieldsValue(initialValuesObj)
  }, [isTaxi, validated, refresh])

  const onFinish = (data) => {
    setSubLoading(true)
    let newData = {
      companyId: context.user.companyId,
      plateNumber: data?.plateNumber || "",
      inspectionLine: data?.inspectionLine || 1,
      specialPurpose: data?.specialPurpose || 0,
      ownerType: data?.ownerType || 0,
      paymentChannel: data?.paymentChannel || 1,
      paid: data?.paid || true,
      ownerName: data?.ownerName || "",
      ownerIdentificationNumber: data?.ownerIdentificationNumber || "",
      ownerMobileNumber: data?.ownerMobileNumber || "",
      ownerAddress: data?.ownerAddress || "",
      gasCertificates: {
        cylinderCount: data?.cng === "yes" ? data.cngCylinder : data.lpgCylinder
      }
    }

    if (data.cng !== "-") {
      const cngDate = JSON.stringify(data?.cngValidDate?._d)?.slice(1, 11);
      newData.gasCertificates.cngCertificate = {
        certification: data?.cng === "yes",
        bannerNumber: data?.cngFinishNumber || "",
        certificateNumber: data?.cngCertificateNumber || "",
        validUntil: cngDate || null
      };
    } else {
      newData.gasCertificates.cngCertificate = null
    }
    if (data.lpg !== "-") {
      const lpgDate = JSON.stringify(data?.lpgValidDate?._d)?.slice(1, 11);
      newData.gasCertificates.lpgCertificate = {
        certification: data?.lpg === "yes",
        bannerNumber: data?.lpgFinishNumber || "",
        certificateNumber: data?.lpgCertificateNumber || "",
        validUntil: lpgDate || null
      };
    } else {
      newData.gasCertificates.lpgCertificate = null
    }
    API.post('/post-requests-handler', { url: `/VehicleApplication`, params: {}, data: newData })
      .then((res) => {
        history.push(`/car-edit/${res?.data?.id}/general`);
        setSubLoading(false);
        setValidated(false)
        setModalIsOpen(false);
        onReset();
        rerender();
        // window.location.replace(`/car-edit/${res.data.id}/general`)
      })
      .catch((err) => {
        setSubLoading(false);
        notification.error({ message: trans(err?.response?.data) || err?.response?.data, placement: "bottomLeft" });
      })
  };

  const onReset = () => {
    form.resetFields();
    setFormValues({})
    setIsTaxi("")
  };

  const handleClose = () => {
    onReset();
    setModalIsOpen(false)
    setValidated(false)
    setSubLoading(false)
  };

  useEffect(() => {
    if (formValues.ownerType === 2) {
      setAdditionalInfo(true)
    } else {
      setAdditionalInfo(false)
    }
  }, [formValues])

  const inputArr = [
    {
      name: "ownerMobileNumber",
      label: trans("phone"),
      type: "text",
      required: true,
    },
    {
      name: "inspectionLine",
      label: trans("line"),
      type: "select",
      required: false,
      mode: "",
      options: inspectionLines?.map((item, ind) => ({ id: item, name: item })),
    },
    {
      name: "specialPurpose",
      label: trans("special_transport"),
      type: "select",
      required: false,
      mode: "",
      options: [
        {
          name: "-",
          id: 0
        },
        {
          name: "ტაქსი",
          id: 1
        },
        {
          name: "სასწრაფო",
          id: 2
        },
      ],
    },
    {
      name: "ownerType",
      label: trans("user_type"),
      type: "select",
      required: true,
      mode: "",
      options: [
        {
          name: trans("individual"),
          id: 1
        },
        {
          name: trans("corporate_person"),
          id: 2
        },
        {
          name: trans("state_owned"),
          id: 3
        },
      ],
    },
    {
      name: "paymentChannel",
      label: trans("payment_method"),
      type: "select",
      required: true,
      mode: "",
      options: paymentChannels,
    },
    {
      name: "paymentStatus",
      label: trans("payment_status"),
      type: "select",
      required: true,
      mode: "",
      options: [
        {
          name: trans("yes"),
          id: true
        },

        {
          name: trans("no"),
          id: false
        },
      ],
    },

  ];

  const additionalInputArr = [
    {
      name: "ownerName",
      label: trans("owner_name"),
      type: "text",
      required: false,
    },
    {
      name: "ownerIdentificationNumber",
      label: trans("owner_id"),
      type: "text",
      required: false,
    },
    {
      name: "ownerAddress",
      label: trans("owner_address"),
      type: "text",
      required: false,
    },

  ];

  const CNGInputArr = [
    {
      name: "cng",
      label: "CNG " + trans("certificate"),
      placeholder: "CNG" + trans("certificate"),
      type: "select",
      required: false,
      mode: "",
      options: [
        {
          name: "-",
          id: "-"
        },
        {
          name: trans("yes"),
          id: "yes"
        },
        {
          name: trans("no"),
          id: "no"
        }
      ],
      subInputs: [
        {
          name: "cngFinishNumber",
          label: "CNG " + trans("finish_number"),
          type: "text",
          show: formValues["cng"] === "yes",
          required: formValues["cng"] ? true : false,
        },
        {
          name: "cngCertificateNumber",
          label: "CNG " + trans("certificate_num"),
          type: "text",
          show: formValues["cng"] === "yes",
          required: formValues["cng"] ? true : false,
        },
        {
          name: "cngValidDate",
          label: "CNG " + trans("validity_period"),
          type: "date",
          show: formValues["cng"] === "yes",
          required: formValues["cng"] ? true : false,
        },
        {
          name: "cngCylinder",
          label: "CNG " + trans("airbag_amount"),
          type: "text",
          show: formValues["cng"] === "yes" || formValues["cng"] === "no",
          required: formValues["cng"] !== "-" ? true : false,
        },
      ]
    },
    {
      name: "lpg",
      label: "LPG " + trans("certificate"),
      type: "select",
      required: false,
      mode: "",
      options: [
        {
          name: "-",
          id: "-"
        },
        {
          name: trans("yes"),
          id: "yes"
        },
        {
          name: trans("no"),
          id: "no"
        }
      ],
      subInputs: [
        {
          name: "lpgFinishNumber",
          label: "LPG " + trans("finish_number"),
          type: "text",
          show: formValues["lpg"] === "yes",
          required: formValues["lpg"] ? true : false,
        },
        {
          name: "lpgCertificateNumber",
          label: "LPG " + trans("certificate_num"),
          type: "text",
          show: formValues["lpg"] === "yes",
          required: formValues["lpg"] ? true : false,
        },
        {
          name: "lpgValidDate",
          label: "LPG " + trans("validity_period"),
          type: "date",
          show: formValues["lpg"] === "yes",
          required: formValues["lpg"] ? true : false,
        },
        {
          name: "lpgCylinder",
          label: "LPG " + trans("airbag_amount"),
          type: "text",
          show: formValues["lpg"] === "no" || formValues["lpg"] === "yes",
          required: formValues["lpg"] !== "-" ? true : false,
        },
      ]
    },

  ];

  return (
    <>
      <Modal
        className="registration-modal filial-registration-modal"
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        title={trans("add_car")}
        visible={modalIsOpen}
        onCancel={handleClose}
        width={590}
      >
        <Form
          // validateMessages={validateMessages}
          className="edit-form"
          form={form}
          ref={formRef}
          name="edit-form"
          layout="vertical"
          onFinish={onFinish}
          initialValues={initialValuesObj}
          onValuesChange={(_, values) => setFormValues(values)}
        >

          <Row gutter={[48, 0]} className="registration-form-row">
            <Col xs={24} sm={12}>
              <Form.Item
                name={"specialTransport"}
                label={trans("transport")}
                rules={[{
                  required: false,
                  message: trans("empty_input_warning")
                }]}>
                <Select disabled={validated} >

                  <Option value={0}> სამოქალაქო </Option>
                  <Option value={3}> სამხედრო </Option>
                  <Option value={4}> უცხოური </Option>

                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="plateNumber"
                label={trans("registration_number")}
                required={false}
              >
                <Input disabled={validated} />
              </Form.Item>
            </Col>
          </Row >
          {!validated ?
            <Row justify={"end"} align={"middle"} >
              <Col>
                <Button onClick={() => handleValidate()} style={{ marginBottom: "15px" }} type={"primary"}>{trans("submit")}</Button>
              </Col>
            </Row>
            : <>
              <div className="brake" />
              <Row gutter={[48, 0]} className="registration-form-row">
                <Col xs={24} sm={12}>
                  <Form.Item
                    name={'vinCode'}
                    label={hasVinCode ? trans('vin_code') : trans('chassis_n')}
                  >
                    <Input disabled={hasVinCode || hasChasiCode} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name={'testType'}
                    label={trans('test_type')}
                  >
                    <Select
                      placeholder={trans('test_type')}
                      getPopupContainer={trigger => trigger.parentNode}
                      disabled
                    >
                      {testTypes?.map((option, optIndex) => {
                        return (
                          <Option key={optIndex} value={option.id}>
                            {option.name || option}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>


                {inputArr?.map((item, index) => {
                  return (
                    <Col key={index} xs={24} sm={12}>
                      <Form.Item
                        name={item.name}
                        label={item.label}
                        rules={[
                          {
                            required: item.required,
                            message: trans("empty_input_warning")
                          },
                        ]}
                      >
                        {item.type === "text" ? (
                          <Input />
                        ) : item.type === "select" ? (
                          <Select
                            mode={item.mode}
                            placeholder={item.placeholder}
                            getPopupContainer={trigger => trigger.parentNode}
                          // dropdownClassName="new-user-select"
                          >
                            {item.options?.map((option, optIndex) => {
                              return (
                                <Option key={optIndex} value={option.id}>
                                  {option.name || option}
                                </Option>
                              );
                            })}
                          </Select>
                        ) : (
                          ""
                        )}
                      </Form.Item>
                    </Col>
                  );
                })}
              </Row>
              {additionalInfo && <Row gutter={[48, 0]} justify={"center"} className="registration-form-row">
                <div className="brake" />
                <Col xs={24}>
                  <h6>{trans("additional_information")}</h6>
                </Col>
                {additionalInputArr?.map((item, index) => {
                  return (
                    <Col key={index} xs={24} sm={index === 2 ? 24 : 12} >
                      <Form.Item
                        name={item.name}
                        label={item.label}
                        rules={[
                          {
                            required: item.required,
                            message: trans("empty_input_warning")
                          },
                        ]}
                      >
                        <Input value={state?.officeName} />
                      </Form.Item>
                    </Col>
                  );
                })}
              </Row>
              }
              <div className="brake" />
              <Row gutter={[48, 0]} justify={"center"} className="registration-form-row">

                {CNGInputArr?.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Col key={index} xs={24} sm={12}>
                        <Form.Item
                          name={item.name}
                          label={item.label}
                          rules={[
                            {
                              required: item.required,
                            },
                          ]}
                        >
                          <Select
                            mode={item.mode}
                            placeholder={item.placeholder}
                            getPopupContainer={trigger => trigger.parentNode}
                            defaultValue={trans("no")}
                          // dropdownClassName="new-user-select"
                          >
                            {item.options?.map((option, optIndex) => {
                              return (
                                <Option key={optIndex} value={option.id}>
                                  {option.name}
                                </Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                      {formValues[item.name] !== "-" && item.subInputs.filter(i => i.show)?.map((certificate, certificateIndex) => {
                        return (
                          <Col key={certificateIndex} xs={24} sm={12}>
                            <Form.Item
                              name={certificate.name}
                              label={certificate.label}
                              rules={[
                                {
                                  required: certificate.required,
                                  message: trans("empty_input_warning")
                                },
                              ]}
                            >
                              {certificate.type === "date" ?
                                <DatePicker placeholder={trans("date")} className="date-picker-button" format="YYYY-MM-DD" />
                                :
                                <Input value={state?.officeName} />
                              }
                            </Form.Item>
                          </Col>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </Row>
              <Row gutter={[8, 8]} justify={"space-between"} className={"filial-actions"} >
                <Col xs={12}>
                  <Button onClick={handleClose}>{trans("cancel")}</Button>
                </Col>
                <Col xs={12}>
                  <Form.Item shouldUpdate >
                    <Button
                      htmlType="submit"
                      type="primary"
                      icon={<CheckOutlined />}
                      loading={subLoading}
                      className="focus-white"

                    >
                      {trans("save")}
                    </Button>
                  </Form.Item>
                </Col>

              </Row>
            </>}
        </Form>

      </Modal>

    </>
  );
}

export default AddTransport;
