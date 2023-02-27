import React, { useState, useEffect, useContext } from 'react'
import { Tabs, Col, Row, Table, Button, Tooltip, Space, Spin, Modal, Badge, message, notification } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, CaretRightOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import useTranslation from '../../components/translation/useTranslation';
import API from '../../utils/API';
import AddHardware from "../../components/modals/AddHardware"
import UpdateHardware from "../../components/modals/UpdateHardware"
import AddWorkHardware from "../../components/modals/AddWorkHardware"
import "./hardware.scss"
import WorkHistory from './WorkHistory';
import { UserContext } from '../../components/contexts/UserContext';


function Hardware() {
  const { TabPane } = Tabs;
  const { trans } = useTranslation();
  const { hasPermissions } = useContext(UserContext)
  
  const [loading, setLoading] = useState(false)
  const [tableTabInd, setTableTabInd] = useState([1])

  const [addIsOpen, setAddIsOpen] = useState(false)
  const [updateIsOpen, setUpdateIsOpen] = useState(false)
  const [selectedHardware, setSelectedHardware] = useState(0)
  // const [selectedWork, setSelectedWork] = useState('');

  const [hardwares, setHardwares] = useState([])
  const [works, setWorks] = useState([])
  const [tableArr, setTableArr] = useState([])

  const [target, setTarget] = useState("")

  const [delModalText, setDelModalText] = useState("")
  const [delModalOpen, setDelModalOpen] = useState(false)
  const [delLoading, setDelLoading] = useState(false);
  const [selectedWorkId, setSelectedWorkId] = useState("")

  const [workModalOpen, setWorkModalOpen] = useState(false)

  const [workDataReload, setWorkDataReload] = useState(false)

  const addModalOpen = () => {
    // setTarget("add")
    setAddIsOpen(true)
  }

  const editModalOpen = (id) => {
    setUpdateIsOpen(true)
    setSelectedHardware(id)
  }

  const getData = () => {
    setWorkDataReload(!workDataReload)
    setTableArr([])
    setLoading(true)
    API.get(`/get-requests-handler`, { params: { url: `/Machine`, params: {} } })
      .then((res) => {
        if (res.data.name === "Error") {
          message.error(res.data.message);
          setLoading(false)
        } else {
          setLoading(false)
          setHardwares(res.data.data)
        }
      })
      .catch((err) => {
        setLoading(false)
        notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"});
      })
    API.get(`/get-requests-handler`, { params: { url: `/Machine/works`, params: {} } })
      .then((res) => {
        if (res.data.name === "Error") {
          message.error(res.data.message);
          setLoading(false)
        } else {
          setWorks(res.data)
        }
      })
      .catch((err) => {
        notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"});
      })
    }

  const handleDelete = () => {
    setDelLoading(true);
    if (target === "machine") {
      API.delete(`/delete-requests-handler`, { params: { url: `/Machine/${selectedHardware}`, params: {} } })
        .then((res) => {
          setDelModalOpen(false);
          setDelLoading(false);
          setSelectedHardware(null)
          getData()
        })
        .catch((err) => {
          setDelLoading(false);
          notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"})
        })
    } else {
      API.delete(`/delete-requests-handler`, { params: { url: `/Machine/${selectedHardware}/works/${selectedWorkId}`, params: {} } })
        .then((res) => {
          setDelModalOpen(false);
          setDelLoading(false);
          setSelectedHardware(null);
          setSelectedWorkId(null)
          getData()
        })
        .catch((err) => {
          setDelLoading(false);
          notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"})
        })
    }
  }


  const handleDelModal = (id, item, parentId) => {
    setTarget(item)
    if (item === "machine") {
      setDelModalOpen(true)
      setSelectedHardware(id)
      setDelModalText("ნამდვილად გსურთ დანადგარის წაშლა?")
    } else {
      setDelModalOpen(true)
      setSelectedHardware(parentId)
      setSelectedWorkId(id)
      setDelModalText("ნამდვილად გსურთ სამუშაოს წაშლა?")
    }
  }

  const handleRefresh = (workId, machineId) => {
    API.post(`/post-requests-handler`, { url: `/Machine/${machineId}/works/${workId}/done`, params: {}, data: {} })
      .then(res => {
        message.success(res?.data)
      })
      .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
  }


  const handleCancel = () => {
    setDelModalOpen(false);
  };

  const transformTableData = () => {
    hardwares.forEach(item => {
      setTableArr((prev) => [
        {
          name: item.name,
          serialNumber: item.serialNumber,
          city: item.city,
          branch: item.branch,
          line: item.inspectionLine,
          activity: item.activity,
          key: item.id,
          action: item.id
        },
        ...prev,
      ])

    }
    );
  }

  const updateWork = (work) => {
    console.log(work);
  }

  useEffect(() => {
    transformTableData()
  }, [hardwares])

  useEffect(() => {
    getData()
  }, [])

  const columns = [
    {
      title: trans('hardware'),
      key: "organization-phone",
      render: (hardwares) => (
        <div >
          {hardwares.name}
          <br />
          {hardwares.serialNumber}
          <br />
          {hardwares.city}
          <br />
          {hardwares.filial}
          <br />
          {hardwares.line}
          <br />
          {hardwares.activity}
          <br />
          {hardwares.date}
        </div>
      ),
      responsive: ["xs"]
    },
    {
      title: trans('name'),
      dataIndex: 'name',
      key: 'name',
      responsive: ["sm"]
    },
    {
      title: trans('serial_num'),
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      responsive: ["sm"]
    },
    {
      title: trans('city'),
      dataIndex: 'city',
      key: 'city',
      responsive: ["sm"]
    },
    {
      title: trans("branch"),
      dataIndex: 'branch',
      key: 'branch',
      responsive: ["sm"]
    },
    {
      title: trans('line'),
      dataIndex: 'line',
      key: 'line',
      responsive: ["sm"]
    },
    {
      title: trans("status"),
      key: 'maintenanceOverdue',
      render: (item) => (
        <span>
          <Badge
          status={!works?.filter(work => work.machineId === item.key)?.filter(ins => ins.maintenanceOverdue === false).length > 0 ? "success" : "error"} />
          {!works?.includes(item.key) ? "დასაშვები" : "საჭიროებს განახლებას"}
        </span>
      ),
    },
    {
      title: trans('action'),
      dataIndex: 'action',
      key: 'action',
      render: id =>
        <div className="actions-container">
          <Tooltip title="რედაქტირება" placement="bottom" color={"blue"} >
            <Button onClick={() => editModalOpen(id)} shape="circle" icon={<EditOutlined />} size={"large"} />
          </Tooltip>
          <Tooltip title="წაშლა" placement="bottom" color={"blue"} >
            <Button onClick={() => handleDelModal(id, "machine")} shape="circle" icon={<DeleteOutlined />} size={"large"} />
          </Tooltip>

        </div>,
      responsive: ["sm"]
    },
  ]



  // const handleDelWork = (id, parentId) => {
  //   setSelectedWorkId(id)
  //   setSelectedHardware(parentId)
  // }

  const expandedRowRender = (parent) => {
    const childColumns = [
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
      { title: 'სახელი', dataIndex: 'work', key: 'work', responsive: ["sm"] },
      { title: 'ფილიალი', dataIndex: 'branch', key: 'branch', responsive: ["sm"] },
      { title: 'ქალაქი', dataIndex: 'city', key: 'city', responsive: ["sm"] },
      { title: 'ხაზი', dataIndex: 'inspectionLine', key: 'inspectionLine', responsive: ["sm"] },
      { title: 'დანადგარი', dataIndex: 'machineName', key: 'machineName', responsive: ["sm"] },
      { title: 'პერიოდი', dataIndex: 'maintenancePeriod', key: 'maintenancePeriod', responsive: ["sm"] },
      { title: 'ბოლო ', dataIndex: 'lastMaintenanceDate', key: 'lastMaintenanceDate', responsive: ["sm"] },
      { title: 'შემდეგი ', dataIndex: 'nextMaintenanceDate', key: 'nextMaintenanceDate', responsive: ["sm"] },
      {
        title: 'სტატუსი', key: 'maintenanceOverdue', render: (status) => (
          <span>

            <Badge status={status.maintenanceOverdue ? "success" : "error"} />
            {/* {status.maintenanceOverdue ? "დასაშვები" : "ვადაგადაცილებული"} */}
          </span>
        ),
        responsive: ["sm"]
      },
      {
        title: 'აქტივობა',
        key: 'operation',
        render: (item) => (
          <div className="actions-container">
            <Tooltip title="რედაქტირება" placement="bottom" color={"blue"} >
              <Button onClick={() => updateWork(item)} shape="circle" icon={<EditOutlined />} size={"large"} />
            </Tooltip>
            <Tooltip title="წაშლა" placement="bottom" color={"blue"} >
              <Button shape="circle" onClick={() => handleDelModal(item.action, "", item.machineId)} icon={<DeleteOutlined />} size={"large"} />
            </Tooltip>
            {!item.maintenanceOverdue ?
              <Tooltip title="განახლება" placement="bottom" color={"blue"} >
                <Button shape="circle" onClick={() => handleRefresh(item.action, item.machineId)} icon={<CaretRightOutlined />} size={"large"} />
              </Tooltip>
              : ""}
          </div>
        ),
      },
    ];
    const filterData = works.filter((item) => parent.key === item.machineId)

    const transformed = filterData?.map((work, index) => ({
      branch: work?.branch,
      city: work?.city,
      inspectionLine: work?.inspectionLine,
      machineName: work?.machineName,
      lastMaintenanceDate: work?.lastMaintenanceDate,
      machineId: work.machineId,
      maintenanceOverdue: work?.maintenanceOverdue,
      maintenancePeriod: work?.maintenancePeriod,
      nextMaintenanceDate: work?.nextMaintenanceDate,
      work: work?.work,
      key: index,
      action: work.workId
    }))

    return <Table columns={childColumns} dataSource={transformed} pagination={false} />;
  };

  return (
    <div className='content-wrapper hardware-wrapper'>
      <div className="hardware-table">
        <div className="table-header">
          <Row justify={"space-between"}>
            <Col xs={24} sm={12}>
              <h3>{trans('hardware')}</h3>
            </Col>
            <Col xs={24} sm={12}>
              <Row gutter={[0, 10]} justify={"end"} className={"action-row"}>
                <Col xs={24} sm={12}>
                 {hasPermissions("Permissions.Booking.Add") && <Button
                    block
                    type={"primary"}
                    onClick={addModalOpen}
                    icon={<PlusOutlined />}
                    className="focus-white"
                  >
                    {trans("add_hardware")}
                  </Button>}
                </Col>
                <Col xs={24} sm={12} lg={12} xl={10} xxl={8}>
                  {hasPermissions("Permissions.Booking.Add") && <Button
                    block
                    type={"primary"}
                    onClick={() => setWorkModalOpen(true)}
                    icon={<PlusOutlined />}
                    className="focus-white"

                  >
                    {trans("add_work")}
                  </Button>}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Tabs className='hardware-table-tabs' type="card" defaultActiveKey="1" onChange={(key) => setTableTabInd(key)} >
          <TabPane tab="დანადგარები" key="1" >
            <Table
              className="components-table-demo-nested"
              columns={columns}
              expandable={{ expandedRowRender: (record) => expandedRowRender(record) }}
              dataSource={tableArr}
            />
          </TabPane>
          <TabPane tab="ჩატარებული სამუშაოები" key="2">
            <WorkHistory envoke={tableTabInd === "2"} refresh={workDataReload} />
          </TabPane>

        </Tabs>
      </div>
      <Modal
        title="დოკუმენტის წაშლა"
        visible={delModalOpen}
        onOk={handleDelete}
        confirmLoading={delLoading}
        onCancel={handleCancel}
        okText={trans("yes")}
        cancelText={trans("no")}
      >
        <p>{delModalText}</p>
      </Modal>
      <AddHardware
        modalIsOpen={addIsOpen}
        setModalIsOpen={setAddIsOpen}
        refresh={getData} />
      <UpdateHardware
        modalIsOpen={updateIsOpen}
        setModalIsOpen={setUpdateIsOpen}
        refresh={getData}
        defaultValue={hardwares?.find(item => item.id === selectedHardware)}
      />
      <AddWorkHardware
        modalIsOpen={workModalOpen}
        setModalIsOpen={setWorkModalOpen}
        refresh={getData} />
      {/* <UpdateWorkHardware
        modalIsOpen={workModalOpen}
        setModalIsOpen={setWorkModalOpen}
        workId={selectedWork}
        hardwareId={selectedHardware}
        refresh={getData} /> */}
      {loading &&
        <Space size="middle" className='loading'>
          <Spin size="large" />
        </Space>
      }
    </div>
  )
}

export default Hardware


