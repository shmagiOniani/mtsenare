import React, { useEffect, createRef, useState, useContext } from "react";
import { Button, Form, Row, Col, Space, Spin, Modal, message, notification } from "antd";
import { CarOutlined, CloseOutlined, CheckOutlined, WarningOutlined, ApiOutlined, FileImageOutlined, RetweetOutlined, HistoryOutlined, FilePdfOutlined, FolderAddOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";
import API from "../../utils/API"
import { CarInfo, CarIdentification, CarFault, CarEfficiency, CarPhoto, CarLastTest, CarHistory, } from "./";
import CarDetailsModal from "../../components/modals/CarDetailsModal"
import useTranslation from '../../components/translation/useTranslation';
import ApplicationForm from "../../components/PDFViews/ApplicationForm";
import { UserContext } from "../../components/contexts/UserContext";
import { setValues, sendValues } from "./assets"
import "./Edit.scss";
import AddProduct from "../../components/modals/AddProduct";
import CarLastInspection from "./CarLastInspection";

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "გთხოვთ, შეიყვანოთ ${label}.",
  types: {
    // eslint-disable-next-line no-template-curly-in-string
    accountNum: "${label} არ არის სწორი ფორმატის.",
    // eslint-disable-next-line no-template-curly-in-string
    officeName: "${label} არ არის სწორი ფორმატის.",
  },
};

