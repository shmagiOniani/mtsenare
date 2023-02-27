import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Space, Spin, Button, Radio, Modal, Tooltip, message, notification } from 'antd'
import { IdcardOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons"
import RoleManipulation from '../../components/modals/RoleManipulation'
import useTranslation from '../../components/translation/useTranslation';
import API from '../../utils/API'
import "./Role.scss"
import { UserContext } from '../../components/contexts/UserContext';

function Role() {
  const { trans } = useTranslation();
  const { hasPermissions }= useContext(UserContext) 

  const [actionType, setActionType] = useState()
  const [loading, setLoading] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [delModalOpen, setDelModalOpen] = useState(false)
  const [delLoading, setDelLoading] = useState(false)

  const [permissions, setPermissions] = useState([])
  const [selectedPermissions, setSelectedPermissions] = useState([])
  const [selectedRolePermissions, setSelectedRolePermissions] = useState([])
  const [selectedPerIds, setSelectedPerIds] = useState([])

  const [roles, setRoles] = useState([])
  const [selectedRole, setSelectedRole] = useState(null)
  const [roleModal, setRoleModal] = useState(false)


  const getPermissions = () => {
    setLoading(true)
    API.get(`/get-requests-handler`, { params: { url: `/Security/permissions` } })
      .then((res) => {
   
        setPermissions(res.data);
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false);
        notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"});
      }
        )
  }

  const getRolePermissions = () => {
    console.log(selectedRole);
    setLoading(true)
    API.get(`/get-requests-handler`, { params: { url: `/Security/roles/${selectedRole}/permissions` } })
      .then((res) => {
        setSelectedRolePermissions(res.data);
        setSelectedPerIds(res.data?.map(item => item.id))
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false);
        notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"});
      })
  }

  const getRoles = () => {
    setLoading(true)
    API.get(`/get-requests-handler`, { params: { url: `/Security/roles` } })
      .then((res) => {
        setRoles(res.data);
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false);
        notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"});
      })
  }

  const handleRoleRadio = (val) => {
    setSelectedRole(val.target.value)
  }

  const handleRadioClick = (id) => {
    if (id === selectedRole) {
      setSelectedRole(null)
    }
  }

  const handleRoleModal = (name) => {
    setModalTitle(name)
    setRoleModal(true)
  }

  const handleEditRole = (id) => {
    setRoleModal(true)
    setSelectedRole(id)
    setActionType("edit")
  }

  const handleDelRole = (role) => {
    setDelModalOpen(true)
    setSelectedRole(role.id)
  }

  const handleDelRoleModal = () => {
    setDelLoading(true)
    API.delete(`/delete-requests-handler`, { params: { url: `/Security/roles/${selectedRole}`, params: {} } })
      .then((res) => {
        if (res.data.name === "Error") {
          message.error(res.data.message);
        } else {
          getRoles()
          setSelectedRole(null)
          setDelModalOpen(false)
        }
        setDelLoading(false)
      })
      .catch(err => {
        getRoles();
        setDelLoading(false);
        setDelModalOpen(false);
        setSelectedRole(null);
        notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"});
      })
  }

  const handleReduceRole = (perId) => {
    const newPerArr = selectedRolePermissions.filter(item => item.id !== perId);
    const newArr = newPerArr?.map(item => item.id);

    API.post(`/post-requests-handler`, { url: `/Security/roles/${selectedRole}/permissions`, params: {}, data: newArr })
      .then((res) => {
        getRoles()
        getRolePermissions()
      })
      .catch(err => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
  }

  const handleAssignPermission = (roleId, perm) => {
    API.post(`/post-requests-handler`, { url: `/Security/roles/${roleId}/permissions`, params: {}, data: [...selectedPerIds, perm.id] })
      .then(res => {
        getRolePermissions()
        setSelectedPermissions([])
      })
      .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
  }

  useEffect(() => {
    if (selectedPermissions.length > 0) {
      setSelectedRole([])
    }
  }, [selectedPermissions])

  useEffect(() => {
    if (selectedRole) {
      getRolePermissions()
    } else {
      getPermissions()
    }
  }, [selectedRole])

  useEffect(() => {
    getPermissions()
    getRoles()
  }, [])

  return (
    <>
      <div className='content-wrapper role-wrapper'>
    
        <Row gutter={[16, 30]} className="role-container" >
          <Col xs={24}>
            <Row  justify={'space-between'}>
              <Col>
              <div className="role-header">
                <IdcardOutlined />
                <h3 >{trans("roles")}</h3>
              </div>
              </Col>
              <Col>
                {hasPermissions("Permissions.Roles.Add") && <Button className='focus-white' icon={<PlusOutlined />} type={"primary"} onClick={() => handleRoleModal(trans("add_role"))} >{trans("add_role")}</Button>}
              </Col>
            </Row>
          </Col>

          <Col xs={24} md={6}>
            <h6>{selectedPermissions.length === 0 ? trans("roles") : "აირჩიეთ როლი"}</h6>
            <div className="roles-container">
              <Radio.Group value={selectedRole} buttonStyle="solid" onChange={handleRoleRadio}>
                {roles?.map((role, roleInd) => {
                  return (
                    <div key={roleInd} className="role-item">
                      <Radio.Button type={"primary"} onClick={() => handleRadioClick(role.id)} key={roleInd} value={role.id} >
                        <span>{role.name}</span>
                      </Radio.Button>
                      <Tooltip id="tooltip-bottom" title={"როლის წაშლა"}>
                        {hasPermissions("Permissions.Roles.Remove") && <div onClick={() => handleDelRole(role)} className='del-icon'><DeleteOutlined /></div>}
                      </Tooltip>
                      <Tooltip id="tooltip-bottom" title={"როლის რედაქტირება"}>
                        {hasPermissions("Permissions.Roles.Edit") && <div onClick={() => handleEditRole(role)} className='edit-icon'><EditOutlined /></div>}
                      </Tooltip>
                    </div>
                  )
                })}
              </Radio.Group>
            </div>
          </Col>
          <Col xs={24} md={18} >

            <h6>{selectedRole > 0 ? trans("permissions") : trans("permissions")}</h6>
            <div className="permisssions-container">
              {/* <Checkbox.Group style={{ width: '100%' }} onChange={handlePermissionCheck}> */}
              <Row gutter={[0, 10]}>
                {selectedRole > 0 ?
                  <>
                    {/* permissions that are  assigned to selected role*/}
                    {/* <h6 className="title">მინიჭებული უფლებები</h6>
                    <Col xs={24} className="permissions-wrapper">
                      <Row gutter={[0, 10]}>
                        {selectedRolePermissions?.map((permission, permissionInd) => {
                          return (
                            <Col xs={24} key={permissionInd} className="permission-item">
                              <div>

                                <span>
                                  {permission.name}
                                </span>
                                <Tooltip id="tooltip-bottom" title={"უფლების ამოკლება"}>
                                  <div onClick={() => handleReduceRole(permission.id)} className='del-icon'><DeleteOutlined /></div>
                                </Tooltip>
                              </div>
                            </Col >
                          )
                        })}
                      </Row>
                    </Col> */}
                    {/* permissions that are not assigned to selected role*/}
                    {/* <h6 className="title">ყველა უფლება</h6> */}
                    <Col xs={24} className="permissions-wrapper">
                      <Row gutter={[0, 10]}>
                    {permissions?.map((permission, permissionInd) => {
                      return (
                        <Col xs={24} key={permissionInd} className="permission-item">
                          <div>

                            <span>
                              {permission.name}
                            </span>
                            {selectedPerIds.includes(permission.id) ?
                              <Tooltip id="tooltip-bottom" title={"უფლების ამოკლება"}>
                                {hasPermissions("Permissions.Roles.Remove") && <div onClick={() => handleReduceRole(permission.id)} className='del-icon'><DeleteOutlined /></div>}
                              </Tooltip>
                              :
                              <Tooltip id="tooltip-bottom" title={"უფლების დამატება"}>
                                {hasPermissions("Permissions.Roles.Edit") && <div onClick={() => handleAssignPermission(selectedRole ,permission)} className='del-icon'><PlusOutlined /></div>}
                              </Tooltip>
                            }
                          </div>
                        </Col >
                      )
                    })}
                    </Row>
                    </Col>
                  </>
                  :
                  <>
                    {permissions?.map((permission, permissionInd) => {
                      return (
                        <Col xs={24} key={permissionInd} className="permission-item">
                          <div>
                            <span>
                              {permission.name}
                            </span>
                          </div>
                        </Col >
                      )
                    })}
                  </>
                }
              </Row>

              {/* </Checkbox.Group> */}
            </div>
          </Col>
        </Row>
      </div>
      <RoleManipulation
        type={actionType}
        title={modalTitle}
        modalIsOpen={roleModal}
        setModalIsOpen={setRoleModal}
        defaultValue={selectedRole}
        refresh={getRoles} />
      <Modal
        title="როლის წაშლა"
        visible={delModalOpen}
        onOk={handleDelRoleModal}
        confirmLoading={delLoading}
        onCancel={() => setDelModalOpen(false)}
        okText={trans("yes")}
        cancelText={trans("no")}
      >
        <p>{"ნამდვილად გსურთ როლის წაშლა?"}</p>
      </Modal>
      {loading &&
        <Space size="middle" className='loading'>
          <Spin size="large" />
        </Space>
      }
    </>
  )
}

export default Role