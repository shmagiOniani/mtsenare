import React, { useState, useEffect } from 'react'
import { Table, Space, Spin, message, notification } from 'antd';
import 'antd/dist/antd.css';
import useTranslation from '../../components/translation/useTranslation';
import API from '../../utils/API';
import "./hardware.scss"



function WorkHistory({envoke, refresh}) {
  const { trans } = useTranslation();
  const [loading, setLoading] = useState(false)

  const [works, setWorks] = useState([])
  const [tableArr, setTableArr] = useState([])
  
  const getData = () => {
    setTableArr([])
    setLoading(true)
    API.get(`/get-requests-handler`, { params: { url: `/Machine/works`, params: {} } })
    .then((res) => {
      if(res.data.name === "Error"){
        message.error(res.data.message);
        setLoading(false)

      }else {
        transformData(res.data)
        setWorks(res.data)
        setLoading(false)
      }
    })
    .catch((err) => {
      notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"});
    })
  }

  useEffect(() => {
    if(envoke){
      getData()
      
    }
  }, [envoke])

  useEffect(()=> {
    getData()
  },[refresh])

  useEffect(()=> {
    getData()
  },[])

  const transformData = (data) => {
    // მონაცემები გასაფილტრია maintenancePeriod მიხედვით 
    const filterData = data.filter((item)=> item.maintenancePeriod === -1)
    const transformed = filterData?.map((work, index) => ({
      work: work?.work,
      branch: work?.branch,
      city: work?.city,
      inspectionLine: work?.inspectionLine,
      machineName: work?.machineName,
      lastMaintenanceDate: work?.lastMaintenanceDate,
      machineId: work.machineId,
      maintenanceOverdue: work?.maintenanceOverdue,
      // maintenancePeriod: work?.maintenancePeriod,
      nextMaintenanceDate: work?.nextMaintenanceDate,
      key: index,
    }))
    setTableArr(transformed)
  }

  const columns = [
    {
      title: trans("work"),
      key: "organization-phone",
      render: (hardwares) => (
        <div >
          {hardwares.work}
          <br />
          {hardwares.maintenancePeriod}
          <br />
          {hardwares.lastMaintenanceDate}
          <br />
          {hardwares.nextMaintenanceDate}
        </div>
      ),
      responsive: ["xs"]
    },
    { title: 'სახელი', dataIndex: 'work', key: 'work' , responsive: ["sm"]},
    { title: 'ფილიალი', dataIndex: 'branch', key: 'branch' , responsive: ["sm"]},
    { title: 'ქალაქი', dataIndex: 'city', key: 'city' , responsive: ["sm"]},
    { title: 'ხაზი', dataIndex: 'inspectionLine', key: 'inspectionLine' , responsive: ["sm"]},
    { title: 'დანადგარი', dataIndex: 'machineName', key: 'machineName' , responsive: ["sm"]},
    // { title: 'პერიოდი', dataIndex: 'maintenancePeriod', key: 'maintenancePeriod' , responsive: ["sm"]},
    { title: 'ბოლო ', dataIndex: 'lastMaintenanceDate', key: 'lastMaintenanceDate' , responsive: ["sm"]},
    { title: 'შემდეგი ', dataIndex: 'nextMaintenanceDate', key: 'nextMaintenanceDate' , responsive: ["sm"]},
  ];

  return (
        <>
      <div className="work-history-table">
        <Table
          className="components-table-demo-nested"
          columns={columns}
          dataSource={tableArr}
          pagination={true}
          // expandable={{ expandedRowRender: (record) => expandedRowRender(record) }}
        />
      </div>
      {loading &&
        <Space size="middle" className='loading'>
          <Spin size="large" />
        </Space>
      }
      </>
  )
}

export default WorkHistory

