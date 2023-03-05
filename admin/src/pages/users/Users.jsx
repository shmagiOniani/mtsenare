import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Row, Col, Input, message, notification, Tooltip, Pagination, Switch } from "antd";
import {
  DeleteOutlined,
  LockOutlined,
  FilterOutlined,
  FileAddOutlined,
  EditOutlined
} from "@ant-design/icons";
import API from "../../utils/API";
import AddUser from "../../components/modals/AddUser";
import useTranslation from "../../components/translation/useTranslation";
import UpdateUser from "./UpdateUser";
import "./users.scss";
import ChangePwd from "../../components/modals/ChangePwd";
import { GeneralContext } from "../../components/contexts/GeneralContext";
// import { UserContext } from "../../components/contexts/UserContext";

export default function Users() {
  const { Search } = Input;
  const { trans } = useTranslation();
  // const { hasPermissions } = useContext(UserContext)
  const { positions, branches } = useContext(GeneralContext)


  const [loading, setLoading] = useState(false)

  const [userModalIsOpen, setUserModalIsOpen] = useState(false);
  const [userModalTarget, setUserModalTarget]= useState("")
  const [selectedUser, setSelectedUser]= useState({})

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
    // API.get(`/get-requests-handler`, { params: { url: `/Security/roles` } })
    //   .then((res) => {
    //     setRoles(res.data);
    //   })
    //   .catch((err) => notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" }))
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
      default:
        break;
    }
    setParams(paramInst)
    setLoading(true)

    API.get(`api/users`)
      .then((res) => {
        setLoading(false)
        setDatas(res?.data?.items);
        setTotalPages(res.data?.numTotal)
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
          username: item.userName,
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email,
          phone: item.phoneNumber,
          status: item.isActive,
          shop: item.shop,
          role: item.role,
          action: item,
          key: index
        },
        ...prev,
      ])
    );
  };

  const toggleStatus = ({ status, id }) => {
    API.put(`/api/user/status`, { status })
      .then((res) => message.success(res))
      .catch((err) => {
        notification.error({
          message: trans(err?.response?.data) || trans("connection_problem"),
          placement: "bottomLeft",
        });
      })
      .finally(() => getData());
  };

  const deleteData = (id) => {
    console.log(id);
    // API.delete(`/api/user/${id}`)
    //   .then((res) => message.success(res))
    //   .finally(() => getData());
  };

  const openAddModal =()=> {
    setUserModalTarget("add")
    setUserModalIsOpen(true)
  }

  const openEditModal =(data)=> {
    setUserModalTarget("edit")
    setUserModalIsOpen(true)
    setSelectedUser(data)
  }

  // const handleEditModal = (id) => {
  //   setSelectedId(id)
  //   setUpdateModalOpen(true)
  //   setRenderModal(true)
  // }

  const handlePwdModal = (id) => {
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
    if (!userModalIsOpen) {
      getData("", { Page: 1, Count: 10})
    }
  }, [updateModalOpen])

  const columns = [
    {
      title: trans("user"),
      dataIndex: "username",
      key: "username",
      responsive: ["sm"],
    },
    {
      title: trans("first_name"),
      dataIndex: "firstName",
      key: "firstName",
      responsive: ["sm"],
    },
    {
      title: trans("last_name"),
      dataIndex: "lastName",
      key: "lastName",
      responsive: ["sm"],
    },
    {
      title: trans("position"),
      dataIndex: "role",
      key: "role",
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
      render: (product) => (
        <Switch
          onClick={(v) => {
            toggleStatus(v, product?._id);
          }}
          checked={product?.isPublished}
        />
      ),
    },
    {
      title: trans("action"),
      dataIndex: "action",
      key: "action",
      render: (product) => (
        <div className="product-actions-container">
              <Tooltip title={trans("edit")}>
            <Button
              onClick={() => openEditModal(product)}
              icon={<EditOutlined />}
              shape={"circle"}
              type={"text"}
              size={"large"}

              // className={"menu-btn"}
            />
          </Tooltip>
          <Tooltip title={trans("change_password")}>
            <Button
              onClick={() => handlePwdModal(product._id)}
              icon={<LockOutlined />}
              shape={"circle"}
              type={"text"}
              size={"large"}

              // className={"menu-btn"}
            />
          </Tooltip>
          <Tooltip title={trans("delete")}>
            <Button
              onClick={() => deleteData(product._id)}
              icon={<DeleteOutlined />}
              shape={"circle"}
              type={"text"}
              size={"large"}
              // className={"menu-btn"}
            />
          </Tooltip>
        </div>
      ),
      // render: (id) => (
      //   <div className="status-container">
      //      <Tooltip title={trans("change_password")} placement="bottom" color={"blue"} >
      //       <div onClick={() => handlePwdModal(id)} className="status stop">
      //         <Button
      //           type="primary"
      //           shape="circle"
      //           icon={<LockOutlined />}
      //           size={"large"}
      //         />
      //       </div>
      //     </Tooltip>
      //     {hasPermissions("Permissions.User.Edit") && <Tooltip title={trans("edit")} placement="bottom" color={"blue"} >
      //       <div onClick={() => handleEditModal(id)} className="status stop">
      //         <Button
      //           type="primary"
      //           shape="circle"
      //           icon={<EditOutlined />}
      //           size={"large"}
      //         />
      //       </div>
      //     </Tooltip>}
      //   </div>
      // ),
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

            <Row gutter={[0, 10]}>
              <Col >
                <div className="input-group">
                  <Button
                    disabled
                    className="filter-btn"
                    htmlFor="select"
                  >
                    <FilterOutlined />
                  </Button>
                  <select
                    value={filterBy}
                    className="form-select"
                    id="select"
                    onChange={(e) => setFilterBy(e.target.value)}
                  >
                    <option value="Username">{trans("username")}</option>
                    <option value="FullName">{trans("fullname")}</option>
                    <option value="PositionId">{trans("position")}</option>
                    <option value="PhoneNumber">{trans("phone")}</option>
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
                <Button className='add-button' type="primary" icon={<FileAddOutlined />} onClick={openAddModal}>
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

      {userModalIsOpen ? <AddUser
        modalIsOpen={userModalIsOpen}
        setModalIsOpen={setUserModalIsOpen}
        positionsArr={positions}
        refresh={getData} 
        target={userModalTarget}
        /> : ""}

      {pwdModal ? <ChangePwd
        modalIsOpen={pwdModal}
        setModalIsOpen={setPwdModal}
        refresh={getData}
        userId={selectedId}
      /> : ""}
      {/* {loading &&
        <Space size="middle" className='loading'>
          <Spin size="large" />
        </Space>} */}
    </div>
  );
}
