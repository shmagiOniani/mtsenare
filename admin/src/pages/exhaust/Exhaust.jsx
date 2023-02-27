import React, { useState, useEffect } from 'react'
import { Table, Space, Spin, Button, Tooltip, Row, Col, message, notification } from 'antd';
import { LineChartOutlined } from "@ant-design/icons"
import useTranslation from '../../components/translation/useTranslation';
import API from '../../utils/API';
import ExaustDetails from './ExaustDetails';

const instance = [
  {
    id: "id",
    regNumber: "regNumber",
    fuelType: "fuelType",
    name: "name",
    date: "date",
  }
]

function Exhaust() {
  const { trans } = useTranslation();
  const [loading, setLoading] = useState(false)
  const [tableArr, setTableArr] = useState([])
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(1)

  const columns = [
    {
      title: trans('exhaust'),
      key: "organization-phone",
      render: (exhaust) => (
        <div >
          {trans("registration_number")}:  {exhaust.regNumber}
          <br />
          {trans("name")}:   {exhaust.name}
          <br />
          {trans("fuel_type")}:   {exhaust.fuelType}
          <br />
          {trans("date")}: {exhaust.date}
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
      title: trans('fuel_type'),
      dataIndex: 'fuelType',
      key: 'fuelType',
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
      render: (item) => (
        <div >{`${item?.slice(0, 10)}  ${item?.slice(11, 16)}`}</div>
      ),
      responsive: ["sm"]
    },
    {
      title: "",
      key: 'actions',
      render: (item) => (
        <div className="actions-container">
          <Tooltip title="ჩვენება" placement="bottom" color={"blue"} >
            <Button onClick={() => handleDetailsModal(item.actions)} shape="circle" icon={<LineChartOutlined />} size={"large"} />
          </Tooltip>
        </div>
      ),
      responsive: ["sm"],
    },
  ]

  const handleDetailsModal = (id) => {
    setSelectedId(id)
    setDetailsModalOpen(true)
  }

  const getData = () => {
    setLoading(true)
    API.get(`/get-requests-handler`, { params: { url: `/Exhaust`, params: {} } })
      .then((res) => {
        if(res.data.name === "Error"){
          message.error(res.data.message);
        }else {
          setLoading(false)
          transformTableData(res.data.data)
        }
      })
      .catch((err) => {
        setLoading(false)
        transformTableData(instance)
        notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"});
      })
  }

  const transformTableData = (data) => {
    setTableArr([])
    data.forEach(item => {
      setTableArr((prev) => [
        {
          key: item.applicationId,
          regNumber: item.plateNumber,
          fuelType: item.exhaustType,
          name: item.vendor,
          date: item.timestamp,
          actions: item.applicationId
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

    <div className='content-wrapper exhaust-wrapper'>
      <div className="exhaust-table">
        <Row className="table-header">
          <Col>
            <h3>{trans('exhaust')}</h3>
          </Col>
        </Row>
        <Table columns={columns} dataSource={tableArr} pagination={true} />
        <div className="pagination-wrapper">
        </div>
      </div>
      <ExaustDetails selectedId={selectedId} detailsModalOpen={detailsModalOpen} setDetailsModalOpen={setDetailsModalOpen} />
      {loading && <Space size="middle" className='loading'> <Spin size="large" /> </Space>}
    </div>
  )
}

export default Exhaust