function Edit() {
  const { hasPermissions } = useContext(UserContext)
  const [rendered, setRendered] = useState(false)
  const [form] = Form.useForm();
  const formRef = createRef();
  const { id, tab } = useParams();
  let history = useHistory();

  const [loading, setLoading] = useState(false)
  const [subLoading, setSubLoading] = useState(false)
  const [addTransportIsOpen, setAddTransportIsOpen] = useState(false)

  const [fullData, setFullData] = useState({});
  const [mainData, setMainData] = useState(null)
  const [tree, setTree] = useState([]);
  const [treeClone, setTreeClone] = useState([])
  const [formValues, setFormValues] = useState({});
  const [tabIndex, setTabIndex] = useState("general")
  const [checkboxData, setCheckboxData] = useState([])
  const [putResponse, setPutResponse] = useState([])
  const [pdfOn, setPdfOn] = useState(false)
  const [pdfData, setPdfData] = useState({})
  // const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false)
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false)
  const [pdfLan, setPdfLan] = useState("ka")
  const [historyData, setHistoryData] = useState([])
  const [optionsData, setOptionsData] = useState([])
  const [optionsIsSet, setOptionsIsSet]= useState(false)
  const [ptiResult, setPtiResult] = useState(1)
  const [cancelSubModal, setCancelSubModal] = useState()

  const { trans } = useTranslation();

  const handleSetFormData = (data) => {
    const newData = setValues(data)
    form.setFieldsValue(newData);
  }

  const handleVehicleApi = () => {
    setLoading(true)
    API.get(`/get-requests-handler`, { params: { url: `/VehicleApplication/${id}` } })
      .then((res) => {
        if (res.data) {
          setLoading(false)
          handleSetFormData(res?.data);
          setMainData(res?.data)
          const rejectedIds = res.data.rejectedDetails?.map(element => element.rejectedDetailId);
          setCheckboxData(rejectedIds)
          setPtiResult(res?.data?.testResult)
          setFullData(form.getFieldValue())
        } else {
          history.push("/products")
          notification.error({ message: trans("data_not_found"), placement: "bottomLeft" })
        }
        if(res?.data.state === 3){

          history.push("/products")
        }
      })
      .catch((err) => {
        setLoading(false)
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      })
  };

  const levelOneAllObjects = (tree) => {
    tree.forEach(child => {
      let array = treeClone
      array.push(child)
      setTreeClone(array)
      if (!(child?.children.length > 0)) {
        return false
      } else {
        levelOneAllObjects(child?.children)
      }
    });
  }

  const getTree = () => {
    API.get(`/get-requests-handler`, { params: { url: `/Common/rejectedDetails` } })
      .then((res) => {
        if (res.data.name === "Error") {
          message.error(res.data.message);
        } else {
          setTree(res.data);
          levelOneAllObjects(res.data)
        }
      })
      .catch((err) => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      });
  }

  const getHistory = () => {
    API.get(`/get-requests-handler`, { params: { url: `/VehicleApplication/${id}/history` } })
      .then((res) => {
        if (res.data.name === "Error") {
          message.error(res.data.message);
        } else {
          setHistoryData(res?.data);
        }
      })
      .catch((err) => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      });
  }

  const handleFinish = (arr) => {
    setSubLoading(true)
    let fieldValues = form.getFieldValue();

    const newData = sendValues(fieldValues, arr)
    API.put(`/put-requests-handler`, { url: `/VehicleApplication/${id}`, data: newData })
      .then((res) => {
        setSubLoading(false)
        setPutResponse(res.data)
        // 
        handleSetFormData(res?.data);
        setMainData(res?.data)
        const rejectedIds = res.data.rejectedDetails?.map(element => element.rejectedDetailId);
        setCheckboxData(rejectedIds)
        setPtiResult(res?.data?.testResult)
        setFullData(form.getFieldValue())
        // 
        API.get(`/get-requests-handler`, { params: { url: `/VehicleApplication/${id}` } })
        .then((res) => {
            setPtiResult(res?.data?.testResult)
          })
          .catch((err) => {
            notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
          })
      })
      .catch((err) => {
        setSubLoading(false)
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      })
  }

  const handleCancel = () => {
    const instance = mainData
    instance.state = 3
    API.post(`/post-requests-handler`, { url: `/VehicleApplication/${id}/cancel`, params: { id } })
      .then((res) => {
        setCancelSubModal(false)
        history.push("/products")
      })
      .catch((err) => notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" }))
  }

  const handlePdfApi = (lan) => {
    setPdfLan(lan)
    API.get(`/get-requests-handler`, { params: { url: `/VehicleApplication/${id}/details` } })
      .then((res) => {
        if (res.data.name === "Error") {
          message.error(res?.data?.message);
        } else {
          setPdfData(res.data);
          setPdfOn(true)
        }

      })
      .catch((err) => notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" }))
  }

  const handleGetOptions = () => {
    let dataInst = {
      status: null,
      specialTypes: null,
      bodyTypes: null,
      ownerTypes: null,
      fuelTypes: null,
      categoryTypes: null,
      testTypes: null,
      inspectionLines: null,
      paymentMethods: null
    }

    API.get(`/get-requests-handler`, { params: { url: `/Common/applicationStates` } })
      .then((res) => {
        dataInst.status = res.data
      })
      .catch((err) => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      });
    API.get(`/get-requests-handler`, { params: { url: `/Common/specialVehicleTypes` } })
      .then((res) => {
        dataInst.specialTypes = res.data
      })
      .catch((err) => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      });

    API.get(`/get-requests-handler`, { params: { url: `/Common/bodyTypes` } })
      .then((res) => {
        dataInst.bodyTypes = res.data
      })
      .catch((err) => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      });

    API.get(`/get-requests-handler`, { params: { url: `/Common/ownerTypes` } })
      .then((res) => {
        dataInst.ownerTypes = res.data
      })
      .catch((err) => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      });

    API.get(`/get-requests-handler`, { params: { url: `/Common/fuelTypes` } })
      .then((res) => {
        dataInst.fuelTypes = res.data
      })
      .catch((err) => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      });

    API.get(`/get-requests-handler`, { params: { url: `/Common/categories` } })
      .then((res) => {
        dataInst.categoryTypes = res.data
      })
      .catch((err) => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      });

    API.get(`/get-requests-handler`, { params: { url: `/Common/testTypes` } })
      .then((res) => {
        dataInst.testTypes = res.data
      })
      .catch((err) => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      });

    API.get(`/get-requests-handler`, { params: { url: `/Company/inspectionLines` } })
      .then((res) => {
        dataInst.inspectionLines = res.data?.map((item, ind) => ({id: item, name: item}))
      })
      .catch((err) => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      });

    API.get(`/get-requests-handler`, { params: { url: `/Common/paymentChannels` } })
      .then((res) => {
        dataInst.paymentMethods = res.data
      })
      .catch((err) => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      });

      if(Object.keys(dataInst)?.map(item => dataInst.item).includes(null)){
        // console.log("if",dataInst);
      }else {
        // console.log("else",dataInst);
        setOptionsData(dataInst)
        setOptionsIsSet(true)
      }
  }

  const handleTab =(tabId)=> {
    console.log(tabIndex, tabId, checkboxData);
    if (tabIndex === 'general' || tabIndex === 'identification' || tabIndex === 'defects') {
      handleFinish(checkboxData)
    }
    setTabIndex(tabId)
    history.push(`/car-edit/${id}/${tabId}`)
  }

  useEffect(()=> {
    handleGetOptions()
    if(!tab) {
      history.push(`/car-edit/${id}/${'general'}`)
    }else {
      setTabIndex(tab)
    }
  },[])

  useEffect(() => {
    setRendered(true)
    if (rendered && optionsIsSet) {
      getTree()
      handleVehicleApi()
      getHistory()
    }
  }, [rendered])

