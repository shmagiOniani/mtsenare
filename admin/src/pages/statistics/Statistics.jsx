import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Modal, Form, DatePicker, Button, message, notification } from 'antd'
import { LineChartOutlined, EllipsisOutlined, ArrowLeftOutlined, ArrowRightOutlined, FilterOutlined } from "@ant-design/icons"
import { useHistory, useParams } from "react-router-dom";
import moment from 'moment';
import { write, utils, writeFile } from 'xlsx';
import API from '../../utils/API';
import useTranslation from '../../components/translation/useTranslation'
import "./Statistics.scss"
import StatisticFilter from './StatisticFilter';
import { UserContext } from '../../components/contexts/UserContext';


const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

function Statistics() {
  const {hasPermissions} = useContext(UserContext)
  const { id } = useParams();
  const { trans } = useTranslation()
  const [repForm] = Form.useForm();

  const monthFormat = 'YYYY/MM';
  let history = useHistory()
  let today = new Date();
  let currentDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 1}`;
  let currentMonth = `${today.getFullYear()}-${today.getMonth() + 1}-1`;
  let MY = `${today.getFullYear()}-${today.getMonth() + 1}`;

  const [filterOpen, setFilterOpen] = useState(false)

  const [statisticData, setStatisticData] = useState({})
  const [incomeResults, setIncomeResults] = useState({})

  const [incomeModal, setIncomeModal] = useState(false)
  const [statisticModal, setStatisticModal] = useState(false)

  const getInspectionResults = (data) => {
    const par = {
      fromDate: currentMonth,
      toDate: currentDate,
    };
    API.get(`/get-requests-handler`, { params: { url: `/Report/InspectionResults`, params: { ...par } } })
      .then(
        (res) => {
          setStatisticData(res.data)
        }
      )
      .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
  }

  const getIncomeResults = (data) => {
    const par = {
      // fromDate: currentMonth,
      toDate: currentDate,
    };
    API.get(`/get-requests-handler`, { params: { url: `/Report/Income`, params: { ...par } } })
      .then((res) => {
        setIncomeResults(res.data)
      })
      .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
  }

  const handleRedirect = (url) => {
    switch (url) {
      case "inspection-result":
        history.push(`${url}`)
        break;
      case "income-details":
        setIncomeModal(true)
        break;
      case "statistic":
        setStatisticModal(true)
        break;
      default:
        break;
    }
  }

  const goBack = () => {
    history.goBack()
  }

  const folders = [
    {
      name: trans("inspection_result"),
      id: "inspection-result"
    },
    {
      name: trans("income_details"),
      id: "income-details"
    },
    {
      name: trans("statistics"),
      id: "statistic"
    },
  ]

  const list = [
    {
      xs: 24,
      sm: 12,
      name: trans("primary_pti"),
      value: statisticData.initialCount,
      color: "#878181"
    },
    {
      xs: 24,
      sm: 12,
      name: trans("secondary_pti"),
      value: statisticData.secondaryCount,
      color: "#776bf9"
    },

    {
      xs: 24,
      md: 6,
      sm: 12,
      name: trans("total_inspection"),
      value: statisticData.totalCount,
      color: "#17a2b8"
    },
    {
      xs: 24,
      md: 6,
      sm: 12,
      name: trans("success"),
      value: statisticData.acceptedCount,
      color: "#28a745"
    },
    {
      xs: 24,
      md: 6,
      sm: 12,
      name: trans("fault"),
      value: statisticData.rejectedCount,
      color: "#ffc107"
    },
    {
      xs: 24,
      md: 6,
      sm: 12,
      name: trans("forbidden"),
      value: statisticData.forbiddenCount,
      color: "#dc3545"
    },
  ]

  const exportExcel = (arr) => {
    const newData = [arr]
    const workSheet = utils.json_to_sheet(newData)
    const workBook = utils.book_new()
    utils.book_append_sheet(workBook, workSheet, 'Dashboard')
    let buf = write(workBook, { bookType: 'xlsx', type: 'buffer' })
    write(workBook, { bookType: 'xlsx', type: 'binary' })
    writeFile(workBook, 'Dashboard.xlsx')
}


  const getMonthlyReps = (data) => {

    const par = {date: moment(data).format("YYYY.MM")};

    API.get(`/get-requests-handler`, { params: { url: `/Report/InspectionResults`, params: par} })
      .then((res) => {
        exportExcel(res.data)
      })
      .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
  }

  useEffect(() => {
    getInspectionResults()
    getIncomeResults()
  }, [])

  // const initialValuesObj = {
  //   dateRange: [moment('2022/01/01', dateFormat), moment('2022/05/01', dateFormat)],
  // }

  return (
    <div className="content-wrapper statistics-wrapper">
      {id === "general" ?
        <div className='statistics general '>
          <Row className='header' justify={"space-between"} >
            <Col>{trans("statistics")}</Col>
          </Row>
          <Row className='statistics-body' gutter={[16, 30]} >
            {hasPermissions("Permissions.Report.Income") && folders?.map((item, index) => {
              return (
                <Col key={index} xs={24} sm={12} md={6}>
                  <div onClick={() => handleRedirect(item.id)} className="statistics-folder">

                    <div className="icons">
                      <div>
                        <LineChartOutlined />
                      </div>
                      <div>
                        <EllipsisOutlined />
                      </div>
                    </div>
                    <div className="name">
                      <div>{item.name}</div>
                      <div>category</div>
                    </div>
                  </div>
                </Col>
              )
            })}
            {hasPermissions("Permissions.Report.InspectionResults") && <Col xs={24} sm={12} md={6}>
              <div className="statistics-folder reports">
                <div className="input-form">
                  <Form
                    form={repForm}
                    name="edit-form"
                    layout="vertical"
                    onFinish={getMonthlyReps}
                  >

                      <Form.Item
                        name={"dateRange"}
                      >
                      <DatePicker placeholder='აირჩიეთ თვე' picker="month" />
                      </Form.Item>
            
                    <Button
                      htmlType="submit"
                      type="primary"
                      icon={<ArrowRightOutlined />}
                      className="focus-white"
                    />
                  </Form>
                </div>
                <div className="name">
                  <div>ყოველთვიური რეპორტი</div>
                  <div>category</div>
                </div>
              </div>
            </Col>}
          </Row>
        </div>
        : id === "inspection-result" ?
          <div className='statistics general result'>
            <Row className='header' justify={"space-between"} >
              <Col>
                <div className="back-icon" onClick={() => goBack()}>
                  <ArrowLeftOutlined />
                </div>
                <span>
                  {trans("inspection_result")}
                </span>
              </Col>
              <Col>
                <div className="back-icon" onClick={() => setFilterOpen(prev => !prev)}>
                  <FilterOutlined />
                </div>
              </Col>
            </Row >
            <Row className={`${filterOpen ? "statistics-active-filter" : ""} statistics-filter`}>
              <StatisticFilter setData={setStatisticData} target={"results"} />
            </Row>
            <Row className='statistics-body' gutter={[16, 30]} >
              {list?.map((item, index) => {
                return (
                  <Col key={index} xs={item.xs} sm={item.sm} md={item?.md} >
                    <div style={{ backgroundColor: item.color }} className="statistics-folder">
                      <span>{item.value}</span>
                      <span>{item.name}</span>
                    </div>
                  </Col>
                )
              })}
            </Row>
          </div >
          : ""
      }
      <Modal
        className="income-details-modal"
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        title={trans("income_details")}
        visible={incomeModal}
        onCancel={() => setIncomeModal(false)}
        width={1000}
      >
        <Row justify={"space-between"} className="total-container">
          <Col xs={22} className="total-item">
            <h3 style={{ textAlign: "center" }}>
              <span>სულ: </span>{incomeResults}
            </h3>
          </Col>

          <Col xs={2} className="filter-item" >
            <div className="filter-icon" onClick={() => setFilterOpen(prev => !prev)}>
              <FilterOutlined />
            </div>
          </Col>
          <Col xs={22} className="total-item">
            <h3 style={{ textAlign: "center" }}>
              <span>{trans("card")}: </span>{incomeResults}
            </h3>
          </Col>
          <Col xs={22} className="total-item">
            <h3 style={{ textAlign: "center" }}>
              <span>{trans("cash")}: </span>{incomeResults}
            </h3>
          </Col>
        </Row>
        <Row className={`${filterOpen ? "statistics-active-filter" : ""} statistics-filter`}>
          <StatisticFilter setData={setIncomeResults} target={"income"} />
        </Row>
      </Modal>
      <Modal
        className=""
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        title={trans("statistics")}
        visible={statisticModal}
        onCancel={() => { setStatisticModal(false); setFilterOpen(false) }}
        width={1000}
      >
        {incomeResults}
      </Modal>
    </div >
  )
}

export default Statistics