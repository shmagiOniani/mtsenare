import React, { useState, useEffect } from 'react'
import { Table, Space, Spin , Row, Col, message, notification} from 'antd';
import useTranslation from '../../components/translation/useTranslation';
import API from '../../utils/API';
import "./Brakes.scss"

function Brakes() {
  const { trans } = useTranslation();
  const [loading, setLoading] = useState(false)
  const [tableArr, setTableArr] = useState([])

  const columns = [
    {
      title: trans('brakes'),
      key: "organization-phone",
      render: (brakes) => (
        <div >
          {trans("registration_number")}:  {brakes.regNumber}
          <br />
          {trans("name")}:   {brakes.name}
          <br />
          {trans("brake_type")}:   {brakes.brakeType}
          <br />
          {/* {trans("identification_num")}: {brakes.identifier}
          <br /> */}
          {trans("capacity")}{trans("left")}: {brakes.capacityLeft}
          <br />
          {trans("capacity")}{trans("right")}: {brakes.capacityRight}
          <br />
          {trans("weight")}{trans("left")}: {brakes.weightLeft}
          <br />
          {trans("weight")}{trans("right")}: {brakes.weightRight}
          <br />
          {trans("date")}: {brakes.date}
        </div>
      ),
      responsive: ["xs"]
    },
    {
      title: trans('serial_num'),
      dataIndex: 'regNumber',
      key: 'regNumber',
      responsive: ["sm"]
    },
    {
      title: trans('brake_type'),
      dataIndex: 'brakeType',
      key: 'brakeType',
      responsive: ["sm"]
    },
    // {
    //   title: trans('identification_num'),
    //   dataIndex: 'identifier',
    //   key: 'identifier',
    //   responsive: ["sm"]
    // },
    {
      title: `${trans("capacity")} ${trans("left")}`,
      dataIndex: 'capacityLeft',
      key: 'capacityLeft',
      responsive: ["sm"]
    },
    {
      title: `${trans("capacity")} ${trans("right")}`,
      dataIndex: 'capacityRight',
      key: 'capacityRight',
      responsive: ["sm"]
    },
    {
      title: `${trans("weight")} ${trans("left")}`,
      dataIndex: 'weightLeft',
      key: 'weightLeft',
      responsive: ["sm"]
    },
    {
      title: `${trans("weight")} ${trans("right")}`,
      dataIndex: 'weightRight',
      key: 'weightRight',
      responsive: ["sm"]
    },
    {
      title: trans('name'),
      dataIndex: 'name',
      key: 'name',
      responsive: ["sm"]
    },
    {
      title: trans('date'),
      dataIndex: 'date',
      key: 'date',
      render: (item)=> (
        <div >{`${item?.slice(0, 10)}  ${item?.slice(11, 16)}`}</div>
      ),
      responsive: ["sm"]
    },
  ]

  const getData = () => {
    setLoading(true)
    API.get(`/get-requests-handler`, { params: { url: `/Brake`, params: { Page: 1, Count: 20 } } })
      .then((res) => {
        transformTableData(res.data.data)
        setLoading(false)
      })
      .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
      .finally(()=>  setLoading(false))
  }

  const transformTableData = (data) => {
    setTableArr([])
    data.forEach((item, ind) => {
      setTableArr((prev) => [
        {
          key: ind,
          regNumber: item.plateNumber,
          brakeType: item.brakeType,
          // identifier: item.identifier,
          capacityLeft: item.leftAxlePower,
          capacityRight: item.rightAxlePower,
          weightLeft: item.leftAxleWeight,
          weightRight: item.rightAxleWeight,
          name: item.vendor,
          date: item.timestamp,
        },
        ...prev,
      ])
    }
    );
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='content-wrapper brakes-wrapper'>
      <div className="table-wrapper brakes-table">
      <Row className="table-header">
          <Col>
            <h3>{trans('brakes')}</h3>
          </Col>
        </Row>
        <Table
          className="components-table-demo-nested"
          columns={columns}
          dataSource={tableArr}
        />
      </div>
      {loading &&
        <Space size="middle" className='loading'>
          <Spin size="large" />
        </Space>
      }
    </div>
  )
}

export default Brakes