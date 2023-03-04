import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import Tree from './Tree';
import { Button, notification, Space, Spin } from "antd"
import { UserContext } from '../contexts/UserContext'
import useTranslation from '../translation/useTranslation'
import AddProduct from "../modals/AddProduct"
import Chat from "../chat/Chat"
import {
    ClusterOutlined,
    HomeOutlined,
    FormOutlined,
    BankOutlined,
    SnippetsOutlined,
    FileDoneOutlined,
    BarsOutlined,
    CarryOutOutlined,
    AreaChartOutlined,
    MessageOutlined,
    SettingOutlined,
    VideoCameraOutlined,
    DatabaseOutlined,
    CloseOutlined
} from '@ant-design/icons';
import API from '../../utils/API';
import './styles.scss';


export default function Navbar({ sidebarOpen, setSidebarOpen }) {
    const [chatOpen, setChatOpen] = useState(false)
    const [openSidebarOnHover, setOpenSidebarOnHover] = useState('');
    const [loading, setLoading] = useState(false)
    const context = useContext(UserContext);

    const { trans } = useTranslation();
    let history = useHistory();
    const location = useLocation();

    const [addTransportIsOpen, setAddTransportIsOpen] = useState(false)

    const signOut = () => {
        localStorage.removeItem("token")
        window.location.replace("/login")
    }

    const checkMe = () => {
        // setLoading(true)
        // API.get(`/check-me`, {params:{token: localStorage.getItem("token")}})
        // .then((res) => {
        //     context.setUser(res.data)
        //     setLoading(false)
        // })
        // .catch((err) => {
        //     setLoading(false)
        //     notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"})
        //     if(err.response.status === 404) {
        //         signOut()
        //     }
        // });
    };

    useEffect(() => {
        checkMe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    const navItems = [
        {
            label: trans('home'),
            link: "/home",
            permission: "Permissions.VehicleApplication",
            icon: <HomeOutlined />,
            key: 1,
        },
        {
            label: trans('add_product'),
            permission: "Permissions.VehicleApplication.Add",
            icon: <FormOutlined />,
            action: setAddTransportIsOpen,
            type: "modal",
            key: 2
        },
        {
            label:'პროდუქტის სია',
            link: "/products",
            permission: "Permissions.VehicleApplication",
            icon: <FileDoneOutlined />,
            key: 3
        },
        {
            label: 'მაღაზიები',
            link: "/shops",
            permission: "Permissions.VehicleApplication",
            icon: <BarsOutlined />,
            key: 4
        },
        // {
        //     label: trans('invoices'),
        //     link: "/invoices",
        //     permission: "Permissions.Invoice",
        //     icon: <SnippetsOutlined />,
        //     key: 5
        // },
        // {
        //     label: trans('equipment_datas'),
        //     permission: "Permissions.Machine",
        //     icon: <DatabaseOutlined />,
        //     type: "multi",
        //     key: 6,
        //     children: [
        //         {
        //             label: trans('brakes'),
        //             link: "/brakes",
        //             key: 7
        //         },
        //         {
        //             label: trans('exhaust'),
        //             link: "/exhaust",
        //             key: 8
        //         },
        //     ]
        // },
        // {
        //     label: trans('cameras'),
        //     link: "/streaming",
        //     permission: "Permissions.Branch",
        //     icon: <VideoCameraOutlined />,
        //     key: 9
        // },
        // {
        //     label: trans('booking'),
        //     link: "/booking",
        //     permission: "Permissions.Booking",
        //     icon: <CarryOutOutlined />,
        //     key: 10
        // },
        // {
        //     label: trans('statistics'),
        //     link: "/statistics/general",
        //     permission: "Permissions.Report",
        //     icon: <AreaChartOutlined />,
        //     key: 11
        // },
        // {
        //     label: trans('hardware'),
        //     link: "/hardware",
        //     permission: "Permissions.Machine",
        //     icon: <SettingOutlined />,
        //     key: 12
        // },
        // {
        //     label: trans('organizations'),
        //     link: "/organization",
        //     permission: "Permissions.Company",
        //     icon: <BankOutlined />,
        //     key: 13
        // },
        // {
        //     label: trans("administer"),
        //     permission: "Permissions.User",
        //     icon: <DatabaseOutlined />,
        //     type: "multi",
        //     key: 15,
        //     children: [
        //         {
        //             label: trans('users'),
        //             link: "/users",
        //             key: 16

        //         },
        //         {
        //             label: trans('roles'),
        //             link: "/roles",
        //             key: 17

        //         },
        //         {
        //             label: trans('branch'),
        //             link: "/branch",
        //             key: 18
        //         },
        //     ]
        // },
    ]

    return (
        <>
            {/* <nav className={`sidebar shadow ${openSidebarOnHover} ${sidebarOpen ? 'open mobile-open' : ''}`} */}
            <nav className={`sidebar shadow ${sidebarOpen ? 'open mobile-open' : ''}`}>
                <div className="logo_content" onClick={() => {
                    history.push('/home');
                    setSidebarOpen(false);
                }
                }>

                    <div className="logo " >
                        <div >
                            <ClusterOutlined />
                            <div className="logo_name">
                                სამართავი პანელი
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="nav " role="menu">
                    {navItems.filter(x=> context.hasPermissions(x.permission))?.map((item, index) => {
                        return (
                            <React.Fragment key={item.key}>
                                { item.type === "multi" ?
                                    <Tree label={item.label} iconClass={item.icon} status={openSidebarOnHover}>
                                        {item.children?.map((child, childInd) => {
                                            return (
                                                <li className="nav-item child-wrapper" key={child.key} onClick={child.action} >
                                                    <Link className={`nav-link ${location.pathname === child.link ? 'active' : ""}`} to={child.link} onClick={() => setSidebarOpen(false)}>
                                                       {location.pathname === child.link ? (<div className='check-icon'>&#10004;</div>) : ""} <span>{child.label} </span>
                                                    </Link>
                                                </li>

                                            )
                                        })}
                                    </Tree>
                                    :   item.type === "modal" ?
                                        <li className="nav-item">
                                            <Link className={`nav-link`} to={location.pathname} onClick={item.action}>
                                                {item.icon}
                                                <span>{item.label}</span>
                                            </Link>
                                        </li>
                                        :
                                        <li className="nav-item">
                                            {item.link === "/notifications" ?
                                                <Link to={location.pathname} onClick={() => setChatOpen(true)} className={`nav-link`}>
                                                    {item.icon}
                                                    <span>{item.label}</span>
                                                </Link>
                                                :
                                                <Link className={`nav-link ${location.pathname === item.link ? 'active' : ""}`} to={item.link} onClick={() => setSidebarOpen(false)}>
                                                    {item.icon}
                                                    <span>{item.label}</span>
                                                </Link>
                                            }
                                        </li>

                                }
                            </React.Fragment>
                        )
                    })}
                </ul>
            </nav>
            {/* <Button className='chat-icon' onClick={() => setChatOpen(true)} icon={<MessageOutlined />}/> */}
            <AddProduct modalIsOpen={addTransportIsOpen} setModalIsOpen={setAddTransportIsOpen} rerender={()=> console.log("successfully add")} />
            {chatOpen ? <Chat handleClose={()=> setChatOpen(false)}>
                <Button onClick={() => setChatOpen(false)} shape="circle" icon={<CloseOutlined />} size={"large"} />
            </Chat> : ""}
            {loading &&
                <Space size="middle" className='loading'>
                    <Spin size="large" />
                </Space>
            }
        </>

    )
}