// useEffect(() => {
//   if(optionsIsSet){
//     handleVehicleApi()
//   }
// }, [tabIndex])

const initialValuesObj = {
  inspectionLine: fullData?.inspectionLine,
  paid: fullData?.paid,
  paymentChannel: fullData?.paymentChannel,
  specialPurpose: fullData?.vehicle?.specialPurpose,
  cng: "-",
  lpg: "-",
};

const tabs = [
  {
    id: 'general',
    title: mainData?.vehicle?.plateNumber?.toUpperCase(),
    icon: <CarOutlined />,
    component: <CarInfo formValues={form.getFieldValue()} getData={()=>handleSetFormData(mainData)} mainData={mainData}/>
  },
  {
    id: 'identification',
    title: trans("identification"),
    icon: <CheckOutlined />,
    component: <CarIdentification form={form} mainData={mainData} />
  },
  {
    id: 'defects',
    title: trans("defects_found"),
    icon: <WarningOutlined />,
    component: <CarFault
      data={form.getFieldValue()}
      putResponse={putResponse}
      treeClone={treeClone}
      tree={tree}
      getTree={() => getTree()}
      reset={() => handleVehicleApi()}
      getCheckboxArr={(data) => setCheckboxData(data)}
      handleFinish={(arr) => handleFinish(arr)}
    />
  },
  {
    id: 'efficiency',
    title: trans("efficiency"),
    icon: <ApiOutlined />,
    component: <CarEfficiency mainData={mainData} />
  },
  {
    id: 'images',
    title: trans("images"),
    icon: <FileImageOutlined />,
    component: <CarPhoto data={mainData} id={mainData?.id} />
  },
  {
    id: 'last-inspection',
    title: trans("last_inspection_result"),
    icon: <RetweetOutlined />,
    component: <CarLastInspection />
  },
  {
    id: 'history',
    title: trans("history"),
    icon: <HistoryOutlined />,
    component: <CarHistory data={historyData} />
  },
]

