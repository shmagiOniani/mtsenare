import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../contexts/UserContext';
import useTranslation from '../translation/useTranslation';
import { Button, Dropdown, Menu, Modal, Row, Col, Avatar, notification, Badge } from 'antd';
import { MenuOutlined, IdcardOutlined, LogoutOutlined, SearchOutlined, SettingOutlined, AlignLeftOutlined, MailOutlined, BellOutlined } from '@ant-design/icons';
import './header-styles.scss'
import API from '../../utils/API';


const Header = ({ sidebarOpen, setSidebarOpen }) => {
    const context = useContext(UserContext);
    const { trans } = useTranslation();
    const [profileModalOpen, setProfileModalOpen] = useState(false)
    const [themeColor, setThemeColor] = useState("")
    const [branches, setBranches] = useState()
    const [companies, setCompanies] = useState()

    const signOut = () => {
        localStorage.removeItem("token")
        window.location.replace("/login")
    }

    const getBranches = () => {
        // if (context.hasPermissions("Permissions.Branch")) {
        //     API.get(`/get-requests-handler`, { params: { url: `/Company/branches`, params: {} } })
        //         .then(res => {
        //             setBranches(res.data)
        //         })
        //         .catch(err => notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" }))
        // }
    }

    const getCompanies = () => {
        if (context.hasPermissions("Permissions.Branch")) {

            // API.get(`/get-requests-handler`, { params: { url: `/Company`, params: {} } })
            //     .then(res => {
            //         setCompanies(res.data)
            //     })
            //     .catch(err => notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" }))
        }
    }

    const noteMenu = (
        <Menu className='header-dropdown'>
            <div className="nav-header">
                <div>You Have Notification</div>
                <div className='count-badge'>3</div>
            </div>
            <Menu.Item className="nav-item">
                <div onClick={() => setProfileModalOpen(true)} className="nav-link">
                    <IdcardOutlined />
                    <div>
                        <span>New review recived</span>
                        <span>1 week ago</span>
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item className="nav-item">
                <div onClick={() => setProfileModalOpen(true)} className="nav-link">
                    <IdcardOutlined />
                    <div>
                        <span>New mails recived</span>
                        <span>1 week ago</span>
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item className="nav-item">
                <div onClick={() => setProfileModalOpen(true)} className="nav-link">
                    <IdcardOutlined />
                    <div>
                        <span>New order recived</span>
                        <span>1 week ago</span>
                    </div>
                </div>
            </Menu.Item>
        </Menu>
    );

    const menu = (
        <Menu className='header-dropdown'>
            <Menu.Item className="nav-item">
                <div onClick={() => setProfileModalOpen(true)} className="nav-link">
                    <IdcardOutlined />
                    <span>{trans('profile')}</span>
                </div>
            </Menu.Item>
            <Menu.Item className="nav-item">
                <div onClick={signOut} className="nav-link">
                    <LogoutOutlined />
                    <span>{trans('logout')}</span>
                </div>
            </Menu.Item>
        </Menu>
    );

    useEffect(() => {
        if (themeColor?.length > 0) {
            document.documentElement.style.setProperty('--app-primaryColor', localStorage.getItem("color"))
            localStorage.setItem("color", themeColor)
        }
    }, [themeColor])

    useEffect(() => {
        setThemeColor(localStorage.getItem("color"))
        getBranches()
        getCompanies()
    }, [])

    return (

        <header>
            <nav className={`navbar ${sidebarOpen === true ? 'paddingleft' : ''}`}
            >
                {/* {context.hasPermissions("Permissions.Exhaust") && <Button className="circle-btn" type="primary" icon={<AlignLeftOutlined />} onClick={() => {
                    sidebarOpen === true ?
                        setSidebarOpen(false) :
                        setSidebarOpen(true)
                }} />} */}
                <div onClick={() => console.log(context?.user)}>.</div>

                <ul className="navbar-nav">
                    <li className="dropdown ">
                        <Dropdown overlay={noteMenu} placement="bottomLeft" arrow>
                            <Badge dot={true} color={'#09ad95'} className="badge green-badge">
                                <Button className='circle-btn' shape="circle" icon={<BellOutlined />} size="large" />
                            </Badge>
                        </Dropdown>
                    </li>
                    <li className="dropdown ">
                        <Dropdown overlay={menu} placement="bottomLeft" arrow>
                            <Badge dot={true} className="badge red-badge">
                                <Button className='circle-btn' shape="circle" icon={<MailOutlined />} size="large" />
                            </Badge>
                        </Dropdown>
                    </li>
                    <li className="dropdown ">
                        <Dropdown overlay={menu} placement
                            ="bottomLeft" arrow>
                            <Avatar size={40} className='dropdown-toggle' src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        </Dropdown>
                    </li>
                    <li className="dropdown ">
                        <Dropdown overlay={menu} placement="bottomLeft" arrow>

                            <Button className='circle-btn' shape="circle" icon={<MenuOutlined />} size="large" />

                        </Dropdown>
                    </li>
                    <li className="dropdown ">
                        <Dropdown overlay={menu} placement="bottomLeft" arrow>
                            <Button className='circle-btn' shape="circle animate-rotation" icon={<SettingOutlined />} size="large" />
                        </Dropdown>
                    </li>
                </ul>
            </nav>
            <Modal
                className="profile-modal"
                cancelButtonProps={{ style: { display: "none" } }}
                okButtonProps={{ style: { display: "none" } }}
                title={trans("profile")}
                visible={profileModalOpen}
                onCancel={() => setProfileModalOpen(false)}
                width={400}
            >
                <Row gutter={[30, 15]}>
                    <Col xs={24}><span>{trans("name")} :</span> <span>{context?.user?.username}</span></Col>
                    <Col xs={24}><span>{trans("role")} :</span> <span>{context?.user?.role}</span></Col>
                    <Col xs={24}><span>{trans("company")} :</span> <span>{companies?.find(company => company?.id === context?.user?.companyId)?.name || trans("can_not_find_company")}</span></Col>
                    <Col xs={24}><span>{trans("branch")} : </span><span>{branches?.find(branch => branch?.id === context?.user?.branchId)?.name || trans("can_not_find_branch")}</span></Col>
                </Row>
            </Modal>
        </header>
    )
}
export default Header