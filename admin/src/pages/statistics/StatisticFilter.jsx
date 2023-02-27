import React, { useEffect, useState } from 'react'
import { Row, Col, Form, DatePicker, Button, Input, Select, message, notification } from 'antd'
import moment from 'moment';
import API from '../../utils/API';
import useTranslation from '../../components/translation/useTranslation'
import "./Statistics.scss"


function StatisticFilter({ setData, target }) {
  const { trans } = useTranslation()
  const { Option } = Select;
  const [filterForm] = Form.useForm();
  const [filterSaveForm] = Form.useForm();
  const [filterSelectForm] = Form.useForm();

  const dayFormat = 'YYYY/MM/DD';
  let today = new Date();
  let MD = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 1}`;

  const [filterArr, setFilterArr] = useState([])
  const [selectedFilter, setSelectedFilter] = useState({})

  const [refresh, setRefresh] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)

  const handleFilter = (data) => {
    setButtonLoading(true)
    const fromInst = data?.dateFrom?.format().slice(0, 10)
    const toInst = data?.dateTo?.format().slice(0, 10)
    const par = {     
      fromDate: fromInst,
      toDate: toInst
    }
    if (target === "results") {
      API.get(`/get-requests-handler`, { params: { url: `/Report/InspectionResults`, params: { ...par } } })
        .then(
          (res) => {
            if (res.data.name === "Error") {
              message.error(res.data.message);
              setButtonLoading(false)
            } else {
              setData(res.data)
              setButtonLoading(false)
            }
          }
        )
        .catch((err) => {
          notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"})
        })
    } else {
      API.get(`/get-requests-handler`, { params: { url: `/Report/Income`, params: { ...par } } })
        .then(
          (res) => {
            if (res.data.name === "Error") {
              setData(0)
              setButtonLoading(false)
            } else {
              setData(res.data)
              setButtonLoading(false)
            }
          }
        )
        .catch((err) => {
          setButtonLoading(false);
          setData(0);
          notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"});
        })
    }
  }

  const handleFilterSave = (data) => {
    const dates = filterForm.getFieldsValue();
    const fromInst = dates?.dateFrom?.format()
    const toInst = dates?.dateTo?.format()

    const filterInstance = {
      filterName: data.filterName,
      from: fromInst,
      to: toInst
    }

    const filters = localStorage.getItem("statisticFilter")

    if (filters === null) {
      localStorage.setItem("statisticFilter", [JSON.stringify(filterInstance)])
      setFilterArr([JSON.parse(filters)])
      setRefresh(!refresh)
    } else if (Array.isArray(JSON.parse(filters))) {
      const some = JSON.parse(filters)
      const check = some.find((item) => item.filterName === filterInstance.filterName)
      if (!check) {
        setFilterArr(some)
        some.push(filterInstance);
        localStorage.setItem("statisticFilter", JSON.stringify(some))
      }
    } else {
      if (JSON.parse(filters).filterName === filterInstance.filterName) {
        console.log("equals");
      } else {
        const allFilters = [JSON.parse(filters), filterInstance]
        setFilterArr(allFilters)
        localStorage.setItem("statisticFilter", JSON.stringify(allFilters))
      }
    }
    setRefresh(!refresh)
  }

  const handleFilterSelect = (data) => {
    const filters = localStorage.getItem("statisticFilter")
    if (Array.isArray(JSON.parse(filters))) {

      const findObj = JSON.parse(filters).find(item => item.filterName === data)
      setSelectedFilter(findObj)
    } else {
      if (JSON.parse(filters).filterName === data) {
        setSelectedFilter(JSON.parse(filters))

      }
    }
  }

  const handleFilterDelete = (data) => {
    const filters = localStorage.getItem("statisticFilter")
    const filter = JSON.parse(filters).filter(item => item.filterName !== data.filterName)
    localStorage.removeItem("statisticFilter")
    localStorage.setItem("statisticFilter", JSON.stringify(filter))
    setFilterArr(filter)
    setRefresh(!refresh)
  }

  useEffect(() => {
    filterForm.setFieldsValue({
      dateFrom: moment(selectedFilter.from),
      dateTo: moment(selectedFilter.to),
    })
  }, [selectedFilter])

  useEffect(() => {
    const filters = localStorage.getItem("statisticFilter")
    setFilterArr(JSON.parse(filters))
  }, [])

  useEffect(() => { }, [refresh])

  return (
    <Col xs={24}>
      <Row gutter={[16, 30]} className={"filter-container"}>
        <Col xs={24} sm={12} className="filter-save-form">
          {/* filter form to save filter */}
          <Form
            form={filterSaveForm}
            name="filter-save-form"
            layout="vertical"
            onFinish={handleFilterSave}
            style={{ width: "100%", justifyContent: "flex-start" }}
          >
            <Row gutter={[16, 30]}>
              <Col>
                <Button htmlType="submit" type="primary">{"ფილტრის შენახვა"}</Button>
              </Col>
              <Col>
                <Form.Item
                  name={"filterName"}
                  rules={[{
                    required: true,
                    message: "მიუთითეთ სახელი"
                  }]}>
                  <Input placeholder={"ფილტრის სახელი"} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col xs={24} sm={12}>
          {/* filter form to select filter */}
          <Form
            form={filterSelectForm}
            name="filter-select-form"
            layout="vertical"
            onFinish={handleFilterDelete}
            style={{ width: "100%" }}
          >
            <Row gutter={[16, 30]} justify={"end"}>
              <Col>
                <Form.Item
                  name={"filterName"}
                  rules={[{
                    required: false,
                  }]}>
                  <Select onChange={handleFilterSelect} placeholder='აირჩიეთ ფილტრი' style={{ minWidth: "200px" }} >
                    {Array.isArray(filterArr) ? filterArr?.map((filter, index) => {
                      return (
                        <Option key={index} value={filter?.filterName}>
                          {filter?.filterName}
                        </Option>
                      )
                    }) : [filterArr]?.map((filter, index) => {
                      return (
                        <Option key={index} value={filter?.filterName}>
                          {filter?.filterName}
                        </Option>
                      )
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col>
                <Button htmlType="submit" type="default">{trans("delete")}</Button>
              </Col>
            </Row>

          </Form>
        </Col>
      </Row>
      <Form
        form={filterForm}
        name="filter-form"
        layout="vertical"
        onFinish={handleFilter}
      >
        <Row gutter={[16, 30]} justify={"space-between"} className={"filter-container"}>
          <Col xs={24} sm={17}  >
            <Row gutter={[16, 30]}>
              <Col>
                <Form.Item
                  name={"dateFrom"}
                  label={"თარიღიდან"}
                  rules={[{
                    required: false,
                  }]}>
                  <DatePicker className="date-picker-button" format={dayFormat} defaultValue={moment(MD, dayFormat)} placeholder={trans("date")} />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name={"dateTo"}
                  label={"თარიღამდე"}
                  rules={[{
                    required: false,
                  }]}>
                  <DatePicker className="date-picker-button" format={dayFormat} defaultValue={moment(MD, dayFormat)} placeholder={trans("date")} />
                </Form.Item>
              </Col>
            </Row>

          </Col>
          <Col xs={24} sm={7} className={"filter-action-buttons"}>
            <Button
              htmlType="submit"
              type="primary"
              loading={buttonLoading}
            >{trans("submit")}</Button>
            <Button
              onClick={() => filterForm.resetFields()}
              type="default"
            >{trans("remove")}</Button>
          </Col>
        </Row>
      </Form>
    </Col>
  )
}

export default StatisticFilter