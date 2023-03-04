import React, { useState, useContext } from 'react'
import { Button, Row, Col, Card } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import API from '../../utils/API';
import useTranslation from '../../components/translation/useTranslation';
import Chat from '../../components/chat/Chat';
import { UserContext } from '../../components/contexts/UserContext'
import ReactApexChart from "react-apexcharts";
import "./home.scss";


export default function Home() {
    const context = useContext(UserContext);
    const { trans } = useTranslation();

    const [chatOpen, setChatOpen] = useState(false)

    return (
        <div className="content-wrapper home-wrapper">
            <Row gutter={[32, 32]}>
                <Col id='a' xs={16}>
                  <Row gutter={[10, 10]}>
                    <Col xs={24}>
                      <div className='home-list'>
                        
                      </div>

                    </Col>
                    <Col xs={24}>
                      <div className='home-list'>
                        
                      </div>

                    </Col>
                  </Row>
                </Col>
                <Col id='b' xs={8}  className="home-chart">
                   
                </Col>
                <Col id='c' xs={24} >
                    <div className='home-list'>

                    </div>
                </Col>
            </Row>
            {chatOpen ? <Chat handleClose={()=> setChatOpen(false)}>
                <Button onClick={() => setChatOpen(false)} shape="circle" icon={<CloseOutlined />} size={"large"} />
            </Chat> : ""}
        </div>
    )
}
