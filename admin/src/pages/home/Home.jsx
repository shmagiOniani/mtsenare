import React, { useState, useContext } from 'react'
import { Button, Row, Col, Card } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import API from '../../utils/API';
import useTranslation from '../../components/translation/useTranslation';
import Chat from '../../components/chat/Chat';
import { UserContext } from '../../components/contexts/UserContext'
import ReactApexChart from "react-apexcharts";
import "./home.scss";

const fakeData = {
    options: {
      stroke: {
        curve: "smooth"
      },
      fill: {
        type: "solid",
        opacity: [0.35, 1]
      },
      labels: [
        "Dec 01",
        "Dec 02",
        "Dec 03",
        "Dec 04",
        "Dec 05",
        "Dec 06",
        "Dec 07",
        "Dec 08",
        "Dec 09 ",
        "Dec 10",
        "Dec 11"
      ],
      markers: {
        size: 0
      },
      yaxis: [
        {
          title: {
            text: "Series A"
          }
        },
        {
          opposite: true,
          title: {
            text: "Series B"
          }
        }
      ],
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function(y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
          }
        }
      }
    },
    series: [
      {
        name: "TEAM A",
        type: "area",
        data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33]
      },
      {
        name: "TEAM B",
        type: "line",
        data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43]
      }
    ]
  };

export default function Home() {
    const context = useContext(UserContext);
    const { trans } = useTranslation();

    const [chatOpen, setChatOpen] = useState(false)

    return (
        <div className="content-wrapper home-wrapper">
            <Row gutter={[10, 10]}>
                <Col id='a' xs={24} sm={12} md={12} xl={6}>
                    <div className='pti-list'>
                       
                    </div>
                </Col>
                <Col id='b' xs={24} sm={24} md={24} xl={12}>
                    {/* <div className='pti-list'> </div> */}
                    <Card title="Line Area Combo Chart">
                        <ReactApexChart
                        options={fakeData.options}
                        series={fakeData.series}
                        type="line"
                        height="350"
                        />
                    </Card>
                </Col>
                <Col id='c' xs={24} sm={12} md={12} xl={6}>
                    <div className='pti-list'>

                    </div>
                </Col>
            </Row>
            {chatOpen ? <Chat handleClose={()=> setChatOpen(false)}>
                <Button onClick={() => setChatOpen(false)} shape="circle" icon={<CloseOutlined />} size={"large"} />
            </Chat> : ""}
        </div>
    )
}
