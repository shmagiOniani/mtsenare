import React, { useEffect, useState } from "react";
import { Image, Row, Col } from "antd";
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
import "./CarDetails.scss"
import { useCurrentWidth } from "../../components/hooks/useCurrentWidth";
import useTranslation from "../../components/translation/useTranslation";

const photos = [
  "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
];

const TechnicalData = ({ data, details, selectedId }) => {
  let screenWidth = useCurrentWidth();
  const [axis, setAxis] = useState([]);
  const { trans } = useTranslation();
  const [fuelType, setFuelType] = useState(1)

  const CustomizedLabel = (props) => {
    const { x, y, stroke, value } = props;
    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
        {value}
      </text>
    );
  };


  useEffect(() => {
    setAxis(data?.brakeResult?.brakes);
    setFuelType(data?.exhaustResult?.type);
  }, []);

  const identificationData = [
    {
      name: "სარეგ. ნომერი",
      value: data?.vehicle?.plateNumber.toUpperCase(),
    },
    {
      name: "მარკა",
      value: data?.vehicle?.mark,
    },
    {
      name: "მოდელი",
      value: data?.vehicle?.model,
    },
    {
      name: "ტესტირების თარიღი",
      value: data?.vehicle?.registrationDate
    },
  ];
  const speedometerCahrts = [
    {
      name: "ღერძი 1 ეფექტურობა",
      range: parseInt(data?.serviceBrakesEfficiencyLimit),
      value: parseInt(data?.brakeResult?.brakes[0].axleEfficiency),
      color: ["#e9e9e9", "#52c41a"],
    },
    {
      name: "ღერძი 2 ეფექტურობა",
      range: parseInt(data?.serviceBrakesEfficiencyLimit),
      value: parseInt(data?.brakeResult?.brakes[1].axleEfficiency),
      color: ["#e9e9e9", "#52c41a"],
    },
    {
      name: "სადგომი მუხრუჭი",
      range: parseInt(data?.parkingBrakesEfficiencyLimit),
      value: parseInt(data?.brakeResult?.brakes[2].axleEfficiency),
      color: ["#e9e9e9", "#52c41a"],
    },
    {
      name: "| ღერძის სხვაობა",
      range: parseInt(data?.differenceBetweenLegsLimit),
      value: parseInt(data?.brakeResult?.brakes[0].differenceBetweenLegs),
      color: ["#52c41a", "#e9e9e9"],
    },
    {
      name: "|| ღერძის სხვაობა",
      range: parseInt(data?.differenceBetweenLegsLimit),
      value: parseInt(data?.brakeResult?.brakes[1].differenceBetweenLegs),
      color: ["#52c41a", "#e9e9e9"],
    },
    {
      name: "ჯამური",
      range: parseInt(data?.serviceBrakesEfficiencyLimit),
      value: parseInt(data?.brakeResult?.serviceBrakesEfficiency),
      color: ["#e9e9e9", "#52c41a"],
    },
  ];
  const testResults = [
    {
      name: "სს-ს იდენტიფიკაცია",
      value: details?.ssIdentificationPassed,
    },
    {
      name: "სამუხრუჭო მოწყობილობა",
      value: details?.brakeDevicePassed,
    },
    {
      name: "საჭით მართვის სისტემა",
      value: details?.wheelControlSystemPassed,
    },
    {
      name: "ხილვადობა",
      value: details?.visibilityPassed,
    },
    {
      name: "ფარები, შუქამრეკლები",
      value: details?.headlightsAndReflectivePassed,
    },
    {
      name: "ღერძები, თვლები, საბურავები",
      value: details?.wheelsAndTiresPassed,
    },
    {
      name: "შასი და შემადგენლები",
      value: details?.chassisAndComponentPassed,
    },
    {
      name: "სხვა მოწყობილობები",
      value: details?.otherDevicesPassed,
    },
    {
      name: "უარყოფითი ზემოქმედება",
      value: details?.negativeImpactsPassed,
    },
    {
      name: "დამატებითი ინსპექტირება",
      value: details?.additionalInspectionPassed,
    },
  ];
  const chartData = [
    {
      CO: data?.exhaustResult?.normalSpeedCo,
    },
    {
      CO: data?.exhaustResult?.highSpeedCo,
    },
  ];

  return (
    <div className="technical-data">
      <div className="identification list-item">
        <div className="header">იდენტიფიკაცია</div>
        <Row className="images">
          {photos?.map((photo, index) => {
            return (
              <div className="photo-item" key={index}>
                <Image width={150}

                  src={photo}
                  fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg==" />
              </div>
            );
          })}
        </Row>
        <Row className="desc">
          {identificationData.length < 1 ? "" : identificationData?.map((data, index) => {
            return (
              <Col
                xs={24}
                sm={12}
                lg={6}
                key={index} className="data-item ">
                <div>{data.name}</div>
                <div>{data.value}</div>
              </Col>
            );
          })}
        </Row>
      </div>
      <div className="test-result list-item">
        <div className="header">ტესტის შედეგები</div>
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
        <div className="header">მუხრუჭების ჩვენება</div>
        {!data?.brakeResult ? <h3 className="data-error">მუხრუჭები ვერ მოიძებნა</h3> : <>   <div className="table-header">
          ნორმები: მუშა მუხრუჭი 50% სადგომი მუხრუჭი 16% თვლებს შორის სხვაობა MAX
          30%
        </div>
          <div className="table">
            <table style={{ width: "100%" }}>
              <thead>

                <tr>
                  <th>ღერძი</th>
                  <th colSpan={6}>მიღებული შედეგები </th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <td></td>
                  {screenWidth > 640 && <td>მარჯვენა</td>}
                  {screenWidth > 640 && <td>მარცხენა </td>}
                  <td>ეფექტ</td>
                  <td>სხვაობა</td>
                  <td>წონა</td>
                  <td>{trans("result")}</td>
                </tr>
                {data?.brakeResult?.brakes?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {item.type === 2
                          ? "სადგომი მუხრუჭი"
                          : `ღერძი ${index + 1}`}
                      </td>
                      {screenWidth > 640 && <td>{item.rightAxlePower}kN</td>}
                      {screenWidth > 640 && <td>{item.leftAxlePower}kN</td>}
                      <td>{item.axleEfficiency}%</td>
                      <td>{item.type === 1 && `${item.differenceBetweenLegs} %`}</td>
                      <td>{item.leftAxleWeight + item.rightAxleWeight}კგ</td>
                      <td>
                        {item.type === 2 ?
                          item.axleEfficiency >= data?.parkingBrakesEfficiencyLimit ?
                            <CheckOutlined />
                            :
                            <CloseOutlined />
                          : item.axleEfficiency > data?.serviceBrakesEfficiencyLimit ?
                            item?.differenceBetweenLegs < data?.differenceBetweenLegsLimit ?
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
                  <td>საერთო ეფექტურობა</td>
                  <td className="txt-center" colSpan={screenWidth > 640 ? 5 : 3}>
                    {data?.brakeResult?.serviceBrakesEfficiency}% (ნორმა: {data?.serviceBrakesEfficiencyLimit}%)
                  </td>
                  <td>
                    {data?.brakeResult?.serviceBrakesEfficiency > data?.serviceBrakesEfficiencyLimit ?
                      <CheckOutlined />
                      :
                      <CloseOutlined />
                    }
                  </td>
                </tr>
                <tr>
                  <td>საერთო ეფექტურობა (სადგომი მუხრუჭი)</td>
                  <td className="txt-center" colSpan={screenWidth > 640 ? 5 : 3}>
                    {data?.brakeResult?.parkingBrakesEfficiency}% (ნორმა: {data?.parkingBrakesEfficiencyLimit}%)
                  </td>
                  <td>
                    {data?.brakeResult?.parkingBrakesEfficiency > data?.parkingBrakesEfficiencyLimit ?
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
                      <td colSpan={2}>მარჯვენა</td>
                      <td colSpan={2}>მარცხენა </td>
                    </tr>

                    {axis?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {index === axis.length - 1
                              ? "სადგომი მუხრუჭი"
                              : `ღერძი ${index + 1}`}
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
          <Row className="charts" gutter={[32, 32]}>
            {speedometerCahrts?.map((chart, index) => {
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
                    value={parseInt(chart.value)}
                  />
                </Col>
              );
            })}
          </Row>
        </>}
      </div>
      <div className="co-result list-item">
        <div className="header">გამონაბოლქვის ჩვენება</div>
        {!data?.exhaustResult ? <h3 className="data-error">მონაცემები ვერ მოიძებნა</h3>  :
        <Row>
          <Col xs={24} className="fuel-type">
            საწვავის ტიპი: დიზელი - კატალიზატორის გარეშე
          </Col>
          <Col xs={24} className="data">
            <Row gutter={[32, 8]}>
              {data?.exhaustResult?.exhausts?.map((data, index) => {
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
                              {index === 0 ? "თავისუფალი" : trans("loaded")} ბრუნი:
                            </div>
                            <div> {data.speed}</div>
                          </div>
                        </div>
                      </div>
                    ) : fuelType === 2 ? (
                      <div className="data-wrapper">
                        <div className="data-header">ჩვენება N:{index + 1}</div>
                        <div className="data-container">
                          {/* <div className="data-item">
                            <div>კოეფიციენტი:</div>
                            <div>{index === 0 ? exhaustObj?.normalSpeedCo : exhaustObj?.highSpeedCo}</div>
                          </div> */}
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
            <Row >
              <Col flex="auto">
                ლამბდა: 0.009899999999999999
              </Col>
              <Col flex={"auto"} className="txt-center" >
                {trans("result")}: <CheckOutlined />
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
            }
      </div>
    </div>
  );
}

export default TechnicalData;
