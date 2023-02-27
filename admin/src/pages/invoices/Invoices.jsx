import React, { useEffect, useState } from 'react'
import { Table, Menu, Dropdown, Button, Row, Col, Space, Spin,Modal, message, notification } from 'antd';
import { EditOutlined ,DeleteOutlined } from '@ant-design/icons';
import { MoreOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import API from "../../utils/API"
import AddInvoice from "../../components/modals/AddInvoice"
import useTranslation from '../../components/translation/useTranslation';
import EditInvoice from '../../components/modals/EditInvoice';
import "./Invoices.scss"


function Invoices() {
  const { trans } = useTranslation();
  const [loading, setLoading] = useState(false)

  const [tableData, setTableData] = useState([])
  const [selectedId, setSelectedId] = useState("")
  const [delModalOpen, setDelModalOpen] = useState(false)

  const [editInvoiceModalIsOpen, setEditInvoiceModalIsOpen] = useState(false)
  const [addInvoiceModalIsOpen, setAddInvoiceModalIsOpen] = useState(false)
  // const [currentpage, setCurrentPage] = useState(1)
  // const [totalPages, setTotalPages] = useState(1)

  const menu = (id) => {
    return (
      <Menu>

          <Menu.Item key="0" icon={<DeleteOutlined />}  onClick={() => handleDelModal(id)}>
            {trans("delete")}
          </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1" icon={<EditOutlined />}  onClick={() => handleEditModal(id)}>
            {trans("edit")}
          </Menu.Item>
      </Menu>
    )
  }

  const handleEditModal =(id)=> {
    setSelectedId(id)
    setEditInvoiceModalIsOpen(true)
  }

  const handleDelModal = (id)=> {
    setSelectedId(id)
    setDelModalOpen(true)
  }

  const handleDelete = () => {
    setLoading(true);

    API.delete(`/delete-requests-handler`, { params: { url: `/Invoice/${selectedId}`, params: {} } })
      .then((res) => {
        getData()
        setDelModalOpen(false);
        setLoading(false);
      })
      .catch(err => {
        setDelModalOpen(false);
        setLoading(false);
        notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"})
      })
  }

  const columns = [
    {
      key: 'responsive-invoice-body',
      title: trans('user'),
      render: (invoice) => (
        <div className='user-column'>
          <br />
          {invoice.id}
          <br />
          {invoice.applicantName}
          <br />
          {invoice.identificationCode}
          <br />
          {invoice.contactPhone}
          <br />
          {invoice.contactEmail}
          <br />
          {invoice.totalPrice}
          <br />
          {invoice.timestamp}
        </div>
      ),
      responsive: ["xs"]
    },
    {
      key: "invoice-menu",
      title: trans("actions"),
      render: (car) =>
        <Dropdown overlay={menu(car.id)} trigger={['click']}>
          <div className="carMenu_icon">
            <MoreOutlined />
          </div>
        </Dropdown>,

      responsive: ["xs"]
    },
    {
      title: trans("invoice_id"),
      dataIndex: 'id',
      key: 'id',
      responsive: ["sm"]
    },
    {
      title: trans("applicant_name"),
      dataIndex: 'applicantName',
      key: 'applicantName',
      responsive: ["sm"]
    },
    {
      title: trans("identification_num"),
      dataIndex: 'identificationCode',
      key: 'identificationCode',
      responsive: ["sm"]
    },
    {
      title: trans("phone"),
      dataIndex: 'contactPhone',
      key: 'contactPhone',
      responsive: ["sm"]
    },
    {
      title: trans('email'),
      dataIndex: 'contactEmail',
      key: 'contactEmail',
      responsive: ["sm"]
    },
    {
      title: trans("price"),
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      responsive: ["sm"]
    },
    {
      title: trans("date"),
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (item) => (
        <div >{`${item?.slice(0, 10)}  ${item?.slice(11, 16)}`}</div>
      ),
      responsive: ["sm"]
    },
    {
      title: trans("menu"),
      key: 'menu',
      render: car =>
        <div className="actions-container" >
          <Dropdown overlay={menu(car.id)} trigger={['click']}>
            <Button shape="circle" icon={<MoreOutlined />} size={"large"} />
          </Dropdown>
        </div>,
      responsive: ["sm"]
    }
  ]

  // applicantAddress: "string"
  // applicantName: "string"
  // contactEmail: "string"
  // contactPhone: "string"
  // id: 4
  // identificationCode: "01024079294"
  // prescription: null
  // prices: null
  // timestamp: "2022-03-04T17:22:55.134858"
  // totalPaymentPrice: 2
  // totalPrice: 2

  const transformData = (data) => {
    setTableData([])
    data?.map((item, index) =>
      setTableData(prev => [{
        key: item.id,
        id: item.id,
        applicantName: item.applicantName,
        identificationCode: item.identificationCode,
        contactPhone: item.contactPhone,
        contactEmail: item.contactEmail,
        totalPrice: item.totalPrice,
        timestamp: item.timestamp,
        menu: item.id
      }, ...prev])
    )
  }

  const getData = () => {
    setLoading(true)

    API.get(`/get-requests-handler`, { params: { url: `/Invoice`, params: { Page: 1, Count: 10 } } })
      .then(
        (res) => {
          if(res.data.name === "Error"){
            message.error(res.data.message);
          }else {
            setLoading(false)
            transformData(res.data.data)
          }
        }
      )
      .catch((err) => {
        setLoading(false);
        notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"})
      }
      )
  }


  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='content-wrapper registry-wrapper'>
      <div className="registry-table">
        <Row className="table-header">
          <Col>
            <h3>{trans('invoices')}</h3>
          </Col>
          {/* <Col>
            <div className="actions">
              <Button type="primary" icon={<FileAddOutlined />} onClick={() => setAddInvoiceModalIsOpen(true)}>
                {trans('add_invoice')}
              </Button>
            </div>
          </Col> */}
        </Row>
        <Table columns={columns} dataSource={tableData} pagination={false} />
        <div className="pagination-wrapper">
          {/* <Pagination current={currentpage} onChange={(onChange)=> getData(onChange)} pageSize={"10"} total={totalPages} /> */}
        </div>
      </div>
      <AddInvoice modalIsOpen={addInvoiceModalIsOpen} setModalIsOpen={setAddInvoiceModalIsOpen} refresh={getData} />
      <EditInvoice modalIsOpen={editInvoiceModalIsOpen} setModalIsOpen={setEditInvoiceModalIsOpen} refresh={getData} id={selectedId} />
        <Modal
        title="ფილიალის წაშლა"
        visible={delModalOpen}
        onOk={handleDelete}
        // confirmLoading={delLoading}
        onCancel={() => setDelModalOpen(false)}
        okText={trans("yes")}
        cancelText={trans("no")}
      >
        <p>{"ნამდვილად გსურთ ფილიალის წაშლა?"}</p>
      </Modal>
      {loading && <Space size="middle" className='loading'> <Spin size="large" /> </Space>}
    </div>
  )
}

export default Invoices
