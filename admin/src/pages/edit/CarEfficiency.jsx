import React, { useEffect, useState } from "react";
import { Row, Col, message, notification } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import ReactSpeedometer from "react-d3-speedometer";
import API from "../../utils/API";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import { useCurrentWidth } from "../../components/hooks/useCurrentWidth";
import useTranslation from "../../components/translation/useTranslation";





function CarEfficiency({ mainData }) {
  const { trans } = useTranslation();
  // const [loading, setLoading] = useState(false)

  let screenWidth = useCurrentWidth();
  const [axis, setAxis] = useState([]);
  const [fuelType, setFuelType] = useState(1);
  const [fuelTypes, setFuelTypes] = useState([]);
  // const [maniData, setMainData] = useState([])

  const [exhaustObj, setExhaustObj] = useState();

  const CustomizedLabel = (props) => {
    const { x, y, stroke, value } = props;

    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
        {value}
      </text>
    );
  };

  const handleApi = () => {
 
    API.get(`/get-requests-handler`, { params: { url: `/Common/fuelTypes` } })
      .then((res) => {
        setFuelTypes(res.data);
      })
      .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}));
  };

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

  const chartData = [
    {
      CO: mainData?.exhaustResult?.normalSpeedCo,
    },
    {
      CO: mainData?.exhaustResult?.highSpeedCo,
    },
  ];

  const setInitValues =()=>{
    setExhaustObj(mainData?.exhaustResult);
    setAxis(mainData?.brakeResult?.brakes);
    setFuelType(mainData?.exhaustResult?.type);
  }

  useEffect(() => {
    handleApi();
    setInitValues()
  }, [mainData]);

  return (
    <div className="car-efficiency">
      <div className="brake-result list-item">
        <div className="header">{trans('brake_result')}</div>
        {!mainData?.brakeResult?.brakes ? 
          <div className="table-header">{trans('data_not_found')}</div>
        :
          <div className="table">
            <div className="table-header">
              {trans('norms')}: მუშა მუხრუჭი {mainData?.serviceBrakesEfficiencyLimit}% სადგომი მუხრუჭი {mainData?.parkingBrakesEfficiencyLimit}% თვლებს შორის სხვაობა MAX {mainData?.differenceBetweenLegsLimit}%
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
                {axis?.map((item, index) => {
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
                        {item.type === 2 ?
                          item.axleEfficiency > mainData?.parkingBrakesEfficiencyLimit ?
                            <CheckOutlined />
                            :
                            <CloseOutlined />
                          : item.axleEfficiency > mainData?.serviceBrakesEfficiencyLimit ?
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
       {!exhaustObj?.exhausts ? 
          <div className="fuel-type">{trans('data_not_found')}</div>
       : <Row>
          <Col xs={24} className="fuel-type" onClick={()=> console.log(mainData)}>
            {trans('fuel_type')}: {fuelTypes[fuelType - 1]?.name} - {mainData?.vehicle?.catalycConverter ? "კატალიზატორით" : "კატალიზატორის გარეშე"} || ლიმიტი: დატვირთული: {mainData?.exhaustLimits?.highSpeedCoLevel}; თავისუფალი:{mainData?.exhaustLimits?.normalSpeedCoLevel} 
          </Col>
          <Col xs={24} className="data">
            <Row gutter={[32, 8]}>
              {exhaustObj?.exhausts?.map((data, index) => {
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
                          {/* <div className="data-item">
                            <div>კოეფიციენტი:</div>
                            <div>{index === 0 ? exhaustObj?.normalSpeedCo : exhaustObj?.highSpeedCo}</div>
                          </div> */}
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
                          {/* <div className="data-item">
                            <div>თავისუფალი ბრუნი:</div>
                            <div> {getRandomInt(650, 800)}</div>
                          </div> */}
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
    </div>
  );
}

export default CarEfficiency;
