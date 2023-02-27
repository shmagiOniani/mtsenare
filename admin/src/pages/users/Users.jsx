import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Space, Spin, Row, Col, Input, message, notification, Tooltip, Pagination } from "antd";
import {
  PauseOutlined,
  CaretRightOutlined,
  EyeOutlined,
  EditOutlined,
  FilterOutlined,
  FileAddOutlined,
  LockOutlined,
} from "@ant-design/icons";
import API from "../../utils/API";
import AddUser from "../../components/modals/AddUser";
import useTranslation from "../../components/translation/useTranslation";
import UpdateUser from "./UpdateUser";
import "./users.scss";
import ChangePwd from "../../components/modals/ChangePwd";
import { UserContext } from "../../components/contexts/UserContext";
import { GeneralContext } from "../../components/contexts/GeneralContext";

export default function Users() {
  const { Search } = Input;
  const { trans } = useTranslation();
  const { hasPermissions } = useContext(UserContext)
  const { positions, branches } = useContext(GeneralContext)


  const [loading, setLoading] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  // const [positions, setPositions] = useState([]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState("")
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("Username");
  const [renderModal, setRenderModal] = useState(false)
  const [pwdModal, setPwdModal] = useState(false)

  const [datas, setDatas] = useState([]);
  const [params, setParams] = useState({
    Page: 1,
    Count: 10
  })
  const [totalPages, setTotalPages] = useState(null)

  const [newData, setNewData] = useState([]);


  const getLibraris = () => {
    API.get(`/get-requests-handler`, { params: { url: `/Security/roles` } })
      .then((res) => {
        setRoles(res.data);
      })
      .catch((err) => notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" }))
  }

  const getData = (searchValue, parameters) => {
    console.log("search object",searchValue);
    
    setSearchTerm(searchValue)
   let paramInst = {
   }

    switch (filterBy) {
      case "Username":
        paramInst={...parameters, Username: searchValue }
        break;
      case "FullName":
        paramInst={...parameters, FullName: searchValue }
        break;
      case "PositionId":
        paramInst={...parameters, PositionId: searchValue }
        break;
      case "PhoneNumber":
        paramInst={...parameters, PhoneNumber: searchValue }
        break;
      case "IdentificationNumber":
        paramInst={...parameters, IdentificationNumber: searchValue }
        break;
      default:
        break;
    }
    setParams(paramInst)
    setLoading(true)

    API.get(`/get-requests-handler`, { params: { url: `/Security/users`, params: paramInst } })
      .then((res) => {
        setLoading(false)
        setDatas(res?.data?.data);
        setTotalPages(res.data?.totalCount)
      })
      .catch((err) => {
        setLoading(false);
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" });
      })
  }


  const transformData = (data) => {
    setNewData([]);
    data?.map((item, index) =>
      setNewData((prev) => [
        {
          operation: [item.isActive, item.id],
          username: item.username,
          fullName: item.fullName,
          position: item.position,
          email: item.email,
          phone: item.phoneNumber,
          identificationNumber: item.identificationNumber,
          status: item.isActive,
          branch: item.branch,
          action: item.id,
          key: index
        },
        ...prev,
      ])
    );
  };

  const toggleActive = (id) => {
    setLoading(true)
    API.post('/post-requests-handler', { url: `/Security/users/${id}/toggleActive`, params: {}, data: {} })
      .then((res) => {
        getData("", { Page: 1, Count: 10})
        setLoading(false)
      })
      .catch((err) => {
        getData("", { Page: 1, Count: 10});
        setLoading(false);
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" });
      })
  };

  const handleEditModal = (id) => {
    setSelectedId(id)
    setUpdateModalOpen(true)
    setRenderModal(true)
  }

  const handlePwdModal = (id) => {
    console.log(id);
    setSelectedId(id)
    setPwdModal(true)
    setRenderModal(true)
  }

  useEffect(() => {
    getLibraris()
  }, [])

  useEffect(() => {
    setSearchTerm("")
  }, [filterBy]);

  useEffect(() => {
    transformData(datas);
  }, [datas]);

  useEffect(() => {
    if (!modalIsOpen) {
      getData("", { Page: 1, Count: 10})
    }
  }, [updateModalOpen])

  const columns = [
    {
      title: trans("user"),
      render: (record) => (
        <div className="user-column">
          {record.username}
          <br />
          {record.position}
          <br />
          {record.email}
          <br />
          {record.phone}
          <br />
          {record.branch}
        </div>
      ),
      responsive: ["xs"],
    },
    {
      title: trans("operation"),
      render: (user) => (
        <div className="operations-column">
          {!user.operation[0] ? (
            <div
              onClick={() => toggleActive(user.operation[1])}
              className="status stop"
            >
              <Button
                type="primary"
                shape="circle"
                icon={<CaretRightOutlined />}
                size={"large"}
              />
            </div>
          ) : user.operation[0] ? (
            <div
              onClick={() => toggleActive(user.operation[1])}
              className="status activation"
            >
              <Button
                type="primary"
                shape="circle"
                icon={<PauseOutlined />}
                size={"large"}
              />
            </div>
          ) : (
            trans("not_found")
          )}
          <br />
          {
            <div className="status-container">
              <Link to={`/users/${user.action}`} className="status stop">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EyeOutlined />}
                  size={"large"}
                />
              </Link>
              <div onClick={() => handleEditModal(user.action)} className="status stop">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  size={"large"}
                />
              </div>
            </div>
          }
        </div>
      ),
      responsive: ["xs"],
    },
    {
      title: trans("status"),
      dataIndex: "status",
      key: "status",
      responsive: ["xs"],
      render: (isActive) =>
      (
        <div className="status-wrapper">
          {isActive ? (
            <div>
              <div className="success-dot" />
              {/* <span>{trans("active")}</span> */}
            </div>
          ) : !isActive ? (
            <div>
              <div className="fail-dot" />
              {/* <span>{trans("suspended")}</span> */}
            </div>
          ) : (
            trans("not_found")
          )}
        </div>
      ),
    },
    {
      title: trans(""),
      dataIndex: "operation",
      key: "operation",
      render: (user) =>
        <Tooltip title={trans("status")} placement="bottom" color={"blue"} >

          <div onClick={() => toggleActive(user[1])} className="status stop">
            {!user[0] ? (
              <Button
                type="primary"
                shape="circle"
                icon={<CaretRightOutlined />}
                size={"large"}
              />
            ) : user[0] ? (
              <Button
                type="primary"
                shape="circle"
                icon={<PauseOutlined />}
                size={"large"}
              />
            ) : trans("not_found")}
          </div>
        </Tooltip>,

      responsive: ["sm"],
    },
    {
      title: trans("user"),
      dataIndex: "username",
      key: "username",
      responsive: ["sm"],
    },
    {
      title: trans("fullname"),
      dataIndex: "fullName",
      key: "fullName",
      responsive: ["sm"],
    },
    {
      title: trans("position"),
      dataIndex: "position",
      key: "position",
      responsive: ["sm"],
    },
    {
      title: trans("email"),
      dataIndex: "email",
      key: "email",
      responsive: ["sm"],
    },
    {
      title: trans("phone"),
      dataIndex: "phone",
      key: "phone",
      responsive: ["sm"],
    },
    {
      title: trans("personal_number"),
      dataIndex: "identificationNumber",
      key: "identificationNumber",
      responsive: ["sm"],
    },
    {
      title: trans("branch"),
      dataIndex: "branch",
      key: "branch",
      responsive: ["sm"],
    },
    {
      title: trans("status"),
      dataIndex: "status",
      key: "status",
      responsive: ["sm"],
      render: (isActive) =>
      (
        <div className="status-wrapper">
          {isActive ? (
            <div>
              <div className="success-dot" />
              <span>{trans("active")}</span>
            </div>
          ) : !isActive ? (
            <div>
              <div className="fail-dot" />
              <span>{trans("suspended")}</span>
            </div>
          ) : (
            trans("not_found")
          )}
        </div>
      ),
    },
    {
      title: trans("action"),
      dataIndex: "action",
      key: "action",
      render: (id) => (
        <div className="status-container">
          <Tooltip title={trans("details")} placement="bottom" color={"blue"} >
            <Link to={`/users/${id}`} className="status stop">
              <Button
                type="primary"
                shape="circle"
                icon={<EyeOutlined />}
                size={"large"}
              />
            </Link>
          </Tooltip>
          <Tooltip title={trans("change_password")} placement="bottom" color={"blue"} >
            <div onClick={() => handlePwdModal(id)} className="status stop">
              <Button
                type="primary"
                shape="circle"
                icon={<LockOutlined />}
                size={"large"}
              />
            </div>
          </Tooltip>
          {hasPermissions("Permissions.User.Edit") && <Tooltip title={trans("edit")} placement="bottom" color={"blue"} >
            <div onClick={() => handleEditModal(id)} className="status stop">
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                size={"large"}
              />
            </div>
          </Tooltip>}
        </div>
      ),
      responsive: ["sm"],
    },
  ];

  return (
    <div className="content-wrapper">

      <div className="table-wrapper card">
        <Row className="card-header" >
          <Col >
            <h3>{trans("users_list")}</h3>
          </Col>
          <Col className='cars-filter-wrapper'>

            {/*<div className="input-group">*/}
            <Row gutter={[0, 10]}>
              <Col >
                <div className="input-group">
                  {hasPermissions("Permissions.User.Add") && <Button
                    disabled
                    className="filter-btn"
                    htmlFor="select"
                  >
                    <FilterOutlined />
                  </Button>}
                  <select
                    value={filterBy}
                    className="form-select"
                    id="select"
                    onChange={(e) => setFilterBy(e.target.value)}
                  >
                    <option value="" defaultValue>{trans("filter_by")}</option>
                    <option value="Username">{trans("username")}</option>
                    <option value="FullName">{trans("fullname")}</option>
                    <option value="PositionId">{trans("position")}</option>
                    <option value="PhoneNumber">{trans("phone")}</option>
                    <option value="IdentificationNumber">{trans("personal_number")}</option>
                  </select>
                </div>
              </Col>
              <Col>
                <Search
                  placeholder={trans('search')}
                  allowClear={true}
                  onChange={(e) => getData(e.target.value, { Page: 1, Count: 10})}
                  style={{ width: 200 }} />
              </Col>
              <Col>
                <Button className='add-button' type="primary" icon={<FileAddOutlined />} onClick={() => setModalIsOpen(true)}>
                  <span className='add-btn-text'>{trans('add_user')}</span>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="users-table">
          <Table
            columns={columns}
            dataSource={newData}
            pagination={false}
            className={"users-table"}
          />
        </div>
        <Row className="currents-pagination" justify={"end"}>
            <Col style={{display: "flex"}}>
                <Pagination showSizeChanger={false} current={params?.Page } onChange={(page) => getData({}, { Page: page, Count: 10})} pageSize={"10"} total={totalPages} />
            </Col>
        </Row>
      </div>
      {renderModal ? <UpdateUser
        modalIsOpen={updateModalOpen}
        setModalIsOpen={() => setUpdateModalOpen(false)}
        selectedId={selectedId}
        rolesArr={roles}
        positionsArr={positions}
        branchesArr={branches} />
        : ""}

      {modalIsOpen ? <AddUser
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        positionsArr={positions}
        refresh={getData} /> : ""}

      {pwdModal ? <ChangePwd
        modalIsOpen={pwdModal}
        setModalIsOpen={setPwdModal}
        refresh={getData}
        userId={selectedId}
      /> : ""}
      {loading &&
        <Space size="middle" className='loading'>
          <Spin size="large" />
        </Space>}
    </div>
  );
}
