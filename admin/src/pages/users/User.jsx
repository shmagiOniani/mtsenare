import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import useTranslation from '../../components/translation/useTranslation';
import NotFound from '../NotFound';
// import axios from 'axios';
import API from "../../utils/API"
import { Button, Space, Spin, message, notification } from "antd"
import { UserOutlined } from "@ant-design/icons"
import './user.scss';
import UpdateUser from './UpdateUser';
import { UserContext } from '../../components/contexts/UserContext';
import { GeneralContext } from '../../components/contexts/GeneralContext';

export default function User() {
    const { id } = useParams();
    const { trans } = useTranslation();
    const {hasPermissions} = useContext(UserContext)
    const { positions } = useContext(GeneralContext)

    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState([]);
    const [roles, setRoles] = useState([])
    const [rolesFullData, setRolesFullData] = useState([])
    const [branch, setBranch] = useState([])

    const [updateModalOpen, setUpdateModalOpen] = useState(false)

    const getBranch = (id) => {
        if (hasPermissions("Permissions.Branch")) {
            setLoading(true)
        API.get(`/get-requests-handler`, { params: { url: `/Company/branches/${id}` } })
            .then((res) => {
                setLoading(false)
                setBranch(res.data);
            })
            .catch((err) => {
                setLoading(false);
                notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"});
            })
        }
    }

    const getUser = () => {
        if(hasPermissions("Permissions.User")){
            setLoading(true)
            API.get(`/get-requests-handler`, { params: { url: `/Security/users/${id}` } })
            .then((res) => {
                setLoading(false)
                setUserData(res?.data);
                getBranch(res?.data?.branchId)
                API.get(`/get-requests-handler`, { params: { url: `/Security/roles` } })
                .then((result) => {
                //   setRoles(result?.data);
                  let instData = res?.data?.roles?.map((roleId)=> result?.data?.filter(role =>role?.id === roleId))
                  setRoles(instData)
                  setRolesFullData(result.data)
                })
                .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
            
            })
            .catch((err) => {
                setLoading(false);
                notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"})
            })
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (!updateModalOpen) {
            getUser()
        }
    }, [updateModalOpen])

    return (
        <>
            {id ?
                <div className="content-wrapper">
                    {loading &&
                        <Space size="middle" className='loading'>
                            <Spin size="large" />
                        </Space>
                    }
                    <div className="user-card ">
                        <div className="card-header">
                            <div >
                                {/* <i className="fa fa-user-circle" aria-hidden="true"/> */}
                                <UserOutlined />
                                <h3>{userData.username}</h3>
                            </div>
                            <div className="close-btn">
                                <Link to="/users">&#10006;</Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <div>
                                <span>{trans('personal_number')}</span>
                                <p>{userData.identificationNumber}</p>
                            </div>
                            <div>
                                <span>{trans('email')}</span>
                                <p>{userData.email}</p>
                            </div>
                            <div>
                                <span>{trans('fullname')}</span>
                                <p>{userData.fullName}</p>
                            </div>
                            <div>
                                <span>{trans('branch')}</span>
                                <p>{branch?.name}</p>
                            </div>
                            <div>
                                <span>{trans('position')}</span>
                                <p>{positions?.find(pos => pos?.id === userData?.positionId)?.name}</p>
                            </div>
                            <div>
                                <span>{trans('roles')}</span>
                                {roles?.map((role, ind)=> <p key={ind}>{ind + 1}. {role[0].name}</p>)}
                            </div>
                            <div>
                                <span>{trans('phone')}</span>
                                <p>{userData.phoneNumber}</p>
                            </div>
                            <div>
                                <span>{trans('status')}</span>
                                {userData.isActive ? (
                                    <div className="user-status">
                                        <div className="success-dot" />
                                        <p>{trans('active')}</p>
                                    </div>
                                ) : (!userData.isActive ? (
                                    <div className="user-status">
                                        <div className="fail-dot" />
                                        <p>{trans('suspended')}</p>
                                    </div>) : trans('not_found'))
                                }
                            </div>
                            <div>
                                <Button type="defult" onClick={() => setUpdateModalOpen(true)}>
                                    {trans('edit')}
                                </Button>
                            </div>
                        </div>
                    </div>

                </div> :
                <NotFound />}
            {/* <UpdateUser
            modalIsOpen={updateModalOpen}
            setModalIsOpen={() => setUpdateModalOpen(false)}
            selectedId={id} /> */}


            <UpdateUser 
                modalIsOpen={updateModalOpen}
                setModalIsOpen={() => setUpdateModalOpen(false)}
                selectedId={id} 
                rolesArr={rolesFullData}
                positionsArr={positions}
                branchesArr={branch}/>
            
        </>

    )
}

