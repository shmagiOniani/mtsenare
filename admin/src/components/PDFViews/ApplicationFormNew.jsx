import { Col, Row } from "antd";
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "./mtavruli-bold.js"
import "./mrgvlovani-normal.js"
import logoOne from "../../images/form-logo-1.png"
import logoTwo from "../../images/form-logo-2.jpeg"
import translations from '../translation/translation.json';
import "./style.scss";

// Create Document Component
function ApplicationForm({ id, handleClose, data, language }) {
 
  const trans = (text) => {
    return translations?.[language]?.[text];
  };
  
  const [fuelType, setFuelType] = useState(1);

  const printPDF = () => {
    const doc = new jsPDF("p", "pt", "a4"); // default values
    doc.addImage(
      logoOne,
      "JPEG",
      30,
      30,
      12 * 2.83,
      12 * 2.83
    );

    doc.setFont('mrgvlovani');
    doc.setFontSize(9);
    doc.text(
      `პერიოდული ტექნიკური ინსპექტირების ანგარიში N: ${data?.uniqueId}`,
      105 * 2.83,
      13 * 2.83,
      null,
      null,
      "center"
    );
    doc.setFontSize(6);
    doc.text(
      `ასს-ს პერიოდული ტექნიკური ინსპექტირების ცენტრი შ.პ.ს ქვიქტესტი ქ.თბილისი, ჯ.ბალანჩინის N36`,
      105 * 2.83,
      17 * 2.83,
      null,
      null,
      "center"
    );
    doc.text(
      'www.quicktest.ge - 032 2 48 00 42',
      105 * 2.83,
      20 * 2.83,
      null,
      null,
      "center"
    );

    doc.addImage(
      logoTwo,
      "JPEG",
      520,
      30,
      12 * 2.83,
      12 * 2.83
    );

    
    //      jsPDF, x , y , width, height, title height 
    keyValue(doc, 30, 70, 530, 30, 15, 'პერიოდული ტექნიკური ინსპექტირების ცენტრის აკრედიტაციის მოწმობის ნომერი')
    

    let yDetailsStart = 60 ;
    ptiDetails.map((item, ind)=> {
      if(ind%5 === 0){
        yDetailsStart += 50
      }
      return keyValue(doc, item.xLocation, yDetailsStart, 100, 40, 25, item.name, item.value)
    })

    doc.setDrawColor(187, 187, 187);
    doc.line(30, 315, 560, 315);

    let yResultsStart = 280 ;
    testResults.map((item, ind)=> {
      if(ind%5 === 0){
        yResultsStart += 50
      }
      return keyValue(doc, item.xLocation, yResultsStart, 100, 40, 25, item.name, item.value)
    })

    keyValue(doc, 30, 460, 530, 30, 15, 'პერიოდული ტექნიკური ინსპექტირების ცენტრის აკრედიტაციის მოწმობის ნომერი')




    doc.save("jsPDF demo.pdf");
  };
  const keyValue = (pdfObj, x, y, w, h, th, key, input) => {
    // doc.roundedRect(x, y width, height, border-radius)
    // main
    pdfObj.setDrawColor(0);
    pdfObj.setFillColor(250, 250, 250);
    pdfObj.roundedRect(x, y, w, h, 3, 3, "FD");
    // top
    pdfObj.setDrawColor(0);
    pdfObj.setFillColor(187, 187, 187);
    pdfObj.roundedRect(x + 0.5, y, w - 1, th, 0, 0, "F");

    pdfObj.setFont('mrgvlovani');
    pdfObj.setFontSize(6);
    pdfObj.text(
      key ,
      x + w/2,
      y + th/2,
      {
        maxWidth: w,
        align: "center"
      },
      null,
      null,
      "center"
    );
    pdfObj.text(
      key,
      x + w/2,
      Math.floor(y + th + (h - th)/2),
      null,
      null,
      "center"
    );


  }



  useEffect(() => {
    printPDF();
    setFuelType(data?.exhaustResult?.type);
  }, []);

  const ptiDetails = [
    {
      xLocation: 30,
      name: trans("registration_number"),
      value: data?.plateNumber?.toUpperCase() ,
    },
    {
      xLocation: 137,
      name: trans("pti_time"),
      value: data?.testType?.id === 1 ? data?.inspectionDate : data?.InspectionStartDate,
    },
    {
      xLocation: 244,
      name: trans("secondary_pti"),
      value: data?.nextInspectionDate || "-",
    },
    {
      xLocation: 352,
      name: trans("pti_validity"),
      value: data?.testResult === 1 ? data?.nextInspectionDate : "-",
    },
    {
      xLocation: 460,
      name: trans("vehicle_category_doors_count"),
      value: data?.category?.name + " / " +data?.doorsCount,
    },
    {
      xLocation: 30,
      name: trans("vin_chasi_body_no"),
      value: data?.vinCode || "-",
    },
    {
      xLocation: 137,
      name: trans("mark_model"),
      value: data?.mark + " / " + data?.model,
    },
    {
      xLocation: 244,
      name: trans("engine_type_vol"),
      value: data?.fuelType + " / " + data?.engineVolume,
    },
    {
      xLocation: 352,
      name: trans("first_reg_ate_in_georgia"),
      value: data?.initialRegistrationDate || "-",
    },
    {
      xLocation: 460,
      name: trans("vehicle_manufacture_date"),
      value: data?.year || "-",
    },
    {
      xLocation: 30,
      name: trans("odometer_value_odometer_type"),
      value: data?.odometerValue + " / " +  data?.odometerUnit,
    },
    {
      xLocation: 137,
      name: trans("catalyst_actual"),
      value: data?.catalycConverter ? "yes" : "no",
    },
    {
      xLocation: 244,
      name: trans("lpg_or_cng_cert"),
      value: data?.lpgCertificate ? data?.lpgCertificate?.certificateNumber || "-" 
                                    : data?.cngCertificate?.certificateNumber || "-",
    },
    {
      xLocation: 352,
      name: trans("lpg_or_cng_sticker"),
      value: data?.lpgCertificate ? data?.lpgCertificate?.bannerNumber || "-" 
                                    : data?.cngCertificate?.bannerNumber || "-",
    },
    {
      xLocation: 460,
      name: trans("lpg_or_cng_validity_end"),
      value: data?.lpgCertificate ? data?.lpgCertificate?.validUntil || "-"  
                                    : data?.cngCertificate?.validUntil || "-" ,
   },
    {
      xLocation: 30,
      name: trans("tacograph"),
      value: data?.tachograph ? "yes" : "no",
    },
    {
      xLocation: 137,
      name: trans("speed_limiter_device"),
      value: data?.speedLimiter ? "yes" : "no",
    },
    {
      xLocation: 244,
      name: trans("str_wheel_position_actual"),
      value: data?.wheelPosition || "-",
    },
    {
      xLocation: 352,
      name: trans("str_wheel_position_first_reg"),
      value: data?.stockWheelPosition,
    },
    {
      xLocation: 460,
      name: trans("vehicle_type_destination"),
      value: data?.bodyType,
    },
  ];

  const testResults = [
    {
      name: trans("vehicle_identification"),
      value: data?.ssIdentificationPassed,
      xLocation: 30
    },
    {
      name: trans("braking_device"),
      value: data?.brakeDevicePassed,
      xLocation: 137
    },
    {
      name: trans("steering_system"),
      value: data?.wheelControlSystemPassed,
      xLocation: 244
    },
    {
      name: trans("visibility"),
      value: data?.visibilityPassed,
      xLocation: 352
    },
    {
      name: trans("headlights_beam_deflectors"),
      value: data?.headlightsAndReflectivePassed,
      xLocation: 460
    },
    {
      name: trans("axes_wheels_tires"),
      value: data?.wheelsAndTiresPassed,
      xLocation: 30
    },
    {
      name: trans("chassis_and_components"),
      value: data?.chassisAndComponentPassed,
      xLocation: 137
    },
    {
      name: trans("other_devices"),
      value: data?.otherDevicesPassed,
      xLocation: 244
    },
    {
      name: trans("negative_impact"),
      value: data?.negativeImpactsPassed,
      xLocation: 352
    },
    {
      name: `${trans("additional_requirements")} (M2,M3)`,
      value: data?.category?.id === 2 || data?.category?.id === 3 ?  data?.additionalInspectionPassed : "-" ,
      xLocation: 460
    },
  ];

  return (
    <>
      <div className="pdf-form">
        <div className="page-wrapper" >
          <div className="page-header">
            <div className="main-header">
              <div className="img-container">
                <img src={logoOne} alt="" />
              </div>
              <div className="title">
                <p>{`პერიოდული ტექნიკური ინსპექტირების ანგარიში N: ${data?.uniqueId}`}</p>
                <p>{`ასს-ს პერიოდული ტექნიკური ინსპექტირების ცენტრი შ.პ.ს ქვიქტესტი ქ.თბილისი, ჯ.ბალანჩინის N36`}</p>
                <p>www.quicktest.ge - 032 2 48 00 42</p>

              </div>
              <div className="img-container">
                <img src={logoTwo} alt="" />
              </div> 
              </div>
          </div>
          <div className="full-width-item">
            <div className="header">პერიოდული ტექნიკური ინსპექტირების ცენტრის აკრედიტაციის მოწმობის ნომერი</div>
            <div className="content">{"item.value"}</div>
          </div>
          <div className="items-container">
            {ptiDetails?.map((item, index) => {
              return (
                <div key={index} className="item-wrapper ">
                  <div className="card col-12">
                    <div className="card-header text-center px-0 " style={{ fontSize: "9px" }}>{item.name}</div>
                    <div className="card-body text-center py-1" style={{ fontSize: "9px" }}>
                    {item.value === "-" ? (
                      <div className="result-icon ">
                          -
                        </div>
                      ) : item.value === "yes" ? (
                        <div className="result-icon succes-icon">
                          &#10004;
                        </div>
                      ) : item.value === "no" ? (
                        <div className="result-icon reject-icon">
                          &#10006;
                        </div>
                      ): item.value}
                      </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="line" />
          <div className="items-container">
            {testResults?.map((item, ind) => {
              return (
                <div key={"0" + ind} className="item-wrapper">
                  <div className="card col-12">
                    <div className="card-header text-center px-0 " style={{ fontSize: "9px" }}>{item.name}</div>
                    <div className="card-body text-center py-1" style={{ fontSize: "9px" }}>
                      {item.value === "-" ? (
                        <div className="result-icon ">
                          -
                        </div>
                      ) : item.value ? (
                        <div className="result-icon succes-icon">
                          &#10004;
                        </div>
                      ) : (
                        <div className="result-icon reject-icon">
                          &#10006;
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="fault-table table">
            <table style={{ width: 775 }}>
              <thead>
                <tr>
                  <th colSpan={12}>{trans("discovered_gaps")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th colSpan={2}>{trans("gap_category")}</th>
                  <th colSpan={6}>{trans("gaps")}</th>
                  <th colSpan={2}>{trans("paragraph")}</th>
                  <th colSpan={2}>{trans("subparagraph")}</th>
                </tr>

                {data?.rejectedDetails?.map((rejected, index) => {
                  return (
                    <tr key={index}>
                      <td colSpan={2}>
                        {rejected?.priority === 0
                          ? trans("unimportant")
                          : rejected?.priority === 1
                            ? trans("important")
                            : trans("forbidden")}
                      </td>
                      <td colSpan={6}>{rejected.rejectedDetailName}</td>
                      <td colSpan={2}>{rejected.paragraph}</td>
                      <td colSpan={2}>{rejected.subParagraph}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
         {data.fuelType !== "ელექტრო" && <div className="co-test-table ant-table">
            <div>
              <Row className="table-head">
                <Col span={24}> {trans("exhaust_test")}</Col>
              </Row>
              <div className="pdf-table-body">
                {fuelType === 2 || fuelType === 7 ? (
                  <Row>
                    <Col span={18} className="co-result diesel-left">
                      <Row>
                        <Col span={24}>{trans("measurement_results")}</Col>
                      </Row>
                      <Row>
                        <Col span={5}>I - RPM / M</Col>
                        <Col span={5}>II - RPM / M</Col>
                        <Col span={5}>III - RPM / M</Col>
                        <Col span={5}>IV - RPM / M</Col>
                        <Col span={4}>{trans("est_avr")}</Col>
                      </Row>
                      <Row>
                        {data?.exhaustResult?.exhausts?.map((exhaust, index) => {
                          return (
                            <Col key={index} className="center" span={5}>
                              {exhaust.speed} - {exhaust.co}
                            </Col>
                          );
                        })}

                        {data?.exhaustResult?.exhausts.length < 4 ? (
                          <Col className="center" span={5}>
                            NULL - 0
                          </Col>
                        ) : (
                          <Col  className="center" span={5}>
                            {data?.exhaustResult?.exhausts[4]?.speed} - {data?.exhaustResult?.exhausts[4]?.co}
                          </Col>
                        )}
                        <Col span={4}>
                          {data?.exhaustResult?.highSpeedCo}
                        </Col>
                      </Row>
                    </Col>
                    <Col span={4}>
                      <Row>
                        <Col className="co-result-header" span={24}>
                          {trans("established_norm")} : {data?.exhaustResult?.highSpeedCo}
                        </Col>
                      </Row>
                      <Row>
                        <Col className="co-result-value" span={24}>
                          {trans("max")} : {data?.exhaustLimits?.highSpeedCoLevel}
                        </Col>
                      </Row>
                    </Col>
                    <Col span={2}>
                      <Row>
                        <Col className="co-result-header" span={24}>
                          {trans("result")}
                        </Col>
                      </Row>
                      <Row style={{height: "27px"}}>
                        <Col span={24} className="co-result-icon">
                          {data?.exhaustResult?.highSpeedCo <=  data?.exhaustLimits?.highSpeedCoLevel ? (
                            <div className="result-icon succes-icon">
                              &#10004;
                            </div>
                          ) : (
                            <div className="result-icon reject-icon">
                              &#10006;
                            </div>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                // ) : true? (
                  ) : fuelType === 1 || fuelType === 5 ? (
                  <Row>
                    <Col span={10} className="co-result petrol-left">
                      <Row>
                        <Col span={24}>{trans("measurement_results")}</Col>
                      </Row>
                      <Row>
                        <Col span={10}>{`${trans("loafer_the_move")} / CO`}</Col>
                        <Col span={10}>{`${trans("with_high_torque")} / CO`}</Col>
                        <Col span={4}>{trans("lambda")}</Col>
                      </Row>
                      <Row>
                        {data?.exhaustResult?.exhausts ? data?.exhaustResult?.exhausts.map((exhaust, index) => {
                          return (
                            <Col key={index} className="center" span={10}>
                              {exhaust?.speed || trans("not_found")} - {exhaust?.co || trans("not_found")}
                            </Col>
                          );
                        }) : ["", ""].map((exhaust, index) => {
                          return (
                            <Col key={index} className="center" span={10}>
                              {trans("not_found")}
                            </Col>
                          );
                        })}
                        <Col className="center" span={4}>
                          {data?.exhaustResult?.lambda}
                        </Col>
                      </Row>
                    </Col>
                    <Col span={12}>
                      <Row>
                        <Col className="co-result-header" span={24}>
                          {trans("established_norm")}
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          className="co-result-value"
                          span={24}
                        >
                          {`${trans("loafer_the_move")} CO - ${data?.exhaustLimits?.normalSpeedCoLevel} - ${trans("with_high_torque")} CO - ${data?.exhaustLimits?.highSpeedCoLevel} ლამბდა - ${data?.lambdaLimits?.min} - ${data?.lambdaLimits?.max}`}
                        </Col>
                      </Row>
                    </Col>
                    <Col span={2}>
                      <Row>
                        <Col className="co-result-header" span={24}>
                          {trans("result")}
                        </Col>
                      </Row>
                      <Row>
                        <Col className="co-result-icon" span={24}>
                          {data?.exhaustResult?.highSpeedCo <=  data?.exhaustLimits?.highSpeedCoLevel ? (
                            <div className="result-icon succes-icon">
                              &#10004;
                            </div>
                          ) : (
                            <div className="result-icon reject-icon">
                              &#10006;
                            </div>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>}
          <div className="brakes-table ant-table">
            <div>
              <Row className="table-head">
                <Col span={24}> {trans("brake_test")}</Col>
              </Row>
            </div>
            <table style={{ width: "100%" }} className={"table-body"}>
              <thead>

                <tr>
                  <th>{trans("axis")}</th>
                  <th colSpan={6}>{trans("the_result_obtained")}</th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <td></td>
                  <td>{trans("right")}</td>
                  <td>{trans("left")} </td>
                  <td>{trans("effective")}</td>
                  <td>{trans("difference")}</td>
                  <td>{trans("weight")}</td>
                  <td>{trans("result")}</td>
                </tr>
                {data?.brakeResult?.brakes?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="left ">
                        {item.type === 2
                          ? trans("parking_brake")
                          : `${trans("axis")} ${" "}   ${index + 1}`}
                      </td>
                      {<td>{item.rightAxlePower} kN</td>}
                      {<td>{item.leftAxlePower} kN</td>}
                      <td>{item.axleEfficiency} %</td>
                      <td>
                        {item.type === 1 &&
                          `${item.differenceBetweenLegs} %`}
                      </td>
                      <td>{item.leftAxleWeight + item.rightAxleWeight}{trans("kg")}</td>
                      <td className="center">
                        {item.type === 2 ? (
                          item.axleEfficiency >
                            data?.parkingBrakesEfficiencyLimit ? (
                            <div className="succes-icon result-icon">
                              &#10004;
                            </div>
                          ) : (
                            <div className="reject-icon result-icon">
                              &#10006;
                            </div>
                          )
                        ) : item.axleEfficiency >
                          data?.serviceBrakesEfficiencyLimit ? (
                          item?.differenceBetweenLegs <
                            data?.differenceBetweenLegsLimit ? (
                            <div className="succes-icon result-icon">
                              &#10004;
                            </div>
                          ) : (
                            <div className="reject-icon result-icon">
                              &#10006;
                            </div>
                          )
                        ) : (
                          <div className="reject-icon result-icon">
                            &#10006;
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td className="left">{trans("overall_efficiency")}</td>
                  <td className="txt-center" colSpan={5}>
                    {data?.brakeResult?.serviceBrakesEfficiency}% ({trans("norm")}:{" "}
                    {data?.serviceBrakesEfficiencyLimit}%)
                  </td>
                  <td className="center">
                    {data?.brakeResult?.serviceBrakesEfficiency >
                      data?.serviceBrakesEfficiencyLimit ? (
                      <div className="succes-icon result-icon">
                        &#10004;
                      </div>
                    ) : (
                      <div className="reject-icon result-icon">
                        &#10006;
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="left">{`${trans("overall_efficiency")} (${trans("parking_brake")})`}</td>
                  <td className="txt-center" colSpan={5}>
                    {data?.brakeResult?.parkingBrakesEfficiency}% ({trans("norm")}:{" "}
                    {data?.parkingBrakesEfficiencyLimit}%)
                  </td>
                  <td className="center">
                    {data?.brakeResult?.parkingBrakesEfficiency >
                      data?.parkingBrakesEfficiencyLimit ? (
                      <div className="succes-icon result-icon">
                        &#10004;
                      </div>
                    ) : (
                      <div className="reject-icon result-icon">
                        &#10006;
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>

            </table>
          </div>
          <div className="inspection-result">
            <div>
              {trans("inspection_result")}:
              <div className="icon center">
                {false ? (
                  <div className="succes-icon result-icon">
                    &#10004;
                  </div>
                ) : (
                  <div className="reject-icon result-icon">
                    &#10006;
                  </div>
                )}
              </div>
              <span>
                {false ? trans("success") : trans("fault")}
              </span>
            </div>
          </div>
          <div className="inspector-comment">
            <div className="header">{trans("inspector_comment")}</div>
            <div className="comments-container">
              <div>
                {data?.comment}
              </div>
            </div>
          </div>
          <div className="sign">
            <div className="responsible">პასუხისმგებელი პირი: ({data.user})</div>
            <div>{`${trans("signature")}_____________________`}</div>
          </div> 
        </div>
      </div>
    </>
  );
}

export default ApplicationForm;
