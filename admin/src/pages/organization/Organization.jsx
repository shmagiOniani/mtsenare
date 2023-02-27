import React, { useState, useEffect, useContext } from 'react'
import { Table, Button, Tooltip, Modal, Space, Spin, Input, Row, Col, Pagination, message, notification } from 'antd';
import { Link } from "react-router-dom";
import { EyeOutlined, EditOutlined, DeleteOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import API from "../../utils/API"
import useTranslation from '../../components/translation/useTranslation';
import OrganizationManipulation from '../../components/modals/OrganizationManipulation';
import AddOrganization from '../../components/modals/AddOrganization';
import "./organization.scss"
import { UserContext } from '../../components/contexts/UserContext';



function Organiazation() {
  const { trans, currentLanguage } = useTranslation();
  const { Search } = Input;
  const { hasPermissions }= useContext(UserContext)

  const [delModalOpen, setDelModalOpen] = useState(false)
  const [delLoading, setDelLoading] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false)
  const [editIsOpen, setEditIsOpen] = useState(false)
  const [tableData, setTableData] = useState([])
  const [selectedId, setSelectedId] = useState("")
  const [selectedName, setSelectedName] = useState("")
  const [loading, setLoading] = useState(false)

  // const 
  const getData = (page) => {
    setLoading(true)
    API.get(`/get-requests-handler`, { params: { url: `/Company`, params: {} } })
      .then(
        (res) => {
          if (res.data.name === "Error") {
            message.error(res.data.message);
          } else {
            transformData(res.data)
            setLoading(false)
          }
        }
      )
      .catch((err) => {
        setLoading(false);
        notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"});
      })
  }

  const handleDelete = () => {
    setDelLoading(true);
    API.delete(`/delete-requests-handler`, { params: { url: `/Company/${selectedId}`, params: {} } })
      .then((res) => {
        setDelModalOpen(false);
        setDelLoading(false);
      })
      .catch((err) => {
        setDelModalOpen(false);
        setDelLoading(false);
        notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"});
      })
  }

  const handleDelModal = (id) => {
    setDelModalOpen(true)
    setSelectedId(id)
  }

  const handleCancel = () => {
    setDelModalOpen(false);
  };

  const transformData = (data) => {
    setTableData([])
    data?.map((item, index) =>
      setTableData(prev => [{
        key: item.id,
        id: item.id,
        name: item.name,
        responsiblePerson: item.responsiblePerson,
        centerId: item.centerId,
        address: item.address,
        identificationNumber: item.identificationNumber,
        accountNumber: item.accountNumber,
        action: item.id
      }, ...prev])
    )
  }

  const columns = [
    {
      title: trans('organizations'),
      key: "organization-phone",
      render: (organization) => (
        <div className='user-column'>
          {organization.name}
          <br />
          {organization.responsiblePerson}
          <br />
          {organization.centerId}
          <br />
          {organization.accountNumber}
          <br />
          {organization.address}
          <br />
          {organization.identificationNumber}
        </div>
      ),
      responsive: ["xs"]
    },
    {
      title: trans('action'),
      key: "operation-phone",
      render: (organization) => (
        <div className="operations-column">

          <div className="actions-container">
            <Link to={`/organization/${organization.action}`} className="status stop">
              <Button type="primary" shape="circle" icon={<EyeOutlined />} size={"large"} />
            </Link>
            <Button onClick={() => setEditIsOpen(true)} type="primary" shape="circle" icon={<EditOutlined />} size={"large"} />
          </div>

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
      title: trans("responsible_person"),
      dataIndex: 'responsiblePerson',
      key: 'responsiblePerson',
      responsive: ["sm"]
    },
    {
      title: trans("identification_num"),
      dataIndex: 'centerId',
      key: 'centerId',
      responsive: ["sm"]
    },
    {
      title: trans("account_number"),
      dataIndex: 'accountNumber',
      key: 'accountNumber',
      responsive: ["sm"]
    },
    {
      title: trans('address'),
      dataIndex: 'address',
      key: 'address',
      responsive: ["sm"]
    },
    {
      title: trans('identification_num'),
      dataIndex: 'identificationNumber',
      key: 'identificationNumber',
      responsive: ["sm"]
    },
    {
      title: trans('action'),
      dataIndex: 'action',
      key: 'action',
      render: id =>
        <div className="actions-container">
          <Tooltip title="დეტალურად ნახვა" placement="bottom" color={"blue"} >
            <Link to={`/organization/${id}`} >
              <Button shape="circle" icon={<EyeOutlined />} size={"large"} />
            </Link>
          </Tooltip>
          <Tooltip title="რედაქტირება" placement="bottom" color={"blue"} >
            {hasPermissions("Permissions.Company.Edit") && <Button onClick={() => handleModal(id)} shape="circle" icon={<EditOutlined />} size={"large"} />}
          </Tooltip>
          <Tooltip title="წაშლა" placement="bottom" color={"blue"} >
            {hasPermissions("Permissions.Company.Remove") && <Button onClick={() => handleDelModal(id)} shape="circle" icon={<DeleteOutlined />} size={"large"} />}
          </Tooltip>
        </div>,
      responsive: ["sm"]
    },
  ]

  const handleModal = (id) => {
    setSelectedId(id);
    setEditIsOpen(true);
  }

  useEffect(() => {
    if (!editIsOpen) {
      getData()
    }
  }, [editIsOpen])

  useEffect(() => {
    if (!addModalIsOpen) {
      getData()
    }
  }, [addModalIsOpen])

  useEffect(() => {
    if (delModalOpen) {
      const selectedItem = tableData.find((item, index) => item.key === selectedId)
      setSelectedName(selectedItem.name)
    } else {
      getData()
    }
  }, [delModalOpen])

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='content-wrapper organization-wrapper'>
      <div className="organizations-table">
        <Row className="table-header">
          <Col>
            <h3>{trans('organizations')}</h3>
          </Col>
          <Col className='filter-container'>
            <Row className='filter-wrapper'>
              <Col>
                <Search placeholder={trans('search')} allowClear={true} onSearch={(text) => console.log(text)} style={{ width: 200 }} />
              </Col>
              <Col>
                {hasPermissions("Permissions.Company.Add") && <Button className='add-org-btn focus-white' type="primary" icon={<UsergroupAddOutlined />} onClick={() => setAddModalIsOpen(true)}>
                  <span>{trans('add_organization')}</span>
                </Button>}
              </Col>
            </Row>
          </Col>
        </Row>
        <Table columns={columns} dataSource={tableData} pagination={false} />
      </div>
      <OrganizationManipulation
        modalIsOpen={editIsOpen}
        setModalIsOpen={setEditIsOpen}
        organizationId={selectedId}
      />
      <AddOrganization
        modalIsOpen={addModalIsOpen}
        setModalIsOpen={setAddModalIsOpen}
        organizationId={selectedId}
        refresh={getData}
      />
      <Modal
        title={trans("delete_organization")}
        visible={delModalOpen}
        onOk={handleDelete}
        confirmLoading={delLoading}
        onCancel={handleCancel}
        okText={trans("yes")}
        cancelText={trans("no")}
      >
        {currentLanguage === "en" ?
          <p>{`Do you really whant to delete "${selectedName}" organization?`}</p>
          :
          <p>{`ნამდვილად გსურთ "${selectedName}" ორგანიზაციის წაშლა?`}</p>
        }
      </Modal>
      {loading &&
        <Space size="middle" className='loading'>
          <Spin size="large" />
        </Space>
      }
    </div>
  )
}

export default Organiazation































