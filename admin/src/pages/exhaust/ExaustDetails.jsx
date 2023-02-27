import React, { useEffect, useState } from "react";
import { Row, Col, Modal, message, notification } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList
} from "recharts";
import API from "../../utils/API"
import "./Exhaust.scss"
import useTranslation from "../../components/translation/useTranslation";


function ExaustDetails({ selectedId, detailsModalOpen, setDetailsModalOpen}) {
  const { trans } = useTranslation();


  const [fullData, setFullData] = useState({})
  const [fuelType, setfuelType] = useState(1)

  const getData = () => {
    setFullData({})
    API.get(`/get-requests-handler`, { params: { url: `/Exhaust/${selectedId}` } })
      .then((res) => {
        if(res.data.name === "Error"){
          message.error(res.data.message);
        }else {
          setFullData(res.data);
        }
      })
      .catch((err) => {
        notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"});
      })
  }

  const CustomizedLabel = (props) => {
    const { x, y, stroke, value } = props;
    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
        {value}
      </text>
    );
  };

  const chartData = [
    {
      CO: fullData.normalSpeedCo,
    },
    {
      CO: fullData.highSpeedCo,
    },
  ];

  useEffect(() => {
    getData()
  }, [detailsModalOpen])

  return (
    <Modal
      className="profile-modal"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      title={trans("exhaust_result")}
      visible={detailsModalOpen}
      onCancel={() => setDetailsModalOpen(false)}
      width={900}> 
      <div className="co-result ">
        <Row>
          {/* <Col xs={24} className="fuel-type">
            საწვავის ტიპი: დიზელი - კატალიზატორის გარეშე
          </Col> */}
          <Col xs={24} className="data">
            <Row gutter={[32, 8]}>
              {fullData?.exhausts?.map((data, index) => {
                return (
                  <Col flex="auto" key={index}>
                    {fuelType === 1 || fuelType === 5 ? (
                      <div className="data-wrapper">
                        <div className="data-header">ჩვენება N:{index + 1}</div>
                        <div className="data-container">
                          <div className="data-item">
                            <div>CO:</div>
                            <div>
                              {data.co}
                            </div>
                          </div>
                          <div className="data-item">
                            <div>
                              {index === 0 ? trans("loafer_the_move") : trans("with_high_torque")}:
                            </div>
                            <div> {data.speed}</div>
                          </div>
                        </div>
                      </div>
                    ) : fuelType === 2 ? (
                      <div className="data-wrapper">
                        <div className="data-header">ჩვენება N:{index + 1}</div>
                        <div className="data-container">
                          <div className="data-item">
                            <div>{trans("coefficient")}:</div>
                            <div>
                              {data.co}
                            </div>
                          </div>
                          <div className="data-item">
                            <div>{trans("with_high_torque")}:</div>
                            <div> {data.speed}</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </Col>
                );
              })}
            </Row>
          </Col>
           <Col xs={24} className="chart-item">
            <LineChart
              width={1000}
              height={300}
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" height={60} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="CO" stroke="#8884d8">
                <LabelList content={<CustomizedLabel />} />
              </Line>
              {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
          </Col>
        </Row>
      </div>
    </Modal>
  )
}

export default ExaustDetails