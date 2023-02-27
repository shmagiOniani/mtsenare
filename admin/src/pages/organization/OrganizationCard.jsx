import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Avatar, Space, Spin, message, notification } from "antd"
import API from '../../utils/API';
import useTranslation from '../../components/translation/useTranslation';
import logo from "../../images/car-slider/tree.jpg"

export default function OrganizationCard() {
    const { trans } = useTranslation();
    const { id } = useParams();
    const [organizationData, setOrganizationData] = useState({});
    const [loading, setLoading] = useState(false)

    const getData = () => {
        setLoading(true)
        API.get(`/get-requests-handler`, { params: { url: `/Company/${id}`, params: {} } })
            .then(
                (res) => {
                    setOrganizationData(res.data)
                    setLoading(false)
                }
            )
            .catch((err) => {
                setLoading(false);
                notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"});
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        id ?
            <div className="content-wrapper organization-card-wrapper">
                <div className="organization-card ">
                    <div className="card-header">
                        <div >
                            {/* <i className="fa fa-user-circle" aria-hidden="true"/> */}
                            <div>
                                <Avatar
                                    src={organizationData?.logo}
                                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                />

                            </div>
                            <h3>{organizationData.name}</h3>
                        </div>
                        <div className="close-btn">
                            <Link to="/organization">&#10006;</Link>
                        </div>
                    </div>
                    <div className="card-body">
                        <div>
                            <span>{trans('legal_address')}</span>
                            <p>{organizationData.address}</p>
                        </div>
                        <div>
                            <span>{trans('responsible_person')}</span>
                            <p>{organizationData.responsiblePerson}</p>
                        </div>
                        <div>
                            <span>{trans('identification_num')}</span>
                            <p>{organizationData.identificationNumber}</p>
                        </div>
                        <div>
                            <span>{trans('account_number')}</span>
                            <p>{organizationData.accountNumber}</p>
                        </div>

                        {/* <div>
                            <span>{trans('phone')}</span>
                            <p>{organizationData.mobile}</p>
                        </div> */}
                        {/* <div>
                            <span>{trans('history')}</span>
                            <Link to={"/locale"} >
                                <p>{organizationData.history}</p>
                            </Link>
                        </div> */}
                    </div>
                </div>
                {loading &&
                    <Space size="middle" className='loading'>
                        <Spin size="large" />
                    </Space>
                }
            </div>
            :
            <div>
                momxmarebeli ver moizebna
            </div>
    )
}

