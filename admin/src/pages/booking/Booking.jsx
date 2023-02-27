import React, { useContext, useEffect, useState } from "react";
import { Modal, Table, Button, Tooltip, Row, Col, Pagination, message, notification } from "antd";
import { FilterOutlined, DeleteOutlined } from "@ant-design/icons";
import { EditOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import BookingManipulation from "../../components/modals/BookingManipulation";
import BookingFilter from "../../components/modals/BookingFilter";
import useTranslation from '../../components/translation/useTranslation';
import moment from "moment";
import API from "../../utils/API";
import { UserContext } from "../../components/contexts/UserContext";
import "./Booking.scss";
import { GeneralContext } from "../../components/contexts/GeneralContext";


function Booking() {
  const { trans } = useTranslation();
  const {hasPermissions} = useContext(UserContext)
  const { paymentChannels } = useContext(GeneralContext)


  const [filterOpen, setFilterOpen] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalType, setModalType] = useState("post")
  const [tableData, setTableData] = useState([])
  const [delLoading, setDelLoading] = useState(false);
  const [delModalOpen, setDelModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [currentpage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)


  const getData = (page) => {
    setCurrentPage(page ? page : 1)
    API.get(`/get-requests-handler`, { params: { url: `/Booking`, params: {Page: page ? page : 1, Count:10} } })
      .then(
        (res) => {
          if(res.data.name === "Error"){
            message.error(res.data.message);
          }else {
            transformData(res.data.data)
            setTotalPages(res.data.totalCount)
          }
        }
      )
      .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
  }

  const handleDlete = () => {
    setDelLoading(true);

    API.delete(`/delete-requests-handler`, { params: { url: `/Booking/${selectedId}`, params: {} } })
      .then((res) => {
        getData()
        setDelModalOpen(false);
        setDelLoading(false);
      })
      .catch(err => {
        setDelModalOpen(false);
        setDelLoading(false);
        notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"})
      })
  }

  const handleDelModal = (id) => {
    setDelModalOpen(true)
    setSelectedId(id)
  }

  const handleCancel = () => {
    setDelModalOpen(false);
    setDelLoading(false);

  };

  const transformData = (data) => {
    setTableData([])
    data?.map((item, index) =>
      setTableData(prev => [{
        key: item.id,
        plateNumber: item.plateNumber,
        customer: item.customer,
        phoneNumber: item.phoneNumber,
        branchId: item.branchId,
        visitDate: moment(item.visitDate).format('YYYY-MM-DD'),
        paymentChannel: paymentChannels.find(method => method.id ===item.paymentChannel),
        amount: item.amount,
        finished: item.finished,
        user: item.user,
        createDate: moment(item.createDate).format('YYYY-MM-DD'),
        branch: item.branch,
        bookingActions: item.id
      }, ...prev])
    )
  }

  const handleEditOpen=  (id) => {
    setSelectedId(id)
    setModalIsOpen(true)
    setModalType("put")
  }

  const handleAddOpen = () => {
    setModalIsOpen(true)
    setModalType("post")
  }

  const columns = [
    {
      title: trans('booking'),
      key: "booking-phone",
      render: (booking) => (
        <div className='user-column'>
          {booking.plateNumber}
          <br />
          {booking.customer}
          <br />
          {booking.phoneNumber}
          <br />
          {booking.branch}
          <br />
          {booking.visitDate}
          <br />
          {booking.createDate}
          <br />
          {booking.user}
          <br />
          {booking.paymentChannel?.name}
          <br />
          {booking.amount}
          <br />
          {booking.finished ? trans("finished") : trans("active")}
        </div>
      ),
      responsive: ["xs"]
    },
    {
      title: trans('operation'),
      key: "operation-phone",
      render: (organization) => (

          <div className="actions-container">
            <Button onClick={() => handleDelModal(organization.key)} type="primary" shape="circle" icon={<DeleteOutlined />} size={"large"} />
            <Button  onClick={()=>handleEditOpen(organization.key)} type="primary" shape="circle" icon={<EditOutlined />} size={"large"} />
          </div>

      ),
      responsive: ["xs"]
    },
    {
      title: trans('status'),
      dataIndex: 'finished',
      key: 'finished',
      render: (status) => (
        <div >
          {status ? trans("finished") : trans("active")}
        </div>
      ),
      responsive: ["sm"]
    },
    {
      title: trans("branch"),
      dataIndex: 'branch',
      key: 'branch',
      responsive: ["sm"]
    },
    {
      title: trans('plate_number'),
      dataIndex: 'plateNumber',
      key: 'plateNumber',
      responsive: ["sm"]
    },
    {
      title: trans('customer'),
      dataIndex: 'customer',
      key: 'customer',
      responsive: ["sm"]
    },
    {
      title: trans('phone'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      responsive: ["sm"]
    },
    {
      title: trans('visit_date'),
      dataIndex: 'visitDate',
      key: 'visitDate',
      responsive: ["sm"]
    },
    {
      title: trans('registration_date'),
      dataIndex: 'createDate',
      key: 'createDate',
      responsive: ["sm"]
    },
    {
      title: trans('user'),
      dataIndex: 'user',
      key: 'user',
      responsive: ["sm"]
    },
    {
      title: trans('payment_method'),
      dataIndex: 'paymentChannel',
      key: 'paymentChannel',
      render : (method) => (
        <div>
          {method?.name}
        </div>
      ),
      responsive: ["sm"]
    },
    {
      title: trans('price'),
      dataIndex: 'amount',
      key: 'amount',
      responsive: ["sm"]
    },
    {
      title: trans('action'),
      dataIndex: 'bookingActions',
      key: 'bookingActions',
      render: id =>
        <div className="actions-container">
          <Tooltip title={trans("delete")} placement="bottom" color={"blue"} >
            <Button onClick={() => handleDelModal(id)} type="primary" shape="circle" icon={<DeleteOutlined />} size={"large"} />
          </Tooltip>
          <Tooltip title={trans("edit")} placement="bottom" color={"blue"} >
            <Button  onClick={() => handleEditOpen(id)} shape="circle" icon={<EditOutlined />} size={"large"} />
          </Tooltip>
        </div>,
      responsive: ["sm"]
    },
  ]

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="content-wrapper booking-wrapper">
      <div className="booking-table">
        <Row className="table-header">
          <Col xs={24} sm={10}>
            <h3>{trans("booking")}</h3>
          </Col>
          <Col xs={24} sm={14} className={"actions"}>
            <div className="filter">
              <Button className="filter-icon focus-white" onClick={() => setFilterOpen(true)} type="primary" shape="round" icon={<FilterOutlined />} size={"large"} />
            </div>
            {hasPermissions("Permissions.Booking.Add") && <Button className="focus-white" onClick={handleAddOpen} type="primary" icon={<UsergroupAddOutlined />}>{trans("add_booking")}</Button>}
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
        />
      </div>
      <div className="pagination-wrapper">
        <Pagination showSizeChanger={false} current={currentpage} onChange={(onChange)=> getData(onChange)} pageSize={"10"} total={totalPages} />
      </div>
      <BookingFilter
        modalIsOpen={filterOpen}
        handleModalClose={() => setFilterOpen(false)}
        onSubmite={(data) => transformData(data)} 
        />

      <BookingManipulation
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        modalType={modalType}
        // defaultValue={modalData}
        selectedId={selectedId}
        refreshTable={getData}
      />

      <Modal
        title={trans("delete_branch")}
        visible={delModalOpen}
        onOk={handleDlete}
        confirmLoading={delLoading}
        onCancel={handleCancel}
        okText={trans("yes")}
        cancelText={trans("no")}
      >
        <p>{trans("do_you_really_want_to_delete_branch")}</p>
      </Modal>
    </div>
  );
}

export default Booking;
