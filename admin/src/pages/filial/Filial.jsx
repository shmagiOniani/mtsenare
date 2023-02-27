import React, { useState, useEffect, useContext } from 'react'
import { Button, Row, Col, Card, Modal, Space, Spin, message, notification } from 'antd'
import { DeleteOutlined, EditOutlined, EllipsisOutlined, UsergroupAddOutlined } from "@ant-design/icons"
import API from "../../utils/API"
import FilialRegistration from "../../components/modals/FilialRegistration"
import FilialEdit from "../../components/modals/FilialEdit"
import useTranslation from '../../components/translation/useTranslation';
import { UserContext } from '../../components/contexts/UserContext'
import "./filial.scss"

// const logo = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";
const { Meta } = Card

function Filial() {
  const { trans } = useTranslation();
  const { hasPermissions }= useContext(UserContext)

  const [filialArr, setFilialArr] = useState([])
  const [loading, setLoading] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [regModalOpen, setRegModalOpen] = useState(false)
  const [delModalOpen, setDelModalOpen] = useState(false)
  const [delLoading, setDelLoading] = useState(false);
  const [selectedId, setSelectedId] = useState('')

  const [dataToEdit, setDataToEdit] = useState({})
  const [target, setTarget] = useState("")

  const [constData, setConstData] = useState([])
  const [editableData, setEditableData] = useState([])

  const getData = () => {
    setLoading(true)
    if (hasPermissions("Permissions.Branch")) {
      API.get(`/get-requests-handler`, { params: { url: `/Company/branches`, params: {} } })
        .then(
          (res) => {
            setLoading(false)
            setConstData(res.data)
            setEditableData(res.data)
          }
        )
        .catch((err) => {
          setLoading(false)
          notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"});
        })
    }
  }

  const handleDelete = () => {
    setDelLoading(true);
    API.delete(`/delete-requests-handler`, { params: { url: `/Company/branches/${selectedId}`, params: {} } })
      .then((res) => {
        setDelModalOpen(false);
        setDelLoading(false);
        getData()
      })
      .catch((err) => {
        setDelModalOpen(false);
        setDelLoading(false);
        getData();
        notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"});
      })
  }

  const handleCancel = () => {
    setDelModalOpen(false);
  };

  const handleDelModal = (id) => {
    setDelModalOpen(true)
    setSelectedId(id)
  }

  const editFilial = (id) => {
    const newData = constData.find((item, index) => index === id)
    setDataToEdit(newData)
    setTarget("filial")
    setEditModalOpen(true)
  }

  const addOffice = (type) => {
    setTarget(type)
    setRegModalOpen(true)
  }

  useEffect(() => {
    setDataToEdit({})
  }, [filialArr])

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="content-wrapper">
      <div className="filial-wrapper">
        <div className='add-button-container'>
          <Row justify={"end"}>
            <Col xs={24} lg={5}>
              {hasPermissions("Permissions.Branch.Add") && <Button className='focus-white' type="primary" icon={<UsergroupAddOutlined />} onClick={() => addOffice("filial")}>{trans("add_filial")}</Button>}
            </Col>
          </Row>
        </div>

        <Row gutter={[32, 32]} justify="space-around" >
          {editableData?.map((item, index) => {
            return (
              <Col className='card-wrapper' key={index}>
                <Card
                  style={{ width: 300 }}
                  cover={
                    <img
                      alt="example"
                      // src={logo}
                    // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  actions={[
                    <EllipsisOutlined key="ellipsis" />,
                    hasPermissions("Permissions.Branch.Edit") && <EditOutlined key="edit" onClick={() => editFilial(index)} />,
                    hasPermissions("Permissions.Branch.Remove") && <DeleteOutlined key="delete" onClick={() => handleDelModal(item.id)} />,
                  ]}
                >
                  <Meta
                    title={item.name}
                    description={
                      <div className='card-body'>
                        <div><p>{trans('id')}:</p><p>{item.identificationNumber}</p></div>
                        <div><p>{trans('address')}:</p><p>{item.address}</p></div>
                        <div><p>{trans('phone')}:</p><p>{item.mobileNumber}</p></div>
                        <div><p>{trans('line_amount')}:</p><p>{item.workLineCount}</p></div>
                        <div><p>{trans('company_id')}:</p><p>{item.companyId}</p></div>
                        <div><p>{trans('supports_military')}:</p><p>{item.supportsMilitary ? trans("yes") : trans("no")}</p></div>
                        <div><p>{trans('supports_foreign')}:</p><p>{item.supportsForeign ? trans("yes") : trans("no")}</p></div>
                      </div>}
                  />
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>
      <FilialRegistration
        modalIsOpen={regModalOpen}
        setModalIsOpen={setRegModalOpen}
        setData={(data) => setFilialArr(prev => [...prev, data])}
        target={target}
        resetPage={getData}
      />
      <FilialEdit
        modalIsOpen={editModalOpen}
        setModalIsOpen={setEditModalOpen}
        setData={(data) => setFilialArr(prev => [...prev, data])}
        defaultValue={dataToEdit}
        target={target}
      />
      <Modal
        title={trans('delete_branch')}
        visible={delModalOpen}
        onOk={handleDelete}
        confirmLoading={delLoading}
        onCancel={handleCancel}
        okText={trans("yes")}
        cancelText={trans("no")}
      >
        <p>{trans('do_you_really_want_to_delete_branch')}</p>
      </Modal>
      {loading &&
        <Space size="middle" className='loading'>
          <Spin size="large" />
        </Space>
      }
    </div>
  )
}

export default Filial