return (
  <>
    {!loading ? <div className="content-wrapper edit-wrapper">
      <Form
        validateMessages={validateMessages}
        className="edit-form"
        form={form}
        ref={formRef}
        name="edit-form"
        layout="vertical"
        onValuesChange={(_, values) => setFormValues(values)}
        onFinish={(data) => handleFinish(checkboxData)}
        initialValues={initialValuesObj}
      >
        <div className="tabs">
          {mainData && tabs?.map((tab, index) => {
            return (
              <div key={tab?.id} onClick={() => handleTab(tab?.id)} className={`tab ${tabIndex === tab?.id ? "active" : ""} `}>{tab?.icon} {tab?.title}</div>
            )
          })}
          <div className="add-button">
            <Button type="primary" onClick={()=> setAddTransportIsOpen(!addTransportIsOpen)} icon={<FolderAddOutlined />} >{'განაცხადის დამატება'} </Button>
          </div>
        </div>
        {optionsIsSet && tabs?.map((item, index) => {
          return (
            <div key={item?.id} className="tab-container">
              {tabIndex === item?.id && item?.component}
            </div>
          )
        })}
        <Row gutter={[30, 15]} className="button-group" justify={"space-between"}>
          <Col xs={24} sm={12} md={6}>
            {hasPermissions("Permissions.VehicleApplication.Done") && <Button className="default-outlined-btn" onClick={() => setDetailsModalIsOpen(prev => !prev)} type="default"> {mainData?.state === 0 ?  trans("finish") : "გადამოწმება და ატვირთვა"} </Button>}
          </Col>
          <Col xs={24} sm={12} md={6}>
            {hasPermissions("Permissions.VehicleApplication.Cancel") && <Button type="default" danger icon={<CloseOutlined />} onClick={() => setCancelSubModal(true)}>
              {trans("cancel")}
            </Button>}
          </Col>
          {mainData?.state === 2 ?
            <Col xs={24} sm={12} md={6}>
              {/* <Button type="default" onClick={()=> setPdfOn(prev=> !prev)}> {trans("finish")} </Button> */}
              <div className="print-button">
                <div className="title">
                  <FilePdfOutlined />
                  <span>{trans("download")}</span>
                </div>
                <div className="buttons">

                  <Button type="default" onClick={() => handlePdfApi("en")} >en</Button>
                  <Button type="default" onClick={() => handlePdfApi("ka")} >ka</Button>
                </div>
              </div>

              {pdfOn && <ApplicationForm id={id} data={pdfData} handleClose={() => setPdfOn(false)} language={pdfLan} />}

            </Col>
            : ""}

          <Col className="status-view" xs={24} sm={12} md={6}>
            <div className={ptiResult === 1 ? "pass" : ptiResult === 0 ? "did-not-pass" : "forbidden"} >{ptiResult === 1 ? trans("success") : ptiResult === 0 ? trans("fault") : ptiResult === null ? `${trans('status')} ${trans("not_found")}` : trans("forbidden_expluatation")}</div>
          </Col>
          <Col xs={24} sm={12} md={6}>

            {hasPermissions("Permissions.VehicleApplication.Edit") && <Button className="focus-white" type="primary" htmlType="submit" >
              {trans("save")}
            </Button>}

          </Col>
        </Row>
      </Form>
    </div> : ""}
    {/* <ApplicationForm id={id} data={pdfData} handleClose={()=> setPdfOn(false)} /> */}
    <CarDetailsModal data={() => sendValues(form.getFieldValue(), checkboxData)} dataState={mainData?.state} modalIsOpen={detailsModalIsOpen} setModalIsOpen={setDetailsModalIsOpen} id={id} refresh={handleVehicleApi} >
      <CarPhoto />
    </CarDetailsModal>
    {/* comment modal */}
    <Modal
      title={trans("cancel")}
      visible={cancelSubModal}
      onOk={handleCancel}
      // confirmLoading={delLoading}
      onCancel={() => setCancelSubModal(false)}
      okText={trans("yes")}
      cancelText={trans("no")}
    >
      <p>ნამდვილად გსურთ რეგისტრაციის გაუქმება?</p>
    </Modal>
    {loading &&
      <Space size="middle" className='loading'>
        <Spin size="large" />
      </Space>
    }
    {subLoading &&
      <Space size="middle" className='loading'>
        <Spin size="large" />
      </Space>
    }
    {addTransportIsOpen && <AddProduct modalIsOpen={addTransportIsOpen} setModalIsOpen={setAddTransportIsOpen} rerender={()=> console.log("successfully add")} />
     }
  </>
);
}

export default Edit;
