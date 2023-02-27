import React, { useEffect, useState } from "react";
import { Image, Row, Col, notification, Space, Spin  } from "antd";
import { CheckOutlined, InfoCircleOutlined, CloseOutlined } from "@ant-design/icons";
import ReactSpeedometer from "react-d3-speedometer";
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
import { useCurrentWidth } from "../../components/hooks/useCurrentWidth";
import useTranslation from "../../components/translation/useTranslation";
import API from "../../utils/API";
import { useParams } from "react-router-dom";
import "../carDetails/CarDetails.scss";

const CarLastInspection = () => {
  let screenWidth = useCurrentWidth();
  const { trans } = useTranslation();
  const { id } = useParams();

  const [axis, setAxis] = useState([]);
  const [fuelType, setFuelType] = useState(1)
  const [mainData, setMainData] = useState([])
  const [exhaustObj, setExhaustObj] = useState();
  const [fuelTypes, setFuelTypes] = useState([]);


  const CustomizedLabel = (props) => {
    const { x, y, stroke, value } = props;
    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
        {value}
      </text>
    );
  };

  const getFuelTypes = () => {
    API.get(`/get-requests-handler`, { params: { url: `/Common/fuelTypes` } })
      .then((res) => {
        setFuelTypes(res.data);
      })
      .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}));
  };

  const getLastInspectionData= () => {
    API.get(`/get-requests-handler`, { params: { url: `/VehicleApplication/${id}/lastInspection` } })
    .then((res) => setMainData(res?.data ))
    .catch((err) => console.log(err));
  }

  const setInitValues =()=>{
    setExhaustObj(mainData?.exhaustResult);
    setAxis(mainData?.brakeResult?.brakes);
    setFuelType(mainData?.exhaustResult?.type);
  }


  useEffect(() => {
    getFuelTypes();
    setInitValues();
    getLastInspectionData()
    // setAxis(data?.brakeResult?.brakes);
    // setFuelType(data?.exhaustResult?.type);
  }, []);

  const identificationData = [
    {
      name: trans("plate_number"),
      value: mainData?.plateNumber?.toUpperCase(),
    },
    {
      name: trans("mark"),
      value: mainData?.mark,
    },
    {
      name: trans("model"),
      value: mainData?.model,
    },
    {
      name: trans("inspection_date"),
      value: mainData?.registrationDate
    },
  ];
  const speedometerCharts = [
    {
      name: `${trans('axis')} 1 ${trans('efficiency')}`,
      range: parseInt(mainData?.serviceBrakesEfficiencyLimit),
      value: parseInt(mainData?.brakeResult?.brakes[0]?.axleEfficiency),
      color: ["#e9e9e9", "#52c41a"],
    },
    {
      name: `${trans('axis')} 2 ${trans('efficiency')}`,
      range: parseInt(mainData?.serviceBrakesEfficiencyLimit),
      value: parseInt(mainData?.brakeResult?.brakes[1]?.axleEfficiency),
      color: ["#e9e9e9", "#52c41a"],
    },
    {
      name: trans('parking_brake'),
      range: parseInt(mainData?.parkingBrakesEfficiencyLimit),
      value: parseInt(mainData?.brakeResult?.brakes[2]?.axleEfficiency),
      color: ["#e9e9e9", "#52c41a"],
    },
    {
      name: `| ${trans('difference_between_axes')}`,
      range: parseInt(mainData?.differenceBetweenLegsLimit),
      value: parseInt(mainData?.brakeResult?.brakes[0]?.differenceBetweenLegs),
      color: ["#52c41a", "#e9e9e9"],
    },
    {
      name: `|| ${trans('difference_between_axes')}`,
      range: parseInt(mainData?.differenceBetweenLegsLimit),
      value: parseInt(mainData?.brakeResult?.brakes[1]?.differenceBetweenLegs),
      color: ["#52c41a", "#e9e9e9"],
    },
    {
      name: trans('total'),
      range: parseInt(mainData?.serviceBrakesEfficiencyLimit),
      value: parseInt(mainData?.brakeResult?.serviceBrakesEfficiency),
      color: ["#e9e9e9", "#52c41a"],
    },
  ];
  const testResults = [
    {
      name: trans("vehicle_identification"),
      value: mainData?.ssIdentificationPassed,
    },
    {
      name: trans("braking_device"),
      value: mainData?.brakeDevicePassed,
    },
    {
      name: trans("steering_system"),
      value: mainData?.wheelControlSystemPassed,
    },
    {
      name: trans("visibility"),
      value: mainData?.visibilityPassed,
    },
    {
      name: trans("headlights_beam_deflectors"),
      value: mainData?.headlightsAndReflectivePassed,
    },
    {
      name: trans("axes_wheels_tires"),
      value: mainData?.wheelsAndTiresPassed,
    },
    {
      name: trans("chassis_and_components"),
      value: mainData?.chassisAndComponentPassed,
    },
    {
      name: trans("other_devices"),
      value: mainData?.otherDevicesPassed,
    },
    {
      name: trans("negative_impact"),
      value: mainData?.negativeImpactsPassed,
    },
    {
      name: trans("additional_requirements"),
      value: mainData?.additionalInspectionPassed,
    },
  ];
  const chartData = [
    {
      CO: mainData?.exhaustResult?.normalSpeedCo,
    },
    {
      CO: mainData?.exhaustResult?.highSpeedCo,
    },
  ];

  const photoArr = [
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  ]

  return (
    <div className="technical-data" onClick={()=> console.log(mainData)}>
      <div className="identification list-item">
        <div className="header">{trans("identification")}</div>
        <Row className="desc">
          {identificationData?.length < 1 ? "" : identificationData?.map((item, index) => {
            return (
              <Col
                xs={24}
                sm={12}
                lg={6}
                key={index} className="data-item ">
                <div>{item?.name}</div>
                <div>{item?.value}</div>
              </Col>
            );
          })}
        </Row>
        <Row className="images">
          {photoArr?.map((photo, index) => {
            return (
              <div className="photo-item" key={index}>
                <Image 
                  width={150}
                  src={photo}
                  fallback="data:image/png;base64,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"/>
              </div>
            );
          })}
        </Row>
      </div>
      <div className="test-result list-item">
        <div className="header">{trans("test_result")}</div>
        <Row className="result-container" gutter={[32, 8]}>
          {testResults?.map((test, index) => {
            return (
              <Col
                xs={24}
                sm={12}
                key={index}
                className={`data-item ${test.value ? "success" : "fail"}`}
              >
                {test.name}{test.value ? <CheckOutlined /> : <InfoCircleOutlined />}
              </Col>
            );
          })}
        </Row>
      </div>
      <div className="brake-result list-item">
        <div className="header">{trans('brake_result')}</div>
        {!mainData?.brakeResult?.brakes?.[0] ? 
          <div className="table-header">{trans('data_not_found')}</div>
        :
          <div className="table">
            <div className="table-header">
              {trans('norms')}: {trans("working_brake")} {mainData?.serviceBrakesEfficiencyLimit}% {trans("parking_brake")} {mainData?.parkingBrakesEfficiencyLimit}% {trans("difference_between_axes")} MAX {mainData?.differenceBetweenLegsLimit}%
            </div>
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>{trans('axis')}</th>
                  <th colSpan={6} >{trans('final_results')} </th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <td></td>
                  {screenWidth > 640 && <td>{trans('right')}</td>}
                  {screenWidth > 640 && <td>{trans('left')} </td>}
                  <td>{trans('effective')}</td>
                  <td>{trans('difference')}</td>
                  <td>{trans('weight')}</td>
                  <td>{trans('result')}</td>
                </tr>
                {mainData?.brakeResult?.brakes?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {item.type === 2
                          ? trans('parking_brake')
                          : `${trans('axis')} ${index + 1}`}
                      </td>
                      {screenWidth > 640 && <td>{item.rightAxlePower}kN</td>}
                      {screenWidth > 640 && <td>{item.leftAxlePower}kN</td>}
                      <td>{item.axleEfficiency}%</td>
                      <td>{item.type === 1 && `${item?.differenceBetweenLegs} %`}</td>
                      <td>{item.leftAxleWeight + item.rightAxleWeight}{trans('kg')}</td>
                      <td>
                        {item?.type === 2 ?
                          item.axleEfficiency > mainData?.parkingBrakesEfficiencyLimit ?
                            <CheckOutlined />
                            :
                            <CloseOutlined />
                          : item?.axleEfficiency > mainData?.serviceBrakesEfficiencyLimit ?
                            item?.differenceBetweenLegs < mainData?.differenceBetweenLegsLimit ?
                              <CheckOutlined />
                              :
                              <CloseOutlined />
                            :
                            <CloseOutlined />
                        }
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td>{trans('overall_efficiency')}</td>
                  <td className="txt-center" colSpan={screenWidth > 640 ? 5 : 3}>
                    {mainData?.brakeResult?.serviceBrakesEfficiency}% ({trans('norm')}: {mainData?.serviceBrakesEfficiencyLimit}%)
                  </td>
                  <td>
                    {mainData?.brakeResult?.serviceBrakesEfficiency > mainData?.serviceBrakesEfficiencyLimit ?
                      <CheckOutlined />
                      :
                      <CloseOutlined />
                    }
                  </td>
                </tr>
                <tr>
                  <td>{trans('overall_efficiency')} ({trans('parking_brake')})</td>
                  <td className="txt-center" colSpan={screenWidth > 640 ? 5 : 3}>
                    {mainData?.brakeResult?.parkingBrakesEfficiency}% ({trans('norm')}: {mainData?.parkingBrakesEfficiencyLimit}%)
                  </td>
                  <td>
                    {mainData?.brakeResult?.parkingBrakesEfficiency > mainData?.parkingBrakesEfficiencyLimit ?
                      <CheckOutlined />
                      :
                      <CloseOutlined />
                    }
                  </td>
                </tr>

                {screenWidth < 640 && (
                  <>
                    <tr>
                      <td></td>
                      <td colSpan={2}>{trans('right')}</td>
                      <td colSpan={2}>{trans('left')} </td>
                    </tr>

                    {axis?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {index === axis.length - 1
                              ? trans('parking_brake')
                              : `${trans('axis')} ${index + 1}`}
                          </td>
                          <td colSpan={2}>{item.rightAxlePower}kN</td>
                          <td colSpan={2}>{item.leftAxlePower}kN</td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>

            </table>
          </div>
        }
        <Row className="charts" gutter={[32, 32]}>
          {speedometerCharts[0].value ? speedometerCharts?.map((chart, index) => {
            return (
              <Col xs={24} sm={12} lg={6} xl={6} xxl={4} key={index}>
                <p className="chart-header">{chart.name}</p>
                <ReactSpeedometer
                  forceRender={true}
                  needleHeightRatio={0.9}
                  needleColor={"black"}
                  needleTransition={"easeCircleInOut"}
                  maxSegmentLabels={2}
                  segments={2}
                  customSegmentStops={[0, parseInt(chart.range), 100]}
                  minValue={0}
                  maxValue={100}
                  segmentColors={chart.color}
                  value={parseInt((chart.value))}
                />
              </Col>
            );
          }) : ""}
        </Row>
      </div>
      <div className="co-result list-item">
        <div className="header">{trans('exhaust_result')}</div>
       {!mainData?.exhaustResult?.exhausts?.[0] ? 
          <div className="table-header">{trans('data_not_found')}</div>
       : <Row>
          <Col xs={24} className="fuel-type" >
            {trans('fuel_type')}: {fuelTypes[fuelType - 1]?.name} - {mainData?.vehicle?.catalycConverter ? trans("with_catalyst") : trans("without_catalyst")} || {trans("limit")}: {trans("loaded")}: {mainData?.exhaustLimits?.highSpeedCoLevel}; {trans("loafer_the_move")}:{mainData?.exhaustLimits?.normalSpeedCoLevel} 
          </Col>
          <Col xs={24} className="data">
            <Row gutter={[32, 8]}>
              {mainData?.exhaustResult?.exhausts?.map((data, index) => {
                return (
                  <Col flex="auto" key={index}>
                    {fuelType === 1 || fuelType === 5 ? (
                      <div className="data-wrapper">
                        <div className="data-header">{trans('value')} N:{index + 1}</div>
                        <div className="data-container">
                          <div className="data-item">
                            <div>CO:</div>
                            <div>
                              {data.co}
                            </div>
                          </div>
                          <div className="data-item">
                            <div>
                              {index === 0 ? trans('loafer_the_move') : trans('loaded_torque')} :
                            </div>
                            <div> {data.speed}</div>
                          </div>
                        </div>
                      </div>
                    ) : fuelType === 2 ? (
                      <div className="data-wrapper">
                        <div className="data-header">{trans('value')} N:{index + 1}</div>
                        <div className="data-container">
                          <div className="data-item">
                            <div>{trans('coefficient')}:</div>
                            <div>
                              {data.co}
                            </div>
                          </div>
                          <div className="data-item">
                            <div>{trans("with_high_torque")}: </div>
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
          <Col xs={24} className="result-item">
            <Row>
              <Col flex="auto" className="lambda">
                {trans('lambda')}: {exhaustObj?.lambda}
              </Col>
              <Col flex={"auto"} className="result">
               {trans("result")}:{exhaustObj?.highSpeedCo} <CheckOutlined />
              </Col>
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
                bottom: 10,
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
        </Row>}
      </div>
      <div className="defects list-item">
        <div className="header">{trans('defects_found')}</div>
       {!mainData?.rejectedDetails?.[0] ? 
          <div className="table-header">{trans('data_not_found')}</div>
       : <Row>
          <Col xs={24} className="fuel-type" >

            {mainData?.rejectedDetails?.map((item, ind)=> {
              return ( 
           <div key={ind} className="rejected-container">
            <div className="no">{item?.paragraph} .</div>
            <div className="rejected-name">{item?.rejectedDetailName}</div>
           </div>
           )})}
          </Col>
        </Row>}
      </div>
    </div>
  );
}

export default CarLastInspection;
